import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { Creators as ClientCreators } from "../ducks/cliente";
import { actions as toastrActions, toastr } from "react-redux-toastr";

export function* createClient({ payload }) {
  try {
    const cliente = yield call([api, "post"], "/clients", payload.client);
    // yield put(ClientCreators.createClientSuccess(cliente));
    toastrActions.add({
      type: "error",
      title: "Deu certo",
      message: "Sucesso ao criar cliente, eu acho"
    });
  } catch (err) {
    toastrActions.add({
      type: "error",
      title: "Erro",
      message: "Falha ao criar cliente"
    });
  }
}

export function* loadClient(action) {
  try {
    const response = yield call([api, "get"], "clients");
    yield put(ClientCreators.loadClientSuccess(response.data));
  } catch (err) {
    toastrActions.add({
      type: "error",
      title: "Erro",
      message: "Falha ao carregar clientes"
    });
  }
}

export function* updateClient({ payload }) {
  try {
    const response = yield call(
      [api, "put"],
      `clients/${payload.id}`,
      payload.cliente
    );
    yield put(ClientCreators.updateClientSuccess(response.data));
  } catch (err) {
    toastrActions.add({
      type: "error",
      title: "Erro",
      message: "Falha ao atualizar cliente"
    });
  }
}

export function* deleteClient({ payload }) {
  try {
    const response = yield call([api, "delete"], `clients/${payload.id}`);
    yield put(ClientCreators.deleteClientSuccess(response.data));
    yield put(toastr.success("Delete", "Sucesso ao apagar cliente"));
  } catch (err) {
    toastrActions.add({
      type: "error",
      title: "Erro",
      message: "Falha ao deletar cliente"
    });
  }
}
