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

// eslint-disable-next-line no-unused-vars
const myDeckLayer = new MapboxLayer({
  id: "my-scatterplot",
  type: ScatterplotLayer,
  data: [{ position: [-74.5, 40], size: 10000 }],
  getPosition: d => d.position,
  getRadius: d => d.size,
  getColor: [255, 0, 0]
});

// eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
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
      center: [-37.0601269, -8.424398] //Inicializa????o do mapa.
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
   * Passa para o state a constante de mapa para n??o ficarmos criando objetos globais
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

      map.addSource("cto_lotada", {
        type: "geojson",
        data: url
      });

      map.addSource("cto_cliente_cancelado", {
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

      // teste
      map.addSource("import_clients", {
        type: "geojson",
        data: url
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
    this.loadCable(map);
    // this.loadImports(map);
    // this.loadCable(map);

    this.loadSocket(map);
    this.desenharPolylineAtual(map);

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.map = map;
  };

  /* Faz a configura????o inicial do mapa */
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
   * Configura????o de evento de clique nos objetos que est??o no mapa
   * 'drone' now 'cto' -> Representa a CTO
   */
  handleClicks(map) {
    // Cliques na cto
    map.on("click", "cto", e => this.handleCtoClick(e.features[0]));
    map.on("click", "cto_lotada", e => this.handleCtoClick(e.features[0]));
    map.on("click", "cto_cliente_cancelado", e => this.handleCtoClick(e.features[0]));
    // Evento de clique nos Clientes
    map.on("click", "cliente", e => this.handleCtoCaboClick(e));
    map.on("click", "cliente_inativo", e => this.handleCtoCaboClick(e));
    map.on("click", "ceo", e => this.handleCeoClick(e));
  }

  handleCeoClick = features => {
    const { properties } = features.features[0];
    let longitude = features.features[0].geometry.coordinates[0];
    let latitude = features.features[0].geometry.coordinates[1];

    const data = JSON.parse(properties.data);

    this.handleCeoClickTwoFactor(data, longitude, latitude);
  };

  handleCeoClickTwoFactor(ceo, longitude, latitude) {
    const { delimitation, subDelimitation } = this.props.redux.map;
    if (delimitation === "cabo") {
      const { addCoordCabo, showModalAddCable, setIdTo } = this.props;

      const { polyline } = this.props.redux.map;

      let newPolyline = [...polyline, [longitude, latitude]];
      addCoordCabo(newPolyline);

      if (subDelimitation === "cto") {
        setIdTo(ceo.id);
        showModalAddCable("ceo");
      } else if (subDelimitation === "ceo") {
        setIdTo(ceo.id);
        showModalAddCable("ceo");
      }
    } else {
      const { showViewModalCeo } = this.props;
      showViewModalCeo(ceo);
    }
  }

  handleCtoClick = features => {
    const { properties } = features;
    let longitude = features.geometry.coordinates[0];
    let latitude = features.geometry.coordinates[1];

    const data = JSON.parse(properties.data);

    this.handleCtoClickTwoFactor(data, longitude, latitude);
  };

  handleCtoClickTwoFactor(cto, longitude, latitude) {
    const { delimitation, polyline, subDelimitation } = this.props.redux.map;

    if (delimitation === "cabo") {
      const { addCoordCabo, setIdTo, showModalAddCable } = this.props;
      const { showAddCableCto } = this.props;

      let newPolyline = [...polyline, [longitude, latitude]];

      addCoordCabo(newPolyline);

      // CTO para CTO
      if (subDelimitation === "cto") {
        setIdTo(cto.id);
        showModalAddCable("cto");
      }
      //CEO para CTO
      else if (subDelimitation === "ceo") {
        setIdTo(cto.id);
        showModalAddCable("cto");
      }
      //Cliente para CTO
      else {
        showAddCableCto(cto.id);
      }
    } else {
      //Abrir modal com as informa????es da cto {informa????es, clientes e splitters}
      const {
        showViewModalCto,
        loadSplitterAndClientByCtoRequest
      } = this.props;
      loadSplitterAndClientByCtoRequest(cto);
      showViewModalCto(cto);
    }
  }

  handleCtoCaboClick = e => {
    // eslint-disable-next-line no-unused-vars
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
    Verificar qual a????o est?? sendo chamada.
  */
  checkDelemitation(coordinates) {
    const { map } = this.props.redux;

    switch (map.delimitation) {
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
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  }

  async openNewModalCtos(coordinates) {
    const { showNewViewModalCto, setDelimitation } = this.props;
    await showNewViewModalCto(coordinates);
    setDelimitation("default");
  }

  openNewModalCeo(coordinates) {
    const { showNewViewModalCeo, setDelimitation } = this.props;
    showNewViewModalCeo(coordinates);
    setDelimitation("default");
  }

  async openNewModalClient(coordinates) {
    const { setDelimitation, showNewModalClient } = this.props;
    await showNewModalClient(coordinates);
    setDelimitation("default");
  }

  openNewModalFuncionario() {
    const { showModalNewUser, setDelimitation } = this.props;
    showModalNewUser();
    setDelimitation("default");
  }

  openNewModalProvider() {
    const { showModalNewProvider, setDelimitation } = this.props;
    showModalNewProvider();
    setDelimitation("default");
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
   * M??todo respons??vel por criar a polyline de adi????o atual
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
    const ceos = socket.subscribe(`ceos:${provider.id}`);
    const cables = socket.subscribe(`cables:${provider.id}`)
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
          if (client.properties.data.status !== "active") {
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

      clients.on("updatedClient", clientUp => {
        const data = store.getState().client.geojson.clients;

        let clientUpdated = clientUp;
        const longitude = JSON.parse(clientUp.properties.data.coordinates)
          .longitude;
        const latitude = JSON.parse(clientUp.properties.data.coordinates)
          .latitude;
        clientUpdated.geometry.coordinates = [longitude, latitude];

        let clientes = data;
        clientes.push(clientUpdated);

        const clientsActive = [];
        const clientsInactive = [];

        data.forEach(client => {
          if (client.properties.data.status === "active") {
            // eslint-disable-next-line eqeqeq
            if (client.properties.data.id != clientUpdated.properties.data.id)
              clientsActive.push(client);
          }
        });
        map.getSource("cliente").setData({
          type: "FeatureCollection",
          features: clientsActive
        });

        data.forEach(client => {
          if (client.properties.data.status !== "active") {
            // eslint-disable-next-line eqeqeq
            if (client.properties.data.id != clientUpdated.properties.data.id)
              clientsInactive.push(client);
          }
        });
        map.getSource("cliente_inativo").setData({
          type: "FeatureCollection",
          features: clientsInactive
        });

        // console.log([...clientsActive, ...clientsInactive, clientUpdated]);
        store.dispatch({
          type: "@cliente/LOAD_GJ_SUCCESS",
          payload: {
            clients: [...clientsActive, ...clientsInactive, clientUpdated]
          }
        });

        if (clientUpdated.properties.data.status === "active") {
          const activeClients = {
            type: "FeatureCollection",
            features: [...clientsActive, clientUpdated]
          };

          map.getSource("cliente").setData(activeClients);
        } else {
          const inactiveClients = {
            type: "FeatureCollection",
            features: [...clientsInactive, clientUpdated]
          };

          map.getSource("cliente_inativo").setData(inactiveClients);
        }
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

        let ctos_ativas = [];
        let ctos_lotadas = [];
        let ctos_clientes_cancelados = [];

        data.forEach(cto => {
          if (cto.properties.data.status === 'full') {
            ctos_lotadas.push(cto)
          } else if (cto.properties.data.status === 'cli_cancel') {
            ctos_clientes_cancelados.push(cto)
          } else if (!cto.properties.data.status || cto.properties.data.status === 'active'){
            ctos_ativas.push(cto);
          }
        })

        const ctos_at = {
          type: "FeatureCollection",
          features: ctos_ativas
        };

        const ctos_cli_can = {
          type: "FeatureCollection",
          features: ctos_clientes_cancelados
        };

        const ctos_lot = {
          type: 'FeatureCollection',
          features: ctos_lotadas
        }
        map.getSource("cto").setData(ctos_at)
        map.getSource("cto_lotada").setData(ctos_lot)
        map.getSource("cto_cliente_cancelado").setData(ctos_cli_can)



        // const dados = await {
        //   type: "FeatureCollection",
        //   features: ctos //[...data, cto]
        // };

        // await map.getSource("cto").setData(dados);
      });

      // N??o testado @ probably ok
      ctos.on("deletedCto", async ctoDeleted => {
        const data = await store.getState().ctos.geojson.ctos;

        let ctos = [];

        await data.forEach(cto => {
          if (cto.properties.data.id !== ctoDeleted.id) {
            ctos.push(cto);
          }
        });

        await store.dispatch({
          type: "@cto/LOAD_GJ_SUCCESS",
          payload: { ctos }
        });

        let ctos_ativas = [];
        let ctos_lotadas = [];
        let ctos_clientes_cancelados = [];

        ctos.forEach(cto => {
          if (cto.properties.data.status === 'full') {
            ctos_lotadas.push(cto)
          } else if (cto.properties.data.status === 'cli_cancel') {
            ctos_clientes_cancelados.push(cto)
          } else if (!cto.properties.data.status || cto.properties.data.status === 'active'){
            ctos_ativas.push(cto);
          }
        })

        const ctos_at = {
          type: "FeatureCollection",
          features: ctos_ativas
        };

        const ctos_cli_can = {
          type: "FeatureCollection",
          features: ctos_clientes_cancelados
        };

        const ctos_lot = {
          type: 'FeatureCollection',
          features: ctos_lotadas
        }
        map.getSource("cto").setData(ctos_at)
        map.getSource("cto_lotada").setData(ctos_lot)
        map.getSource("cto_cliente_cancelado").setData(ctos_cli_can)


        // const dados = {
        //   type: "FeatureCollection",
        //   features: ctos
        // };

        // await map.getSource("cto").setData(dados);
      });
      // N??o testado @ probably ok
      ctos.on("updatedCto", async ctoUpdated => {
        const data = await store.getState().ctos.geojson.ctos;

        let ctos = [];

        await data.forEach(cto => {
          if (cto.properties.data.id !== ctoUpdated.properties.data.id) {
            ctos.push(cto);
          } else {
            let ctoUp = ctoUpdated;
            const longitude = JSON.parse(ctoUpdated.properties.data.coordinates)
              .longitude;
            const latitude = JSON.parse(ctoUpdated.properties.data.coordinates)
              .latitude;
            ctoUp.geometry.coordinates = [longitude, latitude];

            ctos.push(ctoUp);
          }
        });

        await store.dispatch({
          type: "@cto/LOAD_GJ_SUCCESS",
          payload: { ctos }
        });

        // NEW METHODS

        let ctos_ativas = [];
        let ctos_lotadas = [];
        let ctos_clientes_cancelados = [];

        ctos.forEach(cto => {
          if (cto.properties.data.status === 'full') {
            ctos_lotadas.push(cto)
          } else if (cto.properties.data.status === 'cli_cancel') {
            ctos_clientes_cancelados.push(cto)
          } else if (!cto.properties.data.status || cto.properties.data.status === 'active'){
            ctos_ativas.push(cto);
          }
        })

        const ctos_at = {
          type: "FeatureCollection",
          features: ctos_ativas
        };

        const ctos_cli_can = {
          type: "FeatureCollection",
          features: ctos_clientes_cancelados
        };

        const ctos_lot = {
          type: 'FeatureCollection',
          features: ctos_lotadas
        }
        map.getSource("cto").setData(ctos_at)
        map.getSource("cto_lotada").setData(ctos_lot)
        map.getSource("cto_cliente_cancelado").setData(ctos_cli_can)

        // END METHODS

        // const dados = {
        //   type: "FeatureCollection",
        //   features: ctos
        // };

        // await map.getSource("cto").setData(dados);
        // const data = await store.getState().ctos.geojson.ctos;

        // let ctos = [];

        // // Se o id
        // // for diferente da cto atualizada
        // // adiciona no array, se for igual
        // // ao inv??s de adicionar a do forEach, adiciona
        // // a que vem do banco de dados
        // data.forEach(cto => {
        //   if (cto.properties.data.id !== ctoUpdated.properties.data.id) ctos.push(cto);
        //   else ctos.push(ctoUpdated);
        // });

        // const dados = {
        //   type: "FeatureCollection",
        //   features: ctos
        // };

        // await store.dispatch({
        //   type: "@cto/LOAD_GJ_SUCCESS",
        //   payload: { ctos }
        // });

        // await map.getSource("cto").setData(dados);
      });

      // Probably ok

      ceos.on("newCeo", async newCeo => {
        const data = await store.getState().ceo.geojson.ceos;

        let ceos = data;
        await ceos.push(newCeo);

        await store.dispatch({
          type: "@ceo/LOAD_GJ_SUCCESS",
          payload: { ceos }
        });

        const dados = await {
          type: "FeatureCollection",
          features: ceos //[...data, newCeo]
        };

        await map.getSource("ceo").setData(dados);
      });

      ceos.on("updatedCeo", async ceoUpdated => {
        const data = await store.getState().ceo.geojson.ceos;

        const ceos = [];

        await data.forEach(ceo => {
          if (ceo.properties.data.id !== ceoUpdated.properties.data.id) {
            ceos.push(ceo);
          } else {
            let ceoUp = ceoUpdated;
            const longitude = JSON.parse(ceoUpdated.properties.data.coordinates)
              .longitude;
            const latitude = JSON.parse(ceoUpdated.properties.data.coordinates)
              .latitude;
            ceoUp.geometry.coordinates = [longitude, latitude];

            ceos.push(ceoUp);
          }
        });

        await store.dispatch({
          type: "@ceo/LOAD_GJ_SUCCESS",
          payload: { ceos }
        });

        const dados = {
          type: "FeatureCollection",
          features: ceos
        };

        await map.getSource("ceo").setData(dados);
      });

      ceos.on("deletedCeo", async ceoDeleted => {
        const data = await store.getState().ceo.geojson.ceos;

        const ceos = [];

        await data.forEach(ceo => {
          if (ceo.properties.data.id !== ceoDeleted.id) {
            ceos.push(ceo);
          }
        });

        await store.dispatch({
          type: "@ceo/LOAD_GJ_SUCCESS",
          payload: { ceos }
        });

        const dados = {
          type: "FeatureCollection",
          features: ceos
        };
        await map.getSource("ceo").setData(dados);
      });

      cables.on('newCable', async newCable => {
        const data = await store.getState().cabo.geojson.cables;

        const cables = data;
        await cables.push(newCable);
        // console.log(store.getState().cabo)
        // console.warn(data)
        await store.dispatch({
          type: '@cable/LOAD_SUCCESS',
          payload: { cables }
        })

        const dados = {
          type: 'FeatureCollection',
          features: cables
        }

        await map.getSource("wires").setData(dados)
      })

      cables.on('deletedCable', async deletedCable => {
        const data = await store.getState().cabo.geojson.cables;

        const cables = [];
        
        await data.forEach(cable => {
          if (cable.properties.data.id !== deletedCable.id) {
            cables.push(cable)
          }
        })

        await store.dispatch({
          type: '@cable/LOAD_SUCCESS',
          payload: { cables }
        })

        const dados = {
          type: 'FeatureCollection',
          features: cables
        }

        await map.getSource("wires").setData(dados)

      })
      // cables.on('deletedCable',)

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

  loadImports(map) {
    map.on("load", function() {
      function importar(geojson) {
        let features = geojson.features.map(feature =>
          true
            ? {
                ...feature,
                geometry: {
                  type: "Point",
                  coordinates:
                    // [
                    feature.geometry.geometries //[0].coordinates,
                  // feature.geometry.geometries[0].coordinates[0],
                  // feature.geometry.geometries[0].coordinates[1]
                  // ]
                }
              }
            : feature
        );
        let geo = geojson;
        geo.features = features;
        console.log(geo);
        return geo;
      }

      function saveImportsOnDatabase(geojson) {
        let clients = geojson.features.map(feature => {
          const client = {
            name: feature.properties.NOME,
            pppoe: feature.properties.Name,
            endereco: feature.properties.ENDERE__O,
            obs: feature.properties.description
          };
          // eslint-disable-next-line no-unused-vars
          const longitude = feature.geometry;
          //  console.log(longitude)
          //  coordinates: JSON.stringify([feature.geometry.geometries[0].coordinates[0], feature.geometry.geometries[0].coordinates[1]])
          return client;
        });

        clients.forEach(client => {
          // api.post(`http://localhost:3333/clients`, client)
        });
      }

      const dados = importar(geojson);
      saveImportsOnDatabase(dados);

      const geojsondois = {
        type: "FeatureCollection",
        name: "vsfdesgrassa",
        features: [
          {
            type: "Feature",
            properties: {
              Name: "yali01",
              description:
                "descri????o: NOME: YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)<br>ENDERE??O: RUA DINATO RODRIGUES DE ALENCAR, 320<br>CTO: CTO: CENTRO ESP??RITA S??O MIGUEL<br>NOME: YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)<br>ENDERE??O: RUA DINATO RODRIGUES DE ALENCAR, 320<br>CTO: CTO: CENTRO ESP??RITA S??O MIGUEL",
              tessellate: "1",
              extrude: "0",
              visibility: "-1",
              descri____o:
                "NOME: YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)\nENDERE??O: RUA DINATO RODRIGUES DE ALENCAR, 320\nCTO: CTO: CENTRO ESP??RITA S??O MIGUEL",
              NOME: "YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)",
              ENDERE__O: "RUA DINATO RODRIGUES DE ALENCAR, 320",
              CTO: "CTO: CENTRO ESP??RITA S??O MIGUEL"
            },
            // "geometry": {
            //   "type": 'Point',
            //   "coordinates": [-37.061347, -8.425715]
            // }
            // ,
            geometry: {
              type: "GeometryCollection",
              geometries: [
                { type: "Point", coordinates: [-37.061347, -8.425715, 0.0] },
                {
                  type: "LineString",
                  coordinates: [
                    [-37.065675, -8.428961, 0.0],
                    [-37.057019, -8.428961, 0.0],
                    [-37.057019, -8.422469, 0.0],
                    [-37.065675, -8.422469, 0.0],
                    [-37.065675, -8.428961, 0.0]
                  ]
                }
              ]
            }
          },
          {
            type: "Feature",
            properties: {
              Name: "anny12",
              description:
                "descri????o: NOME: ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU ) <br>ENDERE??O: RUA BARBOSA LIMA, 246<br>CTO: CTO: SANTA RAMOS<br>NOME: ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU )<br>ENDERE??O: RUA BARBOSA LIMA, 246<br>CTO: CTO: SANTA RAMOS",
              tessellate: "-1",
              extrude: "0",
              visibility: "-1",
              descri____o:
                "NOME: ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU ) \nENDERE??O: RUA BARBOSA LIMA, 246\nCTO: CTO: SANTA RAMOS",
              NOME: "ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU )",
              ENDERE__O: "RUA BARBOSA LIMA, 246",
              CTO: "CTO: SANTA RAMOS"
            },
            geometry: {
              type: "Point",
              coordinates: [-37.054176, -8.418783, 0.0]
            }
          },
          {
            type: "Feature",
            properties: {
              Name: "livramento",
              description:
                "descri????o: NOME: ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP<br>ENDERE??O: RUA JOS?? ESTRELA DE SOUZA, 23<br>CTO: CTO: SUBINDO A CASA DO FARELO<br>NOME: ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP<br>ENDERE??O: RUA JOS?? ESTRELA DE SOUZA, 23<br>CTO: CTO: SUBINDO A CASA DO FARELO",
              tessellate: "1",
              extrude: "0",
              visibility: "-1",
              descri____o:
                "NOME: ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP\nENDERE??O: RUA JOS?? ESTRELA DE SOUZA, 23\nCTO: CTO: SUBINDO A CASA DO FARELO",
              NOME:
                "ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP",
              ENDERE__O: "RUA JOS?? ESTRELA DE SOUZA, 23",
              CTO: "CTO: SUBINDO A CASA DO FARELO"
            },
            geometry: {
              type: "GeometryCollection",
              geometries: [
                { type: "Point", coordinates: [-37.053913, -8.415811, 0.0] },
                {
                  type: "LineString",
                  coordinates: [
                    [-37.058241, -8.419057, 0.0],
                    [-37.049585, -8.419057, 0.0],
                    [-37.049585, -8.412565, 0.0],
                    [-37.058241, -8.412565, 0.0],
                    [-37.058241, -8.419057, 0.0]
                  ]
                }
              ]
            }
          }
        ]
      };
      map.loadImage(
        require("../../../assets/images/clienteCom24x12.png"),
        function(error, image) {
          if (error) throw error;
          map.addImage("import-cliente", image);
          /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
          map.addLayer({
            id: "import_clients",
            type: "symbol",
            source: "import_clients",
            layout: {
              "icon-image": "import-cliente"
            }
          });
        }
      );
      map.getSource("import_clients").setData(geojsondois);
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

        // cto_lotada cto_cliente_cancelado
        let ctos_ativas = [];
        let ctos_lotadas = [];
        let ctos_clientes_cancelados = [];

        data.forEach(cto => {
          if (cto.properties.data.status === "full") {
            ctos_lotadas.push(cto);
          } else if (cto.properties.data.status === "cli_cancel") {
            ctos_clientes_cancelados.push(cto);
          } else if (
            !cto.properties.data.status ||
            cto.properties.data.status === "active"
          ) {
            ctos_ativas.push(cto);
          }
        });

        const ctos_at = {
          type: "FeatureCollection",
          features: ctos_ativas
        };

        const ctos_cli_can = {
          type: "FeatureCollection",
          features: ctos_clientes_cancelados
        };

        const ctos_lot = {
          type: "FeatureCollection",
          features: ctos_lotadas
        };
        map.getSource("cto").setData(ctos_at);
        map.getSource("cto_lotada").setData(ctos_lot);
        map.getSource("cto_cliente_cancelado").setData(ctos_cli_can);
        // end

        // map.getSource("cto").setData(dados);
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

      // cto_lotada cto_cliente_cancelado
      map.loadImage(require("../../../assets/images/cto_lotada.png"), function(
        error,
        image
      ) {
        if (error) throw error;
        map.addImage("custom_cto_full", image);
        map.addLayer({
          id: "cto_lotada",
          type: "symbol",
          source: "cto_lotada",
          layout: {
            "icon-image": "custom_cto_full"
          }
        });
      });

      map.loadImage(require("../../../assets/images/cto_verde.png"), function(
        error,
        image
      ) {
        if (error) throw error;
        map.addImage("custom_cto_can", image);
        map.addLayer({
          id: "cto_cliente_cancelado",
          type: "symbol",
          source: "cto_cliente_cancelado",
          layout: {
            "icon-image": "custom_cto_can"
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

        // eslint-disable-next-line no-unused-vars
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

  /**
   * Under construction
   */
  loadCable(map) {
    map.on("load", function() {
      api
        .get(API.GET_CABO_GEOJSON)
        .then(response => {
          const { data } = response;

          const dat = {
            type: "FeatureCollection",
            features: data
          };

          store.dispatch({
            type: '@cable/LOAD_SUCCESS',
            payload: { cables: data }
          })
          

          map.getSource("wires").setData(dat);
        })
        .catch(error => {});
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
    Fun????o para medir distancia entre 2 pontos no mapa 
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

  /** Aqui criamos uma fun????o que usa uma feature do HTML5, chamada getCurrentPosition, que pega as informa????es de
  latitude e longitude do browser, caso o usuario permita, da?? jogamos essas informa????es no estado da nossa
  aplica????o para usar uma feature do mapbox logo em seguida, que vai fazer um 'flyTo' da posi????o inicial at?? a
  posi????o do usuario, esse evento ?? cha56500, Arcoverde, Pernambuco, Brasilmado pelo clique do bot??o 'Me Encontre'. */
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

        <div id="geocoder" className="geocoder"></div>
        <div id="distance" className="distance-container"></div>

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
 * Mapear todas as fun????es dos Creators{Reducers} para o props;
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
