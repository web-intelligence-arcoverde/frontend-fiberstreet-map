import React, { Fragment } from "react";
// import Map from "../Map";
import AddCto from "../components/AddCto";
import ViewCto from "../components/ViewCto";
import LeftSelector from "../components/LeftSelector";
import SpAddModel from "../components/SpAddModal";
import ClienteAddModal from "../components/ClienteAddModal";
import ViewCliente from "../components/ViewCliente";
import CaboAdd from "../components/CaboAdd";
import Button from "../components/Button";
import MapO from "../MapO";
import Header from "../MapO/header";
import AddRelCliCto from '../components/AddRelCliCto';
// import Maps from "../MapboxDeckGl";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

const MainMap = () => (
  <Fragment>
    {/* <Map /> */}

    {/* <div> */}
    {/* <Header title="UxFs Maps" /> */}
    <MapO
      container="map"
      style="mapbox://styles/mapbox/light-v9"
      //style="mapbox://styles/mapbox/traffic-night-v2"
      zoom={18}
      classNameStyle="mapContainer"
      accessToken={TOKEN}
    />
    {/* <Maps
      container="map"
      style="mapbox://styles/mapbox/light-v9"
      //style="mapbox://styles/mapbox/traffic-night-v2"
      zoom={18}
      classNameStyle="mapContainer"
      accessToken={TOKEN}
    /> */}

    <LeftSelector />
    {/* </div> */}

    <AddCto />
    <ViewCto />
    <SpAddModel />
    <ClienteAddModal />
    <ViewCliente />
    <CaboAdd />
    <AddRelCliCto />
    {/* <AddCliente /> */}
  </Fragment>
);

export default MainMap;
