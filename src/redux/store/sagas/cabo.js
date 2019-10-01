import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { actions as ToastrActions } from "react-redux-toastr";

export function* store({ payload }) {
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