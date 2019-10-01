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

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest exact path="/" component={SignIn} />
      <Guest path="/signup" component={SignUp} />
      <Guest exact path="/recover" component={Recover} />
      <Private path="/map" exact component={MainMap} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
