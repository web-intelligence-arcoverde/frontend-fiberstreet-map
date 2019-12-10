import { call, put, select } from "redux-saga/effects";
import api, { API } from "../../../services/api";

import { Creators as DropCreators } from "../ducks/drop";
import { toastr } from "react-redux-toastr";

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
    const response = yield call(
      api.get,
      `splittercto/${cto_id}`
      // `${API.GET_SPLITTER_BY_CTO}/${cto_id}`
    );
    //`/get/splitter/cto/${cto_id}`);
    // http://192.168.0.143:3333/splitter/cto/33

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
  const { cabo: drop, saida, client_id, cto_id } = yield action.payload.data;

  const spAndCli = yield {
    splitter_cod: saida.splitter_id,
    cliente_cod_cli: client_id
  };

  // Saida Do Splitter
  const novaSaida = {
    ...saida,

    splitter_id: saida.splitter_id,
    client_id,
    isActive: null,
    selected: null,
    id: null
  };
  const clientId = yield select(state => state.drop.client_id);
  const saidaResponsaFilhoDaputa = {
    number: novaSaida.number,
    client_id: clientId,
    splitter_id: saida.splitter_id
  };

  // Fibra Óptica
  const fibra = {
    name: drop.name
  };

  try {
    // const cabo = yield call(api.post, API.CREATE_CABO, drop);
    const cabo = { ...drop, coordinates: JSON.stringify(drop.coordinates) };
    // 1 - Criando o cabo
    // 1 - Adicionar o cabo
    // 2 - Adicionar a fibra pertencente ao cabo dentro do cabo
    // 3 - Adicionar a saída do splitter que relacionará o cliente com o splitter
    // 4 - Relacionar o cabo com a cto
    // 'cable', 'fiber', 'output'

    const response = yield call(api.post, "drops", {
      cable: cabo,
      output: saidaResponsaFilhoDaputa,
      fiber: fibra
    });

    yield put(DropCreators.hideDropAddModal());
    yield toastr.success("Sucesso", "Sucesso ao adicionar drop");

    // const response = yield call(api.post, "cables", drop);
    // const { data: cabo } = yield response;

    // const fibra = yield {
    //   cable_id: cabo.id,
    //   name: cabo.name
    // };
    // const { data } = yield call(api.post, "fibers", fibra);

    // yield call(api.post, "saidasplitter/cliente/create", novaSaida);
    // yield call(
    //   api.put,
    //   `saidasplitter/cliente/${spAndCli.cliente_cod_cli}/addsp/${spAndCli.splitter_cod}`
    // );
    // // yield put(DropCreators.)
    // yield call(api.post, "drop-fibra/create", fibra);
    // yield put(DropCreators.hideDropAddModal());
  } catch (err) {
    yield toastr.error("Erro", "Erro ao adicionar drop");
  }
}
