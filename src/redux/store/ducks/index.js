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
import imports from "./imports";

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
