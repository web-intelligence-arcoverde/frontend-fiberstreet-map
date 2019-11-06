import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { actions as ToastrActions, toastr } from "react-redux-toastr";

export function* createCable({ payload }) {
  //alert(JSON.stringify(payload)) //-- Teste por favor antes de enviar a requisição para o servidor
  try {
    yield call([api, "post"], "cables", payload);
  } catch (err) {
    ToastrActions.add({
      type: "error",
      title: "Erro ao criar cabo",
      message: "Por favor, tente novamente"
    });
  }
}

export function* index(action) {
  try {
    const cables = yield call([api, "get"], "cables");
  } catch (err) {
    ToastrActions.add({
      type: "error",
      title: "Erro ao obter cabos",
      message: "Por favor, tente novamente"
    });
  }
}

export function* addRelCable({ payload }) {
  const { typeOne, typeTwo, relOne, relTwo } = payload;

  try {
    const response = yield call(api.post, "/cables/relationship", payload);

    // typeOne, typeTwo, relOne, relTwo;
    // Verificar que tipo de relaçcao esta sendo criada e criar
  } catch (err) {}
}

export function* deleteCable({ payload }) {
  try {
    yield call([api, "delete"], `cables/${payload.id}`);

    yield toastr.success("Delete", "Sucesso ao apagar o cabo");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao exluir o cabo");
  }
}
