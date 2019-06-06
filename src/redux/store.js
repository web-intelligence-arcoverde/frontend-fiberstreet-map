import { createStore, combineReducers } from "redux";
import * as Types from "./store/type";

const INITIAL_STATE = {
  markers: [],
  modalCto: true
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.addMarker:
      return { ...state, markers: [...state.markers, action.payload.markers] };
    case Types.addCto:
      return { ...state, cto: [...state.cto, action.payload.cto] };
    case "OPEN_MODAL_CTO":
      return { ...state, modalCto: action.payload.modalCto};
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
