import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { toastr } from "react-redux-toastr";

export function* createSplitter({ payload }) {
  try {
    const response = yield call([api, "post"], "splitters", payload.splitter);
    const { data } = response;
    yield toastr.success("Splitter", `Sucesso ao criar Splitter ${data.id}`);
  } catch (err) {
    yield toastr.error("Falha", "Erro ao criar Splitter");
  }
}

export function* updateSplitter({ payload }) {
  try {
    const response = yield call(
      [api, "put"],
      `splitters/${payload.id}`,
      payload.splitter
    );
    const { data } = response;
    yield toastr.success("Splitter", `Sucesso ao criar Splitter ${data.id}`);
  } catch (err) {
    yield toastr.error("Falha", "Erro ao atualizar Splitter");
  }
}

export function* deleteSplitter({ payload }) {
  try {
    const response = yield call([api, "delete"], `splitters/${payload.id}`);
    const { data } = response;
    yield toastr.success("Splitter", `Sucesso ao deletar Splitter`);
  } catch (err) {
    yield toastr.error("Falha", "Erro ao deletar Splitter");
  }
}
