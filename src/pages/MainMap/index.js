import React, { Fragment } from "react";
import Map from "../Map";
import AddCto from "../components/AddCto";
import ViewCto from "../components/ViewCto";
import LeftSelector from "../components/LeftSelector";
import SpAddModel from "../components/SpAddModal";

const MainMap = () => (
  <Fragment>
    <Map />
    <LeftSelector />
    <AddCto />
    <ViewCto />
    <SpAddModel />
  </Fragment>
);

export default MainMap;
