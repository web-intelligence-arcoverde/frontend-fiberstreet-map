import React, { Fragment } from "react";
import Map from "../Map";
import AddCto from "../components/AddCto";
import ViewCto from "../components/ViewCto";
import LeftSelector from "../components/LeftSelector";
import SpAddModel from "../components/SpAddModal";
import ClienteAddModal from "../components/ClienteAddModal";
import ViewCliente from "../components/ViewCliente";

const MainMap = () => (
  <Fragment>
    <Map />
    <LeftSelector />
    <AddCto />
    <ViewCto />
    <SpAddModel />
    <ClienteAddModal />
    <ViewCliente />
    {/* <AddCliente /> */}
  </Fragment>
);

export default MainMap;
