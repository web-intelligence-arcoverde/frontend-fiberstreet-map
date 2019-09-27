import React from "react";
/** Verifica autenticação no serviço */
import { isAuthenticated } from "../services/auth";

/** Imports de rotas */
import { Route, Switch, Redirect } from "react-router-dom";

/** ReactRouterDom + Redux */
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

/** Rota Mapbox */
import MainMap from "../pages/Mapa/MainMap";

/** Rotas de autenticação */
import Signup from "../pages/Account/SignUp/index";
import Signin from "../pages/Account/SignIn/index";
import Recover from "../pages/Account/Recorvery/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} // recebe todos os parametros
    render={(
      props // O método render verifica se está autenticado
    ) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const PrivateRouteForLogedUser = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect
          to={{ pathname: "/app/dashboard", state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Signin} />
      {/* <Route exact path="/" component={Signup} /> */}
      {/* <PrivateRouteForLogedUser exact path="/" component={Signin} /> */}
      {/* <h1>
            Rotas de boas-vindas ao sistema, informação dos serviços, e etc
          </h1> */}
      {/* <Route exact path="/signin" component={() => <Signin />} /> */}
      <PrivateRoute path="/app" component={() => <h1>Você está logado</h1>} />
      {/* <PrivateRoute exact path="/map" component={() => <Map />} /> */}
      <PrivateRoute exact path="/map" component={MainMap} />
      <PrivateRoute
        exact
        path="/dashboard"
        component={() => <h1>Aqui será mostrado o Componente do dashboard</h1>}
      />
      <PrivateRoute
        exact
        path="/dashboard/user"
        component={() => (
          <h1>
            Aqui será mostrado os usuários, deve-se adicionar um / após o user
            indicando o usuário que será detalhado informações{" "}
          </h1>
        )}
      />

      <Route
        exact
        path="/about"
        component={() => (
          <h1>Aqui será mostrado a página de informações sobre o sistema</h1>
        )}
      />
      <Route
        exact
        path="/dev"
        component={() => <h1>Informações sobre o desenvolvedor do sistema</h1>}
      />
      <Route
        exact
        path="/companys"
        component={() => <h1>Empresas que estão usando o sistema</h1>}
      />

      <Route exact path="/recover" component={Recover} />

      <PrivateRouteForLogedUser
        exact
        path="/login"
        // component={() => <Login />}
        component={Signin}
      />

      <PrivateRouteForLogedUser exact path="/signup" component={Signup} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
