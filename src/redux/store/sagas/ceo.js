import { call, put } from "redux-saga/effects";

import { Creators as CeoCreators } from "../ducks/ceo";
import { actions as ToastrActions, toastr } from "react-redux-toastr";
import api from "../../../services/api";

export function* createCeo(action) {
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

export function* updateCeo({ payload }) {
  try {
    yield call([api, "put"], `ceos/${payload.id}`, payload.ceo);

    yield toastr.success("Sucesso", "Sucesso ao atualizar a ceo");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao atualizar a ceo");
  }
}

export function* createSpreadsheet({ payload }) {
  const { formData } = payload;
  try {
    const response = yield call([api, "post"], "spreadsheets", formData);
    yield put(CeoCreators.createSpreadsheetSuccess(response.data.url));
    yield toastr.error("Success", "Sucesso ao criar a planilha de emenda");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao criar a planilha de emenda");
  }
}

export function* deleteSpreadsheet({ payload }) {
  try {
    const { data } = yield call([api, "delete"], `spreadsheet/${payload.id}`);
    yield toastr.error("Success", "Sucesso ao exluir a planilha de emenda");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao excluir a planilha de emenda");
  }
}

export function* deleteCeo({ payload }) {
  try {
    yield call([api, "delete"], `ceos/${payload.id}`);

    yield toastr.success("Delete", "Sucesso ao apagar a ceo");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao exluir a ceo");
  }
}
