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

//Componentes
import LeftSelector from "./Components/LeftSelector/index";

//CSS
import "./map.css";

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
      center: [-37.0601269, -8.424398] //Centralizar mapa
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

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.map = map;
  };

  /* Faz a configuração inicial do mapa */
  firstConfigure() {
    let { map } = this.state;

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
      default:
        break;
    }
  }

  async openNewModalCtos(coordinates) {
    const { showNewViewModal, setDelemitationMap } = this.props;
    await showNewViewModal(coordinates);
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
      ...clientCreators
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
