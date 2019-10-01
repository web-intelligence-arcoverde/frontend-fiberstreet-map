import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ReduxToastr from "react-redux-toastr";

import Routes from "./routes";
import GlobalStyle from "./styles/global";

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <>
      <LayoutProvider>
        <UserProvider>
          <ThemeProvider theme={Themes.default}>
            <ReduxToastr />
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </UserProvider>
      </LayoutProvider>
    </>
  );
};
export default App;
