import React, { Fragment } from "react";

import AddCto from "../components/AddCto";
import ViewCto from "../components/ViewCto";
import LeftSelector from "../components/LeftSelector";
import SpAddModel from "../components/SpAddModal";
import ClienteAddModal from "../components/ClienteAddModal";
import ViewCliente from "../components/ViewCliente";
import CaboAdd from "../components/CaboAdd";
import AddNewCabo from "../components/AddNewCabo";

import MapO from "../MapO";

import AddRelCliCto from "../components/AddRelCliCto";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

const MainMap = () => (
  <div>
    <MapO
      container="map"
      style="mapbox://styles/mapbox/light-v9"
      zoom={18}
      classNameStyle="mapContainer"
      accessToken={TOKEN}
    />

    <LeftSelector />

    <AddCto />
    <ViewCto />
    <SpAddModel />
    <ClienteAddModal />
    <ViewCliente />
    <CaboAdd />
    <AddRelCliCto />

    <AddNewCabo />
  </div>
);

export default MainMap;
