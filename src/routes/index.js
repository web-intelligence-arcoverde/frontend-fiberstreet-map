import React from "react";

/* Imports de rotas */
import { Route, Switch, Redirect } from "react-router-dom";

/* ReactRouterDom + Redux */
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

import Private from "./private";
import Guest from "./guest";

/* Rota Mapbox */
import MainMap from "../pages/Mapa/MainMap";

/* Rotas de autenticação */
import SignUp from "../pages/Account/SignUp/index";
import SignIn from "../pages/Account/SignIn/index";
import Recover from "../pages/Account/Recorvery/index";
import Provider from "../pages/Account/SignUp/Components/Provider";

import Download from "../pages/Download";

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest exact path="/" component={SignIn} />
      <Guest exact path="/provider" component={Provider} />
      <Guest path="/signup" component={SignUp} />
      <Guest exact path="/recover" component={Recover} />
      <Private path="/map" exact component={MainMap} />
      <Guest path="/download" exact component={Download} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
