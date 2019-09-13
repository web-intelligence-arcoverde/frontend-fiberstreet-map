import React, { Component } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import {
  ScatterplotLayer,
  GeoJsonLayer,
  IconLayer,
  BitmapLayer
} from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../components/Header";
import api, { API } from "../../services/api";
import * as Actions from "../../redux/store/actions/all";
import { Creators as CtosActions } from "../../redux/store/ducks/ctos";
import { Creators as MapCreators } from "../../redux/store/ducks/map";

import Button from "./button";

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
    /* Update tooltip
      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
    */
  }
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // center: [-75.5, 40]
      center: [-77.031706, 38.914581] //[-49.6446024, -27.2108001]
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

  /** Recebe as props que passamos no nosso container e cria uma constante chamada Map
   * Cria um novo mapa ( igual na doc Mapbox em getStarted )
   * Passa para o state a constante de mapa para não ficarmos criando objetos globais
   */
  handleMap = (container, style, center, zoom, accessToken) => {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: container,
      style: style,
      center: center,
      zoom: zoom
    });

    // this.setState({map})
    this.state.map = map;
    // Configura eventos de clique no mapa

    // this.obterDadosDoServidor(map);
  };

  /** Faz a configuração inicial do mapa */
  firstConfigure() {
    let { map } = this.state;
    const { showDataInViewModal, addMapSuccess } = this.props;

    map.on("click", e => this.handleMapClick(e));
    var url = "https://wanderdrone.appspot.com";
    var urlFS = "http://localhost:3333/get/cto";
    map.on("load", function() {
      window.setInterval(function() {
        // Carrega as CTOS
        api.get(API.GET_CTO_GEOJSON).then(result => {
          const { data } = result;
          const dados = {
            type: "FeatureCollection",
            features: data
          };
          map.getSource("cto").setData(dados);
        });
        // Carrega os Clientes
        api.get(API.GET_CLIENTE_GEOJSON).then(result => {
          const { data } = result;
          const dados = {
            type: "FeatureCollection",
            features: data
          };
          map.getSource("cliente").setData(dados);
        });

        // Configurando obtenção dos cabos de fibra optica
        api.get(API.GET_CABO_GEOJSON).then(result => {
          const { data } = result;
          // LAYER DATA
          const dados = {
            type: "FeatureCollection",
            features: data
          };
          map.getSource("wires").setData(dados);

          // LAYER
        });
      }, 3700);
      // init Carrega cabos
      map.addSource("wires", {
        type: "geojson",
        data: url
      });
      map.addLayer({
        id: "wires",
        source: "wires",
        type: "line" //GeoJsonLayer,
        // pickable: true,
        // stroked: false,
        // filled: true,
        // extruded: true,
        // lineWidthScale: 2,
        // lineWidthMinPixels: 2,
        // getFillColor: [160, 160, 180, 200],
        // getLineColor: [255, 0, 0], //d => colorToRGBArray(d.properties.color),
        // getRadius: 100,
        // getLineWidth: 1,
        // getElevation: 30
        // onHover: ({ object, x, y }) => {
        //   const tooltip = object.properties.name || object.properties.station;
        //   /* Update tooltip
        //     http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
        //   */
        // }
      });
      // map.on("mouseenter", "wires", function(e) {
      //   new mapboxgl.Popup()
      //     .setLngLat(e.lngLat)
      //     .setHTML(e.features[0].properties.name)
      //     .addTo(map);
      // });
      // end Carrega cabos

      // Adiciona cto
      map.addSource("cto", {
        type: "geojson",
        data: url
      });
      // console.tron.log(this.props);

      // Carrega cto
      map.loadImage(require("../../assets/images/CTO_24x24.png"), function(
        error,
        image
      ) {
        if (error) throw error;
        map.addImage("custom-CTO", image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        map.addLayer({
          id: "cto",
          type: "symbol",
          source: "cto",
          layout: {
            "icon-image": "custom-CTO" //"rocket-15"
          }
        });
      });
      // end Carrega cto
      // ini Carrega Cliente
      map.addSource("cliente", {
        type: "geojson",
        data: url
      });
      map.loadImage(
        require("../../assets/images/clienteCom24x12.png"),
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
      // end Carrega cliente
    });

    this.desenharPolylineAtual();
    this.handleClicks(map);
  }

  /** Configuração de evento de clique nos objetos que estão no mapa
   * 'drone' now 'cto' -> Representa a CTO
   */
  handleClicks(map) {
    // Cliques na cto
    map.on("click", "cto", e => this.handleCtoClick(e.features[0]));
    // Evento de clique nos Clientes
    map.on("click", "cliente", e => this.handleCtoCaboClick(e));
  }

  handleCtoClick = features => {
    const { properties } = features;
    let longitude = features.geometry.coordinates[0];
    let latitude = features.geometry.coordinates[1];

    const data = JSON.parse(properties.data);

    this.handleCtoClickTwoFactor(data, longitude, latitude);
  };

  handleCtoClickTwoFactor(cto, longitude, latitude) {
    if (this.props.redux.all.mapa.delimitacao === "cabo") {
      const { addCoordCabo, setDelimitacaoMapa, showAddCaboModal } = this.props;
      const { polyline } = this.props.redux.all.mapa;
      let newPolyline = [...polyline, [longitude, latitude]];

      addCoordCabo(newPolyline);
      showAddCaboModal(cto.id);
      setDelimitacaoMapa("default");
    } else {
      const { showDataInViewModal } = this.props;
      showDataInViewModal(cto);
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

  handleMapClick = e => {
    const { lng: longitude, lat: latitude } = e.lngLat;
    const { addCoordenadas, canAddCoordenadas } = this.props;
    addCoordenadas({ longitude: longitude, latitude: latitude });
    canAddCoordenadas(false);
    let coordinates = {
      latitude: latitude,
      longitude: longitude
    };
    this.verificaTipoDelimitacao(coordinates);
  };

  /**
   * Verifica o tipo de delimitação selecionada,
   * adiciona o tipo de marcador selecionado nas coordenadas no mapa selecionada
   * @param coordinates coordenadas selecionadas no mapa
   * */
  verificaTipoDelimitacao(coordinates) {
    const { mapa } = this.props.redux.all;

    switch (mapa.delimitacao) {
      case "cto":
        this.openModal(coordinates);
        break;
      case "ceo":
        break;
      case "splitter":
        break;
      case "cliente":
        this.openModalAddClient(coordinates);
        break;
      case "fibra":
        break;
      case "cabo":
        this.addCoordenadasCabo(coordinates);
        break;
      default:
        break;
    }
  }

  /**
   * Abre o modal de adição de CTO
   * @param coordinates Coordenadas de onde ficará a CTO
   */
  async openModal(coordinates) {
    const { showModalCto, setDelimitacaoMapa } = this.props;
    await showModalCto(coordinates);
    setDelimitacaoMapa("default");
  }

  /**
   * Abre o modal de adição de cliente
   * @param coordinates Coordenadas de onde o cliente será inserido
   * */
  async openModalAddClient(coordinates) {
    const { showAddClienteModal, setDelimitacaoMapa } = this.props;
    await showAddClienteModal(coordinates);
    setDelimitacaoMapa("default");
  }

  /** Adiciona coordenadas ao JSON de coordenadas de polyline contido no redux store
   * mapa.polyline - REDUX
   */
  addCoordenadasCabo(coordenadas) {
    const { addCoordCabo } = this.props;
    const { polyline } = this.props.redux.all.mapa;
    let newPolyline = [
      ...polyline,
      [coordenadas.longitude, coordenadas.latitude]
    ];
    addCoordCabo(newPolyline);
    this.adicionarCoordenadasAoCabo(newPolyline);
  }

  /** Aqui criamos uma função que usa uma feature do HTML5, chamada getCurrentPosition, que pega as informações de
  latitude e longitude do browser, caso o usuario permita, daí jogamos essas informações no estado da nossa
  aplicação para usar uma feature do mapbox logo em seguida, que vai fazer um 'flyTo' da posição inicial até a
  posição do usuario, esse evento é chamado pelo clique do botão 'Me Encontre'. */
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
      err => {
        console.log(err);
      },
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

  adicionarCoordenadasAoCabo(coordinates) {
    const { map } = this.state;
    const { polyline } = this.props.redux.all.mapa;
    map.getSource("putaquepariu").setData({
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
    map.getSource("lollipop").setData({
      type: "geojson",
      data: datab
    });
  }

  /**
   * Método responsável por criar a polyline de adição atual
   */
  desenharPolylineAtual() {
    const { map } = this.state;
    const { polyline } = this.props.redux.all.mapa;
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

    this.setState({ map });
  }

  //HEADER
  render() {
    const { container, classNameStyle } = this.props;
    const { polyline } = this.props.redux.all.mapa;

    return (
      <div id={container} className={classNameStyle}>
        <Header />
      </div>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...Actions, ...CtosActions, ...MapCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

/**
 * https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/
 * https://medium.com/vis-gl/deckgl-and-mapbox-better-together-47b29d6d4fb1
 */

/**
 *
 * TESTE TO RELOAD DATA
 * https://docs.mapbox.com/mapbox-gl-js/example/live-geojson/
 * Save geojson in redux and this is reloaded in the actions of redux
 */
