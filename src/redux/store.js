import { createStore, combineReducers } from "redux";
import * as Types from "./store/type";

const INITIAL_STATE = {
  markers: []
};

function reducer(state, action) {
  switch (action.type) {
    case Types.addMarker:
      return { ...state, markers: [...state.markers, action.payload.markers] };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;