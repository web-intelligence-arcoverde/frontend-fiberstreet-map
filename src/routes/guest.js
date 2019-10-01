import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import store from "../redux/store";

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !store.getState().auth.signedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/map", state: { from: props.location } }} />
      )
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default GuestRoute;
