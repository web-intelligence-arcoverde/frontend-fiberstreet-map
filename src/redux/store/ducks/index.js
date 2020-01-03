import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../../../routes/history";

/*
  Distribuir ações para suas devidas reducers
          (Organizar este arquivo)
                {Reducers}
*/

import ctos from "./ctos";
import user from "./user";
import map from "./map";
import provider from "./provider";
import client from "./cliente";
import ceo from "./ceo";
import splitter from "./splitter";
import cabo from "./cabo";
import drop from "./drop";
import fiberfusion from "./fiberfusion";
import invite from "./invite";
import coordinates from "./coordinates";
<<<<<<< HEAD
import imports from "./imports";
=======
import imports from "./import";
>>>>>>> 58e7c5a2011dcc7332fd81a83e22fd3c0d48b6db

import { reducer as auth } from "./auth";
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  coordinates,
  splitter,
  ceo,
  toastr,
  auth,
  provider,
  client,
  user,
  map,
  ctos,
  cabo,
  drop,
  fiberfusion,
  invite,
  imports,
  router: connectRouter(history)
});
