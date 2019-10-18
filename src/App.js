import React from "react";
import ReduxToastr from "react-redux-toastr";
import Routes from "./routes";

//Provider
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

//Material-UI
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

//React-bootstrap

//Theme
import Themes from "./themes";

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
