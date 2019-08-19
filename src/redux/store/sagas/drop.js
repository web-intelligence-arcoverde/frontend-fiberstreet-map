import { call, put } from "redux-saga/effects";
import api from "../../../services/api";

import { Creators as DropCreators } from "../ducks/drop";

function* getSaidaSplitterForSplitter(splitterId) {
  const response = yield call(api.get, `/saidasplitter/splitter/${splitterId}`);
  return response.data;
}

export function* loadSplitters(action) {
  const { data: Data } = action.payload;
  const { cto_id, drop } = Data;

  let count = 0;
  let ssp = [];

  try {
    const response = yield call(api.get, `/get/splitter/cto/${cto_id}`);

    if (response.status >= 200 && response.status < 300) {
      console.tron.log(response);
      const { data } = response;
      alert(JSON.stringify(data));
      if (process.env.NODE_ENV === "development") {
        console.tron.log(data);
      }
      yield put(
        DropCreators.showDropAddModal({ splitters: data, cto_id, drop })
      );
    } else {
      throw response;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.tron.log(error);
    }
  }
}

export function* addDrop(action) {
  const { cabo: drop, saida, cliente_id, cto_id } = yield action.payload.data;

  yield console.tron.log({
    drop,
    cto_id,
    cliente_id,
    saida
  });
  const spAndCli = yield {
    splitter_cod: saida.splitter_id,
    cliente_cod_cli: cliente_id
  };

  const novaSaida = {
    ...saida,
    splitter_cod: saida.splitter_id,
    cliente_cod_cli: cliente_id,
    splitter_id: null
  };

  const fibra = {
    // cabo:
  };

  console.tron.log({ SAIDA_AFTER_SEQUELIZE: novaSaida });

  try {
    const cabo = yield call(api.post, "cabo/add", drop);
    const fibra = yield {
      cabo: cabo.id,
      nome: cabo.nome
    };
    // yield call(api.post, 'fibra/add', fibra);
    yield call(api.post, "saidasplitter/cliente/create", novaSaida);
    yield call(
      api.put,
      `saidasplitter/cliente/${spAndCli.cliente_cod_cli}/addsp/${
        spAndCli.splitter_cod
      }`
    );
    // yield put(DropCreators.)
    yield call(api.post, "drop-fibra/create", fibra);
    yield put(DropCreators.hideDropAddModal());
  } catch (err) {}
}
