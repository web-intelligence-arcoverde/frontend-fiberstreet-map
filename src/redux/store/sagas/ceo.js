import { call, put } from "redux-saga/effects";

import { Creators as CeoCreators } from "../ducks/ceo";
import { actions as ToastrActions, toastr } from "react-redux-toastr";
import api from "../../../services/api";

export function* store(action) {
  try {
    const response = yield call([api, "post"], "ceos", action.payload.ceo);
    yield toastr.success(
      "Sucesso",
      `Ceo ${response.data.id} criada com sucesso`
    );
    yield put(CeoCreators.createCeoSuccess(response.data));
  } catch (err) {
    ToastrActions.add({
      type: "error",
      title: "Falha - CEO",
      message: "Erro ao criar ceo"
    });
  }
}
