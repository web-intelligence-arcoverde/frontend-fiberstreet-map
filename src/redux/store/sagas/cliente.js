import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { Creators as ClientCreators } from "../ducks/cliente";
import { actions as toastrActions, toastr } from "react-redux-toastr";

export function* createClient({ payload }) {
  try {
    yield call([api, "post"], "/clients", payload.client);
    // yield put(ClientCreators.createClientSuccess(cliente));
    yield toastr.success(
      "Sucesso",
      `Cliente ${payload.client.name} adicionado com sucesso!`
    );
  } catch (err) {
    yield toastr.error(
      "Erro",
      `Cliente ${payload.client.name} não foi adicionado!`
    );
  }
}

export function* loadClient(action) {
  try {
    const response = yield call([api, "get"], "clients");
    yield put(ClientCreators.loadClientSuccess(response.data));
  } catch (err) {
    yield toastr.error("Falha", "Falha ao carregar clientes");
  }
}

export function* updateClient({ payload }) {
  try {
    const response = yield call(
      [api, "put"],
      `clients/${payload.id}`,
      payload.client
    );
    yield put(ClientCreators.updateClientSuccess(response.data));
    yield toastr.success("Sucesso", "Sucesso ao atualizar cliente");
  } catch (err) {
    yield toastr.error("Erro", "Falha ao atualizar cliente");
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
