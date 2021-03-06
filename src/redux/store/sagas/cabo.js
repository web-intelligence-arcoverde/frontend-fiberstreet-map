import { call, put } from "redux-saga/effects";

import { Creators as MapActions } from "../ducks/cabo";
import store from "../../store";

import api from "../../../services/api";

import { actions as ToastrActions, toastr } from "react-redux-toastr";

export function* createCable({ payload }) {
  //alert(JSON.stringify(payload)) //-- Teste por favor antes de enviar a requisição para o servidor

  try {
    // yield call([api, "post"], "cables", payload);
    const response = yield call([api, "post"], "cables", payload.cable);
    const newPolyline = [];
    yield store.dispatch(MapActions.addCoordCabo(newPolyline));
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
  const {
    objectId,
    objectType,
    cable: { id: cableId, coordinates: oldCoords }
  } = payload;
  const state = store.getState();
  const { polyline } = state.map;

  let newCoords = JSON.parse(oldCoords);
  let coordinates = polyline.map(point => {
    return {
      longitude: point[0],
      latitude: point[1]
    };
  });
  coordinates = newCoords.concat(coordinates);
  coordinates = JSON.stringify(coordinates);

  try {
    const response = yield call(
      [api, "put"],
      `cables/relationship/${cableId}`,
      {
        objectId,
        objectType,
        cableId,
        coordinates: coordinates
      }
    );

    const { relation, type } = response.data;
    yield toastr.success(
      "Relacionamento",
      `Cabo adicionado a ${type} ${relation.id} com sucesso`
    );
    const newPolyline = [];
    yield put(MapActions.addCoordCabo(newPolyline));
  } catch (error) {
    yield toastr.error("Relacionamento", "Falha ao adicionar o cabo à caixa");
  }
}

export function* updateCable({ payload }) {
  try {
    yield call([api, "put"], `cables/${payload.id}`, payload.cable);
    yield toastr.success("Update", "Sucesso ao atualizar o cabo");
  } catch (error) {
    yield toastr.error("Erro na atualização");
  }
}

export function* createCableWithRelationship({ payload }) {
  try {
    /**
     * payload = {
     *  cable,
     *  objectId,
     *  objectType
     * }
     */
    yield call([api, "post"], `cables/relationship`, payload);
    yield toastr.success("Cabo", "Sucesso ao criar o cabo");
  } catch (error) {
    yield toastr.error("Erro ao criar cabo");
  }
}

export function* addRelBetweenCableAndLayer({payload}) {
  const { type: objectType, objectId, cableId } = payload;
  try {
    const response = yield call(
      [api, "put"],
      `cables/relationship/${cableId}`,
      {
        objectId,
        objectType: String(objectType).toUpperCase(),
        cableId,
      }
    );
    const { relation, type } = response.data;
    yield toastr.success(
      "Relacionamento",
      `Cabo adicionado a ${type} ${relation.id} com sucesso`
    );
    
  } catch (err){
    yield toastr.error("Relacionamento", "Falha ao adicionar o cabo à caixa");
  }
}


export function* deleteCableRelationship({payload}){
  const { objectType, objectId, cableId } = payload;
  try {
    yield call([api, 'delete'], `cables/relationship/${cableId}/${objectType}/${objectId}`)
    yield toastr.success(
      "Relacionamento",
      `Relacionamento deletado com sucesso`
    );
  } catch (err) {
    yield toastr.error(
      "Relacionamento",
      `Relacionamento não deletado sucesso`
    );
  }
} 
