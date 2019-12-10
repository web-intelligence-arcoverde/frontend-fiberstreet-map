/* eslint-disable no-fallthrough */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as MapCreators } from "../../../redux/store/ducks/map";

/* mapBox */
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import store from "../../../redux/store";

//Websockets
import socket from "../../../services/socket";

//CSS
import "./map.css";

/* Acões no mapa */
import { loadControllers } from "./Controller/index";

//Componentes
import LeftMenu from "./Components/left-menu/index";
import LoadPages from "../../index";
import IconsBottom from "./Components/icons-drawn-line/index";

/* */
import { addGeojson } from "./Controller/add-geojson/index";

/* Carregar icons e buscar na api objetos do mapa[inicio] */
import { clientes } from "./Controller/load-clients/index";
import { ctos } from "./Controller/load-ctos/index";
import { ceos } from "./Controller/load-ceos/index";
import { cables } from "./Controller/load-cables/index";
/* Carregar icons e buscar na api objetos do mapa[fim] */

/* Abrir [cto,ceo,client] */
import { openObject } from "./Controller/click-object-map/index";

/* Socket */
import { loadSocket } from "./Controller/socket/index";

/* Desenha cabos */
import { drawn } from "./Controller/drawn-lines/index";

var geojson = {
  type: "FeatureCollection",
  features: []
};

// Used to draw a line between points
function Map(props) {
  const [center, setCenter] = useState([-37.0601269, -8.424398]);
  const [map, setMap] = useState(null);
  const { container, zoom, accessToken, style } = props;
  const { classNameStyle } = props;
  const url = "https://wanderdrone.appspot.com";

  const { visible } = props.redux.map.showIconsDrawn;

  useEffect(() => {
    handleMap(container, center, zoom, accessToken, style);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Recebe as props que passamos no nosso container,
   * Cria uma constante chamada Map,
   * Cria um novo mapa ( igual na doc Mapbox em getStarted ) setCoordinatesClick
   * Passa para o state a constante de mapa para não ficarmos criando objetos globais
   */
  function handleMap(container, center, zoom, accessToken, style) {
    mapboxgl.accessToken = accessToken;
    var map = new mapboxgl.Map({
      container: container,
      style: style,
      center: center,
      zoom: zoom
    });

    var geo = document.getElementById("geocoder");
    var distanceContainer = document.getElementById("distance");

    addGeojson(map, geojson);
    loadControllers(map, geojson, distanceContainer, geo, store);
    clientes(map, url, store);
    ctos(map, url, store);
    ceos(map, url, store);
    cables(map, url, store);
    openObject(map, store);
    loadSocket(map, store, socket);
    drawn(map);

    setMap(map);
  }

  return (
    <>
      <div id={container} className={classNameStyle} />
      <div id="geocoder" className="geocoder" />
      <div id="distance" className="distance-container" />
      <LeftMenu map={map} />
      {visible === true ? <IconsBottom map={map} /> : <></>}

      <LoadPages />
    </>
  );
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
  bindActionCreators({ ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
