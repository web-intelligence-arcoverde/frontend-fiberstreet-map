// O Método All lida com vários sagas - tipo combineReducers do redux
import { all, takeLatest } from "redux-saga/effects";

import { loadCto } from "./ctos";
import { Types } from "../ducks/ctos";
import { loadMap } from './map';
import { Types as MapTypes } from '../ducks/map';

/**  O * diz que estamos criando uma função generator
 * O generator é a maneira de lidarmos com assincronismo
 * da mesma forma que o async faz, porém o generator é melhor
 * yield -> É como se fosse o await do async/await
 */

export default function* rootSaga() {
  yield all([
    takeLatest(Types.ADD_REQUEST, loadCto),
    takeLatest(MapTypes.ADD_REQUEST, loadMap)
  ]);
}
