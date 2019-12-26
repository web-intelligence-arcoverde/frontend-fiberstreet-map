import { call, put } from "redux-saga/effects";
import api, { API } from "../../../services/api";

import { Creators as CtoActions } from "../ducks/ctos";
import { toastr } from "react-redux-toastr";

export function* loadCto(action) {
  try {
    const { data } = yield call(api.get, API.GET_CTO_GEOJSON);

    let ctoFeatures = [];
    // eslint-disable-next-line array-callback-return
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
export function* createCto(action) {
  try {
    yield call([api, "post"], "/ctos", action.payload.cto);
  } catch (err) {}
}

export function* loadSplitterAndClient({ payload }) {
  try {
    const { id } = yield payload.cto;
    const response = yield call([api, "get"], `splittercto/${id}`);
    const { data: splitter } = response;

    const responseTwo = yield call(
      [api, "get"],
      `clients/splitter/${splitter[0].id}`
    );
    const { data: clients } = responseTwo;

    yield put(
      CtoActions.loadSplitterAndClientByCtoSuccess(splitter[0], clients)
    );
    // yield toastr.success("Sucesso", "Sucesso a carregar");
  } catch (err) {
    // yield toastr.error("Erro", "Falha ao carregar clientes e splitter da cto");
  }
}

export function* updateCto({ payload }) {
  try {
    const response = yield call(
      [api, "put"],
      `ctos/${payload.id}`,
      payload.cto
    );

    yield toastr.success("Sucesso", "Sucesso ao atualizar a cto");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao atualizar a cto");
  }
}

export function* deleteCto({ payload }) {
  try {
    yield call([api, "delete"], `ctos/${payload.id}`);

    yield toastr.success("Delete", "Sucesso ao apagar a cto");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao exluir a cto");
  }
}
