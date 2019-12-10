import React from "react";
import NewModalClient from "./Client/AddClient/index";
import NewModalCto from "./CTO/AddCto/index";
import NewModalCeo from "./CEO/AddCeo/index";
import NewModalProvider from "./Provider/AddProvider/index";
import NewModalFunctionary from "./User/AddUser/index";

import ViewClient from "./Client/ViewClient/index";
import ViewCto from "./CTO/ViewCto/index";
import ViewCeo from "./CEO/ViewCeo/index";

import CableAdd from "./Cable/CaboAdd/index";
import CableAddObToOb from "./Cable/AddCableCtoToCto/index";
import ViewCable from "./Cable/viewCable/index";
import AddCableLoose from "./Cable/AddCableLoose/index";

import SplitterRelAdd from "./Splitter/AddRelCliCto/index";
import SplitterAdd from "./Splitter/AddRelCliCto/index";

function LoadPages() {
  return (
    <>
      <NewModalCeo />
      <NewModalCto />
      <NewModalClient />
      <NewModalProvider />
      <NewModalFunctionary />

      <ViewClient />
      <ViewCto />
      <ViewCeo />

      <CableAdd />
      <CableAddObToOb />
      <ViewCable />
      <AddCableLoose />

      <SplitterRelAdd />
      <SplitterAdd />
    </>
  );
}

export default LoadPages;
