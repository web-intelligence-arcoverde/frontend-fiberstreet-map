import { call, put } from "redux-saga/effects";

import { Creators as FusionActions } from "../ducks/fiberfusion";
import { toastr } from "react-redux-toastr";
import api from "../../../services/api";

export function* createFusion({ payload }) {
  try {
    const response = yield call(api.post, "fiberfusions", payload.fusion);
    toastr.success("Fusão", "Sucesso ao fusionar as fibras");
  } catch (err) {
    toastr.error("Fusão", "Falha ao criar a fusão da fibra");
  }
}

export function* deleteFusion({ payload }) {
  try {
    const response = yield call(api.delete, `fiberfusions/${payload.id}`);
    toastr.success("Fusão", "Fusão apagada com sucesso");
  } catch (err) {
    toastr.error("Fusão", "Falha ao deletar a fusão da fibra");
  }
}

export function* updateFusion({ payload }) {
  try {
    const response = yield call(
      api.put,
      `fiberfusions:${payload.id}`,
      payload.fiberfusion
    );
    toastr.success("Fusão", "Fusão atualizada com sucesso");
  } catch (err) {
    toastr.error("Fusão", "Falha ao atualizar fusão da fibra");
  }
}

export function* showFibersCable({ payload }) {
  try {
    const response = yield call(api.get, `fibers/cable/${payload.cableId}`);
    yield put(FusionActions.showFibersCableSuccess(response.data));
    toastr.success("Fibras", "Sucesso ao carregar fibras do cabo");
  } catch (err) {
    toastr.error("Fusão", "Falha ao obter fibras do cabo");
  }
}

export function* showCablesCeo({ payload }) {
  try {
    const response = yield call(api.get, `cables/ceo/${payload.ceoId}`);
    yield put(FusionActions.showCablesCeoSuccess(response.data));
    toastr.success("Cabos", "Sucesso ao carregar cabos da caixa de emenda");
  } catch (err) {
    toastr.error("Cabos", "Erro ao carregar os cabos da caixa de emenda");
  }
}
