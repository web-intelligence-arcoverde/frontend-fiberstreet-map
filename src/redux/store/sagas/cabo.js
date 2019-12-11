import { call, put } from "redux-saga/effects";

import { Creators as MapActions } from "../ducks/cabo";
import store from "../../store";

import api from "../../../services/api";

import { actions as ToastrActions, toastr } from "react-redux-toastr";

export function* createCable({ payload }) {
  //alert(JSON.stringify(payload)) //-- Teste por favor antes de enviar a requisição para o servidor

  try {
    // yield call([api, "post"], "cables", payload);
    const newPolyline = [];
    store.dispatch(MapActions.addCoordCabo(newPolyline));
    const response = yield call([api, "post"], "cables", payload.cable);
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
  const { typeOne, typeTwo, relOne, relTwo, cable } = payload;

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

/**
 *
 * @param {*} param0
 */
export function* addExistentCableToObject({ payload }) {
  const { objectId, objectType, cableId } = payload;
  const { polyline } = store.getState().map;
  try {
    const response = yield call(
      [api, "put"],
      `cables/relationship/${cableId}`,
      {
        objectId,
        objectType,
        cableId,
        coordinates: polyline
      }
    );
    const { relation, type } = response.data;
    yield toastr.success(
      "Relacionamento",
      `Cabo adicionado a ${type} ${relation.id} com sucesso`
    );
    const newPolyline = [];
    yield store.dispatch(MapActions.addCoordCabo(newPolyline));
  } catch (error) {
    yield toastr.error("Relacionamento", "Falha ao adicionar o cabo à caixa");
  }
}

export function* updateCable({ payload }) {
  try {
    yield call([api, "update"], `cables/${payload.id}`);
    yield toastr.success("Update", "Sucesso ao apagar o cabo");
  } catch (error) {
    yield toastr.error("Erro na atualização");
  }
}
