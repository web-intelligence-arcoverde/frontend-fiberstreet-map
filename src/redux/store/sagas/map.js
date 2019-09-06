import { put } from "redux-saga/effects";
import { Creators as MapCreators } from "../ducks/map";

export function* loadMap(action) {
  let mapa = action.payload.request;

  try {
    yield put(MapCreators.addMapSuccess(mapa));
  } catch (err) {
    yield put(
      MapCreators.addMapFailure("In my mind, in my heart. That is an error")
    );
  }
}
