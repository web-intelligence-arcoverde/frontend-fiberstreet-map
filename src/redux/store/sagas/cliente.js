import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { Creators as ClientCreators } from "../ducks/cliente";
import { actions as toastrActions } from "react-redux-toastr";

export function* createClient({ payload }) {
  try {
    const cliente = yield call([api, "post"], { payload });
    yield put(ClientCreators.createClientSuccess(cliente));
  } catch (err) {
    toastrActions.add({
      type: "error",
      title: "Erro",
      message: "Falha ao criar cliente"
    });
  }
}
