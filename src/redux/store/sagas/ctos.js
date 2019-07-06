import { call, put } from "redux-saga/effects";
import api from "../../../services/api";
import { Creators as CtoActions } from "../ducks/ctos";

export function* loadCto(action) {
  try {
    const { data } = yield call(api.post, `/get/cto`);

    let ctoFeatures = [];
    yield data.map((cto, index) => {
      let latitude = JSON.parse(cto.coordenadas).latitude;
      let longitude = JSON.parse(cto.coordenadas).longitude;
      let data = {
        type: "Feature",
        properties: {
          data: cto
        },
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      };
      ctoFeatures.push(data);
    });
    yield put(CtoActions.addCtoSuccess(ctoFeatures));
  } catch (err) {
    yield put(CtoActions.addCtoFailure("Erro ao carregar ctos"));
  }
}
