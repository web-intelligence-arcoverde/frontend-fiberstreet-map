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

export default combineReducers({
  provider,
  client,
  user,
  map,
  ctos,
  router: connectRouter(history)
});
