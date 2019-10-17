import React, { Component } from "react";
import PropTypes from "prop-types";

//MapBox
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import lineDistance from "turf-line-distance";
import { MapboxLayer } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { ScatterplotLayer, GeoJsonLayer } from "@deck.gl/layers";

//Conectores do creators do reducer
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as MapCreators } from "../../../redux/store/ducks/map";
import { Creators as CtosCreators } from "../../../redux/store/ducks/ctos";
import { Creators as userCreators } from "../../../redux/store/ducks/user";
import { Creators as providerCreators } from "../../../redux/store/ducks/provider";
import { Creators as clientCreators } from "../../../redux/store/ducks/cliente";
import { Creators as ceoCreators } from "../../../redux/store/ducks/ceo";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";
import store from "../../../redux/store";

//API
import api, { API } from "../../../services/api";

//Websockets
import socket from "../../../services/socket";

//Componentes
import LeftSelector from "./Components/LeftSelector/index";

//CSS
import "./map.css";
import Header from "./Components/Header";

const myDeckLayer = new MapboxLayer({
  id: "my-scatterplot",
  type: ScatterplotLayer,
  data: [{ position: [-74.5, 40], size: 10000 }],
  getPosition: d => d.position,
  getRadius: d => d.size,
  getColor: [255, 0, 0]
});

const layer = new MapboxLayer({
  id: "geojson-layer",
  data: {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-122.48369693756104, 37.83381888486939],
        [116.48348236083984, 37.83317489144141]
      ]
    }
  },
  type: GeoJsonLayer,
  pickable: true,
  stroked: false,
  filled: true,
  extruded: true,
  lineWidthScale: 20,
  lineWidthMinPixels: 2,
  getFillColor: [160, 160, 180, 200],
  getLineColor: [255, 0, 0], //d => colorToRGBArray(d.properties.color),
  getRadius: 100,
  getLineWidth: 1,
  getElevation: 30,
  onHover: ({ object, x, y }) => {
    const tooltip = object.properties.name || object.properties.station;
  }
});

// GeoJSON object to hold our measurement features
var geojson = {
  type: "FeatureCollection",
  features: []
};

// Used to draw a line between points
var linestring = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: []
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-37.0601269, -8.424398] //Inicialização do mapa.
    };

    this.handleMap = this.handleMap.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.handleFlyToAPosition = this.handleFlyToAPosition.bind(this);
  }

  async componentDidMount() {
    const { container, style, zoom, accessToken } = this.props;
    const { center } = this.state;

    this.handleMap(container, style, center, zoom, accessToken);
    this.firstConfigure();
    this.handlePosition();
  }

  /**
   * Recebe as props que passamos no nosso container,
   * Cria uma constante chamada Map,
   * Cria um novo mapa ( igual na doc Mapbox em getStarted )
   * Passa para o state a constante de mapa para não ficarmos criando objetos globais
   */
  handleMap = (container, style, center, zoom, accessToken) => {
    var url = "https://wanderdrone.appspot.com";

    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: container,
      style: style,
      center: center,
      zoom: zoom
    });

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    map.on("load", function() {
      map.addSource("cliente", {
        type: "geojson",
        data: url
      });

      map.addSource("cliente_inativo", {
        type: "geojson",
        data: url
      });

      map.addSource("wires", {
        type: "geojson",
        data: url
      });
      map.addLayer({
        id: "wires",
        source: "wires",
        type: "line"
      });

      map.addSource("cto", {
        type: "geojson",
        data: url
      });

      map.addSource("ceo", {
        type: "geojson",
        data: url
      });

      map.addSource("geojson", {
        type: "geojson",
        data: geojson
      });

      // Add styles to the map
      map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 5,
          "circle-color": "#000"
        },
        filter: ["in", "$type", "Point"]
      });
      map.addLayer({
        id: "measure-lines",
        type: "line",
        source: "geojson",
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "#000",
          "line-width": 2.5
        },
        filter: ["in", "$type", "LineString"]
      });
    });

    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    var distanceContainer = document.getElementById("distance");

    this.measureDistance(map, distanceContainer);

    this.loadCto(map);
    this.loadCeo(map);
    this.loadClient(map);
    // this.loadCable(map);

    this.loadSocket(map);
    this.desenharPolylineAtual(map);

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.map = map;
  };

  /* Faz a configuração inicial do mapa */
  firstConfigure() {
    let { map } = this.state;
    this.handleClicks(map);
    map.on("click", e => this.handleMapClick(e));
  }

  handleMapClick = e => {
    const { lng: longitude, lat: latitude } = e.lngLat;
    const { addCoordenadas, canAddCoordenadas } = this.props;
    addCoordenadas({ longitude: longitude, latitude: latitude });
    canAddCoordenadas(false);
    let coordinates = {
      latitude: latitude,
      longitude: longitude
    };

    this.checkDelemitation(coordinates);
  };

  /*
   * Configuração de evento de clique nos objetos que estão no mapa
   * 'drone' now 'cto' -> Representa a CTO
   */
  handleClicks(map) {
    // Cliques na cto
    map.on("click", "cto", e => this.handleCtoClick(e.features[0]));
    // Evento de clique nos Clientes
    map.on("click", "cliente", e => this.handleCtoCaboClick(e));
    map.on("click", "cliente_inativo", e => this.handleCtoCaboClick(e));
  }

  handleCtoClick = features => {
    const { properties } = features;
    let longitude = features.geometry.coordinates[0];
    let latitude = features.geometry.coordinates[1];

    const data = JSON.parse(properties.data);

    this.handleCtoClickTwoFactor(data, longitude, latitude);
  };

  handleCtoClickTwoFactor(cto, longitude, latitude) {
    if (this.props.redux.map.delimitacao === "cabo") {
      const { addCoordCabo, setDelemitationMap, showAddCableCto } = this.props;
      const { polyline } = this.props.redux.map;
      let newPolyline = [...polyline, [longitude, latitude]];

      addCoordCabo(newPolyline);
      showAddCableCto(cto.id);
      setDelemitationMap("default");
    } else {
      const { showViewModalCto } = this.props;
      // const { getSplitterByCto } = this.props;
      // Inserir o método do redux-sagas para obter o splitter e os clientes desta cto
      showViewModalCto(cto);
    }
  }

  handleCtoCaboClick = e => {
    let coordenadas = {
      longitude: e.features[0].geometry.coordinates[0],
      latitude: e.features[0].geometry.coordinates[1]
    };
    let cliente = JSON.parse(e.features[0].properties.data);
    this.handleCtoCaboClickTwoFactor(cliente);
  };

  handleCtoCaboClickTwoFactor(cliente) {
    const { showClientViewModal } = this.props;
    showClientViewModal(cliente);
  }

  /*
    Verificar qual ação está sendo chamada.
  */
  checkDelemitation(coordinates) {
    const { map } = this.props.redux;

    switch (map.delimitacao) {
      case "perfil":
        break;
      case "cliente":
        this.openNewModalClient(coordinates);
        break;
      case "cto":
        this.openNewModalCtos(coordinates);
        break;
      case "funcionario":
        this.openNewModalFuncionario();
        break;
      case "provider":
        this.openNewModalProvider();
        break;
      case "ceo":
        this.openNewModalCeo(coordinates);
        break;
      case "cabo":
        this.addCoordenadasCabo(coordinates);
      default:
        break;
    }
  }

  async openNewModalCtos(coordinates) {
    const { showNewViewModalCto, setDelemitationMap } = this.props;
    await showNewViewModalCto(coordinates);
    setDelemitationMap("default");
  }

  openNewModalCeo(coordinates) {
    const { showNewViewModalCeo, setDelemitationMap } = this.props;
    showNewViewModalCeo(coordinates);
    setDelemitationMap("default");
  }

  async openNewModalClient(coordinates) {
    const { setDelemitationMap, showNewModalClient } = this.props;
    await showNewModalClient(coordinates);
    setDelemitationMap("default");
  }

  openNewModalFuncionario() {
    const { showModalNewUser, setDelemitationMap } = this.props;
    showModalNewUser();
    setDelemitationMap("default");
  }

  openNewModalProvider() {
    const { showModalNewProvider, setDelemitationMap } = this.props;
    showModalNewProvider();
    setDelemitationMap("default");
  }

  /** Adiciona coordenadas ao JSON de coordenadas de polyline contido no redux store
   * mapa.polyline - REDUX
   */
  addCoordenadasCabo(coordenadas) {
    const { addCoordCabo } = this.props;
    const { polyline } = this.props.redux.map;
    let newPolyline = [
      ...polyline,
      [coordenadas.longitude, coordenadas.latitude]
    ];
    addCoordCabo(newPolyline);
    this.adicionarCoordenadasAoCabo(newPolyline);
  }

  adicionarCoordenadasAoCabo(coordinates) {
    const { map } = this.state;
    const { polyline } = this.props.redux.map;

    map.getSource("linhas").setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: polyline
      }
    });
  }

  resetarCoordenadasAoCabo() {
    const { map } = this.state;
    const datab = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [[-77.03202080476535, 38.91454768710531], [-78.03, 39.91]]
      }
    };
    map.getSource("linhas").setData({
      type: "geojson",
      data: datab
    });
  }

  /**
   * Método responsável por criar a polyline de adição atual
   */
  desenharPolylineAtual(map) {
    // const { map } = this.state;
    const { polyline } = this.props.redux.map;
    map.on("load", () => {
      map.addSource("linhas", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: polyline
          }
        }
      });

      map.addLayer({
        id: "linhas",
        type: "line",
        source: "linhas",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#13d",
          "line-width": 4
        }
      });
    });

    // this.setState({ map });
  }

  loadSocket(map) {
    const { token } = store.getState().auth;
    const { active: provider } = store.getState().provider;

    socket.connect(token);
    const clients = socket.subscribe(`clients:${provider.id}`);
    const ctos = socket.subscribe(`ctos:${provider.id}`);
    // const ceos = socket.subscribe(`ceos:${provider.id}`);

    map.on("load", function() {
      clients.on("newClient", async client => {
        const data = await store.getState().client.geojson.clients;

        let clientes = data;
        clientes.push(client); // Adiciona o cliente novo

        await store.dispatch({
          type: "@cliente/LOAD_GJ_SUCCESS",
          payload: { clients: clientes }
        }); // Dispara no store

        let clientsActive = [];
        let clientsInactive = [];

        data.forEach(client => {
          if (client.properties.data.status === "active") {
            clientsActive.push(client);
          }
        });

        data.forEach(client => {
          if (client.properties.data.status === "null") {
            clientsInactive.push(client);
          }
        });

        // Todos os clientes
        // const dados = await {
        //   type: "FeatureCollection",
        //   features: [...data, client]
        // };

        if (client.properties.data.status === "active") {
          const activeClients = await {
            type: "FeatureCollection",
            features: [...clientsActive, client]
          };
          await map.getSource("cliente").setData(activeClients);
        } else {
          const inactiveClients = await {
            type: "FeatureCollection",
            features: [...clientsInactive, client]
          };
          await map.getSource("cliente_inativo").setData(inactiveClients);
        }
      });

      clients.on("updatedClient", async clientUpdated => {
        const data = await store.getState().client.geojson.clients;

        const clientsActive = [];
        const clientsInactive = [];

        data.forEach(client => {
          // verify if the client update is !== of the actual client in the forEach
          if (client.properties.data.id !== clientUpdated.id) {
            if (client.properties.data.active === "active")
              clientsActive.push(client);
            else clientsInactive.push(client);
          } else {
            if (client.properties.data.active === "active")
              clientsActive.push(clientUpdated);
            // Insert the updated client
            else clientsInactive.push(clientUpdated); // Insert the updated client
          }
        });

        const dataClientsActive = {
          type: "FeatureCollection",
          features: clientsActive
        };

        const dataClientsInactive = {
          type: "FeatureCollection",
          features: clientsInactive
        };

        await map.getSource("cliente").setData(dataClientsActive);
        await map.getSource("cliente_inativo").setData(dataClientsInactive);
      });

      clients.on("deletedClient", async clientDeleted => {
        const data = await store.getState().client.geojson.clients;

        let clientsActive = [];
        let clientsInactive = [];

        // Se estiver ativo e o id
        // for diferente do cliente deletado
        // adiciona no array clientsActive
        data.forEach(client => {
          if (client.properties.data.status === "active") {
            if (client.properties.data.id !== clientDeleted.id)
              clientsActive.push(client);
          }
        });

        // Se estiver diferente de ativo e o id
        // for diferente do cliente deletado
        // adiciona no array clientsActive
        data.forEach(client => {
          if (client.properties.data.status !== "active") {
            if (client.properties.data.id !== clientDeleted.id)
              clientsInactive.push(client);
          }
        });

        const clientesAtivos = {
          type: "FeatureCollection",
          features: clientsActive
        };

        const clientesInativos = {
          type: "FeatureCollection",
          features: clientsInactive
        };

        await store.dispatch({
          type: "@cliente/LOAD_GJ_SUCCESS",
          payload: { clients: [...clientsActive, ...clientsInactive] }
        });

        map.getSource("cliente").setData(clientesAtivos);
        map.getSource("cliente_inativo").setData(clientesInativos);
      });

      ctos.on("newCto", async cto => {
        const data = await store.getState().ctos.geojson.ctos;

        let ctos = data;
        ctos.push(cto);

        await store.dispatch({
          type: "@cto/LOAD_GJ_SUCCESS",
          payload: { ctos }
        });

        const dados = await {
          type: "FeatureCollection",
          features: [...data, cto]
        };
        await map.getSource("cto").setData(dados);
      });

      ctos.on("deletedCto", async ctoDeleted => {
        const data = await store.getState().ctos.geojson.ctos;

        let ctos = [];

        data.forEach(cto => {
          if (cto.properties.data.id !== ctoDeleted.id) {
            ctos.push(cto);
          }
        });

        await store.dispatch({
          type: "@cto/LOAD_GJ_SUCCESS",
          payload: { ctos }
        });

        const dados = {
          type: "FeatureCollection",
          features: ctos
        };

        await map.getSource("cto").setData(dados);
      });
      // Não testado
      ctos.on("updatedCto", async ctoUpdated => {
        const data = await store.getState().ctos.geojson.ctos;

        let ctos = [];

        // Se o id
        // for diferente da cto atualizada
        // adiciona no array, se for igual
        // ao invés de adicionar a do forEach, adiciona
        // a que vem do banco de dados
        data.forEach(cto => {
          if (cto.properties.data.id !== ctoUpdated.id) ctos.push(cto);
          else ctos.push(ctoUpdated);
        });

        const dados = {
          type: "FeatureCollection",
          features: ctos
        };

        await store.dispatch({
          type: "@cto/LOAD_GJ_SUCCESS",
          payload: { ctos }
        });

        await map.getSource("cto").setData(dados);
      });

      // clients.on("deleteClient", async clientId => {
      //   const data = await store.getState().client.clients;

      //   let clientes = data;
      //   let newClients = [];
      //   clientes.forEach(client => {
      //     if (client.properties.data.id === clientId) {
      //       newClients.push(client);
      //     }
      //   });
      // });
    });
  }

  loadCto(map) {
    // Carrega as CTOS
    map.on("load", function() {
      api.get(API.GET_CTO_GEOJSON).then(result => {
        const { data } = result;
        const dados = {
          type: "FeatureCollection",
          features: data
        };
        store.dispatch({
          type: "@cto/LOAD_GJ_SUCCESS",
          payload: { ctos: data }
        });
        map.getSource("cto").setData(dados);
      });

      //Carregar imagens ctos images/CTO_24x24.png
      map.loadImage(require("../../../assets/images/CTO_24x24.png"), function(
        error,
        image
      ) {
        if (error) throw error;
        map.addImage("custom-CTO", image);
        map.addLayer({
          id: "cto",
          type: "symbol",
          source: "cto",
          layout: {
            "icon-image": "custom-CTO"
          }
        });
      });
    });
  }

  // Carrega os Clientes
  loadClient(map) {
    map.on("load", function() {
      api.get(API.GET_CLIENTE_GEOJSON).then(result => {
        const { data } = result;

        let clientsActive = [];
        data.forEach(client => {
          if (client.properties.data.status === "active") {
            clientsActive.push(client);
          }
        });
        let clientsInactive = [];
        data.forEach(client => {
          if (client.properties.data.status !== "active") {
            clientsInactive.push(client);
          }
        });
        console.log("Clientes ativos");
        console.log(clientsActive);
        console.log("Inativos");
        console.log(clientsInactive);
        const dados = {
          type: "FeatureCollection",
          features: data
        };

        const clientesAtivos = {
          type: "FeatureCollection",
          features: clientsActive
        };

        const clientesInativos = {
          type: "FeatureCollection",
          features: clientsInactive
        };

        store.dispatch({
          type: "@cliente/LOAD_GJ_SUCCESS",
          payload: { clients: data }
        });

        // map.getSource("cliente").setData(dados);
        map.getSource("cliente").setData(clientesAtivos);
        map.getSource("cliente_inativo").setData(clientesInativos);
      });
      // ativo
      map.loadImage(
        require("../../../assets/images/clienteCom24x12.png"),
        function(error, image) {
          if (error) throw error;
          map.addImage("custom-cliente", image);
          /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
          map.addLayer({
            id: "cliente",
            type: "symbol",
            source: "cliente",
            layout: {
              "icon-image": "custom-cliente"
            }
          });
        }
      );
      // inativo
      map.loadImage(
        require("../../../assets/images/clientesem12x24.png"),
        function(error, image) {
          if (error) throw error;
          map.addImage("cliente-inativo", image);
          map.addLayer({
            id: "cliente_inativo",
            type: "symbol",
            source: "cliente_inativo",
            layout: {
              "icon-image": "cliente-inativo"
            }
          });
        }
      );
    });
  }

  loadCeo(map) {
    // Carrega as CTOS
    map.on("load", function() {
      api.get(API.GET_CEO_GEOJSON).then(result => {
        const { data } = result;
        const dados = {
          type: "FeatureCollection",
          features: data
        };
        store.dispatch({
          type: "@ceo/LOAD_GJ_SUCCESS",
          payload: { ceos: data }
        });
        map.getSource("ceo").setData(dados);
      });

      //Carregar imagens ctos images/CTO_24x24.png
      map.loadImage(require("../../../assets/images/ceo_24.png"), function(
        error,
        image
      ) {
        if (error) throw error;
        map.addImage("custom-CEO", image);
        map.addLayer({
          id: "ceo",
          type: "symbol",
          source: "ceo",
          layout: {
            "icon-image": "custom-CEO"
          }
        });
      });
    });
  }

  // loadCable(map) {
  //   map.on("load", function() {
  //     api.get(API.GET_CABO_GEOJSON).then(result => {
  //       const { data } = result;
  //       const dados = {
  //         type: "FeatureCollection",
  //         features: data
  //       };
  //       map.getSource("wires").setData(dados);
  //     });
  //   });
  // }

  /*
    Função para medir distancia entre 2 pontos no mapa 
    e.originalEvent.button [Mostra o id do button clicado]
  */
  measureDistance(map, distanceContainer) {
    map.on("load", function() {
      map.on("mouseup", function(e) {
        if (e.originalEvent.button === 2) {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ["measure-points"]
          });
          if (geojson.features.length > 1) geojson.features.pop();
          distanceContainer.innerHTML = "";
          if (features.length) {
            var id = features[0].properties.id;
            geojson.features = geojson.features.filter(function(point) {
              return point.properties.id !== id;
            });
          } else {
            var point = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [e.lngLat.lng, e.lngLat.lat]
              },
              properties: {
                id: String(new Date().getTime())
              }
            };
            geojson.features.push(point);
          }
          if (geojson.features.length > 1) {
            linestring.geometry.coordinates = geojson.features.map(function(
              point
            ) {
              return point.geometry.coordinates;
            });
            geojson.features.push(linestring);
            var value = document.createElement("pre");
            value.textContent =
              "Total distance: " +
              lineDistance(linestring, "kilometers").toLocaleString() +
              "km";
            distanceContainer.appendChild(value);
          }
          map.getSource("geojson").setData(geojson);
        }
      });
    });
  }

  /** Aqui criamos uma função que usa uma feature do HTML5, chamada getCurrentPosition, que pega as informações de
  latitude e longitude do browser, caso o usuario permita, daí jogamos essas informações no estado da nossa
  aplicação para usar uma feature do mapbox logo em seguida, que vai fazer um 'flyTo' da posição inicial até a
  posição do usuario, esse evento é cha56500, Arcoverde, Pernambuco, Brasilmado pelo clique do botão 'Me Encontre'. */
  handlePosition() {
    const options = {
      enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(
      pos => {
        const center = [pos.coords.longitude, pos.coords.latitude];
        this.setState({
          center: center
        });
      },
      err => {},
      options
    );
  }

  /** Voa para o local center do mapa */
  handleFlyToAPosition() {
    const { center, map } = this.state;
    map.flyTo({
      center: center
    });
  }

  render() {
    const { container, classNameStyle } = this.props;

    return (
      <>
        <div id={container} className={classNameStyle}></div>

        <div id="geocoder" class="geocoder"></div>
        <div id="distance" class="distance-container"></div>

        <LeftSelector />
      </>
    );
  }
}
const { string, number } = PropTypes;
Map.propTypes = {
  container: string.isRequired,
  style: string.isRequired,
  classNameStyle: string.isRequired,
  zoom: number.isRequired,
  accessToken: string.isRequired
};

const mapStateToProps = state => ({
  redux: state
});

/**
 * Mapear todas as funções dos Creators{Reducers} para o props;
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...MapCreators,
      ...CtosCreators,
      ...userCreators,
      ...providerCreators,
      ...clientCreators,
      ...ceoCreators,
      ...CaboCreators
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
