import React from "react";

import MapO from "../MapO";

import AddNewCto from "../../CTO/AddCto/index";

import AddNewFuncionario from "../../User/AddUser/index";

import AddNewProvider from "../../Provider/AddProvider/index";

import AddNewClient from "../../Client/AddClient/index";

import AddCeo from "../../CEO/AddCeo/index";

import ViewClient from "../../Client/ViewClient/index";
import ViewCeo from "../../CEO/ViewCeo/index";
import ViewCto from "../../CTO/ViewCto/index";
import ModalTabList from "../../View/index";
import ModalSplitter from "../../Splitter/AddSplitter/index";

import CaboAdd from "../../Cable/CaboAdd";
import AddRelCliCto from "../../Splitter/AddRelCliCto";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

const MainMap = props => (
  <div>
    <ViewClient />
    <ViewCeo />
    <ViewCto />
    <ModalTabList />
    <ModalSplitter />

    <AddCeo />
    <AddNewProvider />
    <AddNewClient />
    <AddNewCto />
    <AddNewFuncionario />
    <CaboAdd />
    <AddRelCliCto />
    <MapO
      container="map"
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v11"
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
