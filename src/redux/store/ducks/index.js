import { combineReducers } from "redux";

import all from "./all";
import ctos from "./ctos";
import map from "./map";
// import { reducer } from "../../store";

export default combineReducers({
  all,
  ctos,
  map
});
