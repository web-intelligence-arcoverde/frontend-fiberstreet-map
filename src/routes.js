import React from "react";
/** Verifica autenticação no serviço */
import { isAuthenticated } from "./services/auth";
/** Imports de rotas */
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
/** Rota Mapbox */
import Map from "./pages/Map";
/** Rotas de autenticação */
import Signin from "./pages/Signin";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <h1>
            Rotas de boas-vindas ao sistema, informação dos serviços, e etc
          </h1>
        )}
      />
      <Route exact path="/signin" component={() => <Signin />} />
      <PrivateRoute
        exact
        path="/app"
        component={() => <h1>Você está logado</h1>}
      />
      <PrivateRoute exact path="/map" component={() => <Map />} />
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
    </Switch>
  </BrowserRouter>
);

export default Routes;
