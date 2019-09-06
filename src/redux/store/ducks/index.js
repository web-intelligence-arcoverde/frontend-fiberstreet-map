import { combineReducers } from "redux";

import all from "./all";
import ctos from "./ctos";
import map from "./map";
import drop from "./drop";
import cliente from "./cliente";
import cabo from "./cabo";
// import { reducer } from "../../store";

import { connectRouter } from "connected-react-router";
import history from "../../../routes/history";

export default combineReducers({
  all,
  ctos,
  map,
  drop,
  cliente,
  cabo,
  router: connectRouter(history)
});
