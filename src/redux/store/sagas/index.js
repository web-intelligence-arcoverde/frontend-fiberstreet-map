// O Método All lida com vários sagas - tipo combineReducers do redux
import { all, takeLatest } from "redux-saga/effects";

import { AuthTypes } from "../ducks/auth";
import { signIn, signOut, signUp, getPermissions } from "./auth";

import { Types as ClientTypes } from "../ducks/cliente";
import { createClient } from "./cliente";

import { Types as CtoTypes } from "../ducks/ctos";
import { store as storeCto } from "./ctos";

import { Types as CeoTypes } from "../ducks/ceo";
import { store as storeCeo } from "./ceo";

import { Types as ProvidersTypes } from "../ducks/provider";
import { getProviders } from "./provider";

// import { Types as CaboTypes } from '../ducks/cabo'
// import { createCabo } from './cabo'

/**  O * diz que estamos criando uma função generator
 * O generator é a maneira de lidarmos com assincronismo
 * da mesma forma que o async faz, porém o generator é melhor
 * yield -> É como se fosse o await do async/await
 */

export default function* rootSaga() {
  yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),

    // ProvidersTypes
    takeLatest(ProvidersTypes.GET_PROVIDERS_REQUEST, getProviders),

    // Adding data on server
    takeLatest(ClientTypes.CREATE_CLIENT_REQUEST, createClient),
    takeLatest(CtoTypes.CREATE_CTO_REQUEST, storeCto),
    takeLatest(CeoTypes.CREATE_CEO_REQUEST, storeCeo)
    // takeLatest(CaboTypes.CREATE_CABO_REQUEST, createCabo)
    //takeLatest(ClientTypes.CREATE_CLIENT_REQUEST, createClient)
    //takeLatest(ClientTypes.CREATE_CLIENT_REQUEST, createClient)
  ]);
}

// takeLatest(Types.ADD_REQUEST, loadCto),
// takeLatest(MapTypes.ADD_REQUEST, loadMap),
// takeLatest(DropTypes.SHOW_DROP_MODAL_REQUEST, loadSplitters),
// takeLatest(DropTypes.ADD_DROP_REQUEST, addDrop)
// import { loadCto } from "./ctos";
// import { Types } from "../ducks/ctos";
// import { loadMap } from "./map";
// import { Types as MapTypes } from "../ducks/map";
// import { loadSplitters, addDrop } from "./drop";
// import { Types as DropTypes } from "../ducks/drop";
