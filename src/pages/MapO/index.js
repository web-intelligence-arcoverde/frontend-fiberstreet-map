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
import "./map.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "./header";
import api from "../../services/api";
import * as Actions from "../../redux/store/actions/all";
import MapController from "./MapController";

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

  componentDidMount() {
    const { container, style, zoom, accessToken } = this.props;
    const { center } = this.state;
    this.handleMap(container, style, center, zoom, accessToken);
    this.handlePosition();
  }

  /** Recebe as props que passamos no nosso container e cria uma constante chamada Map
   * Cria um novo mapa ( igual na doc Mapbox em getStarted )
   * Passa para o state a constante de mapa para não ficarmos criando objetos globais
   */
  handleMap(container, style, center, zoom, accessToken) {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: container,
      style: style,
      center: center,
      zoom: zoom
    });

    // map.on("load", () => this.loadAsCoisas());
    // map.on("load", () => {
    //   // map.addLayer(myDeckLayer);
    // });
    // map.on("load", () => {
    //   // map.addLayer(layer);
    // });
    map.on("click", e => this.handleMapClick(e));

    this.setState({
      map: map
    });
    this.obterDadosDoServidor(map);
  }

  loadAsCoisas = () => {
    const { map } = this.state;
    let route = [
      [-122.48369693756104, 37.83381888486939],
      [116.48348236083984, 37.83317489144141]
    ];
    let geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route
      }
    };
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route
          }
        }
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#2287be",
        "line-width": 5,
        "line-opacity": 0.75
      }
    });
  };

  handleMapClick = e => {
    const { lng: longitude, lat: latitude } = e.lngLat;
    console.tron.log(e.lngLat);
    console.tron.log(`Longitude: ${longitude}, Latitude: ${latitude}`);
    // alert(`Longitude: ${longitude}, Latitude: ${latitude}`);
  };

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

  /** Obtém os dados do servidor e armazena no redux para mostrar no mapa */
  async obterDadosDoServidor(map) {
    const { setCtoFromServer } = this.props;
    let information = {
      type: "cto"
    };
    await api
      .post("/get/cto", information)
      .then(result => {
        let data = result.data;
        // this.state.cto = data;
        console.tron.log(data);
        setCtoFromServer(data);
        // console.warn(this.props);
        console.tron.log({ functions: this.props });
        this.loadCtos(map);
        this.obterCabos(map);
      })
      .catch(err => {
        console.warn(err);
      });
    // await this.obterClientes();
  }
  async obterCabos(map) {
    const { setPolylinesFromServer } = this.props;
    await api
      .get("/cabo/get")
      .then(result => {
        let data = result.data;
        let arrayDados = data.map(dado => {
          let coord = JSON.parse(dado.coordenadas);
          let arrayDeLocalizacao = coord.map(dado => {
            return [dado.longitude, dado.latitude];
          });

          return {
            ...dado,
            coordenadas: arrayDeLocalizacao
          };
        });

        console.tron.log(arrayDados);
        setPolylinesFromServer(arrayDados);
        this.loadWires(map);
      })
      .catch(err => console.tron.warn(err));
  }

  async loadCtos(map) {
    let ctoFeatures = [];
    await this.props.redux.mapa.cto.map((cto, index) => {
      let latitude = JSON.parse(cto.coordenadas).latitude;
      let longitude = JSON.parse(cto.coordenadas).longitude;
      console.tron.log({ CTOS: cto });
      let data = {
        type: "Feature",
        properties: {
          data: cto
        },
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      };
      ctoFeatures.push(data); // nome
      console.tron.log(ctoFeatures);

      const myData = new MapboxLayer({
        id: "my-scatterplot",
        type: ScatterplotLayer,
        data: [{ position: [longitude, latitude], size: 3 }],
        getPosition: d => d.position,
        getRadius: d => d.size,
        getColor: [255, 0, 0]
      });
      const ICON_MAPPING = {
        marker: { x: 0, y: 0, width: 32, height: 32, mask: true }
      };
      let coordenadas = [longitude, latitude];

      const layersx = new MapboxLayer({
        id: "bitmap-layer",
        type: BitmapLayer,
        bounds: [-77.038659, 38.931567], //coordenadas,
        image:
          "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/sf-districts.png"
      });

      // start
      let geoson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
              icon: "theatre"
            },
            geometry: {
              type: "Point",
              coordinates: [-77.038659, 38.931567]
            }
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
              icon: "theatre"
            },
            geometry: {
              type: "Point",
              coordinates: [-77.003168, 38.894651]
            }
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
              icon: "bar"
            },
            geometry: {
              type: "Point",
              coordinates: [-77.090372, 38.881189]
            }
          }
        ]
      };

      let markers = {
        id: "places",
        type: "symbol",
        source: {
          type: "geojson",
          data: geoson
        },
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        }
      };
    });
    map.on("click", "markers", function(e) {
      console.tron.log("Você cricou nos prace");
      console.tron.log(e.features[0]);
      let coordinates = e.features[0].geometry.coordinates.slice();
      const stringed = e.features[0].properties.data;
      const description = JSON.parse(stringed).nome;
      console.tron.log(e.features[0].properties.data);
      console.tron.log(description);

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "markers", function() {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "markers", function() {
      map.getCanvas().style.cursor = "";
    });
    /* Image: An image is loaded and added to the map. */
    map.loadImage(require("../../assets/images/CTO_24x24.png"), function(
      error,
      image
    ) {
      if (error) throw error;
      map.addImage("custom-marker", image);
      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      map.addLayer({
        id: "markers",
        type: "symbol",
        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: ctoFeatures
          }
        },
        layout: {
          "icon-image": "custom-marker"
        }
      });
    });
  }

  async loadWires(map) {
    this.props.redux.mapa.cabos.map((wire, index) => {
      console.tron.log(this.props.redux);
      const { coordenadas } = wire;
      const layer = new MapboxLayer({
        id: `${index}`,
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordenadas
          }
        },
        type: GeoJsonLayer,
        pickable: true,
        stroked: false,
        filled: true,
        extruded: true,
        lineWidthScale: 2,
        lineWidthMinPixels: 2,
        getFillColor: [160, 160, 180, 200],
        getLineColor: [255, 0, 0], //d => colorToRGBArray(d.properties.color),
        getRadius: 100,
        getLineWidth: 1,
        getElevation: 30
        // onHover: ({ object, x, y }) => {
        //   const tooltip = object.properties.name || object.properties.station;
        //   /* Update tooltip
        //     http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
        //   */
        // }
      });
      map.addLayer(layer);
    });
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
    const { map } = this.state;
    return (
      <div id={container} className={classNameStyle}>
        <Header title="FiberStreet Maps - GZ NET" />
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

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

/**
 * https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/
 * https://medium.com/vis-gl/deckgl-and-mapbox-better-together-47b29d6d4fb1
 */
