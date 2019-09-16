import { call, put } from "redux-saga/effects";
import api, { API } from "../../../services/api";
import { Creators as CtoActions } from "../ducks/ctos";

export function* loadCto(action) {
  try {
    const { data } = yield call(api.get, API.GET_CTO_GEOJSON);

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

export function* viewCto(action) {
  try {
    yield put(CtoActions.add);
  } catch (err) {
    yield put();
  }
}

/**
 * 1 - Ao adicionar uma cto, dispara um evento para adicionar cto
 * 2 - O evento vai ser ouvido aqui e vamos verificar a quantidade de objetos no mapa
 *    - Caso a quantidade for mais ou diferente da existente no mapa, obtemos novamento
 *        do banco de dados as ctos existentes e alteramos o source existente na UI
 * 3 - A UI ficará observando por mudanças no redux
 * Obs -> Podemos salvar o interval no redux e ativar/desativar ele
 *
 */
export function* addCto(action) {
  try {
    yield put();
  } catch (err) {}
}
