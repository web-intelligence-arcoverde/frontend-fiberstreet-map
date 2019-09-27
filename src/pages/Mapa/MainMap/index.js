import React from "react";

import MapO from "../MapO";

import AddNewCto from "../../CTO/AddCto/index";

import AddNewFuncionario from "../../User/AddUser/index";

import AddNewProvider from "../../Provider/AddProvider/index";

import AddNewClient from "../../Client/AddClient/index";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

const MainMap = props => (
  <div>
    <AddNewProvider />
    <AddNewClient />
    <AddNewCto />
    <AddNewFuncionario />
    <MapO
      container="map"
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/light-v9"
      zoom={14}
      classNameStyle="mapContainer"
      accessToken={TOKEN}
    />
  </div>
);

/* Colocando componentes na tela
<LeftSelector />
<AddCto />
<ViewCto />
<SpAddModel />
<ClienteAddModal />
<ViewCliente />
<AddRelCliCto />
*/

/* Importando components
import AddCto from "../../CTO/AddCto";
import ViewCto from "../../CTO/ViewCto";

import LeftSelector from "../../Components/LeftSelector/";
import AddRelCliCto from "../../Splitter/AddRelCliCto";
import SpAddModel from "../../Splitter/AddSplitter";

//Component Cliente
import ClienteAddModal from "../../Client/AddClient";
import ViewCliente from "../../Client/ViewClient";
*/

/*
        OBS:Pq os dois? 
import CaboAdd from "../components/CaboAdd";
import AddNewCabo from "../components/AddNewCabo";
*/

export default MainMap;
