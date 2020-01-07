// O Método All lida com vários sagas - tipo combineReducers do redux
import { all, takeLatest, fork } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import {
  signIn,
  signOut,
  signUp,
  signUpWithProvider,
  getPermissions,
} from './auth';

import { Types as ClientTypes } from '../ducks/cliente';
import {
  createClient,
  loadClient,
  deleteClient,
  updateClient,
} from './cliente';

import { Types as CtoTypes } from '../ducks/ctos';
import { createCto, loadSplitterAndClient, updateCto, deleteCto } from './ctos';

import { Types as CeoTypes } from '../ducks/ceo';
import {
  createCeo,
  updateCeo,
  deleteCeo,
  createSpreadsheet,
  deleteSpreadsheet,
} from './ceo';

import { Types as ProvidersTypes } from '../ducks/provider';
import { getProviders, init } from './provider';

import { Types as DropTypes } from '../ducks/drop';
import { loadSplitters, addDrop, addClientInCto } from './drop';

import { Types as SplitterTypes } from '../ducks/splitter';
import { createSplitter, updateSplitter, deleteSplitter } from './splitter';

import { Types as CableTypes } from '../ducks/cabo';
import {
  addRelCable,
  deleteCable,
  addExistentCableToObject,
  updateCable,
  createCableWithRelationship,
  addRelBetweenCableAndLayer,
  deleteCableRelationship,
} from './cabo';

import { Types as UserTypes } from '../ducks/user';
import { inviteNewUser } from './user';

import { Types as FiberFusionTypes } from '../ducks/fiberfusion';
import {
  createFusion,
  deleteFusion,
  updateFusion,
  showFibersCable,
  showCablesCeo,
} from './fiberfusion';

import { Types as CablesTypes } from '../ducks/cabo';
import { createCable } from './cabo';

import { Types as InviteTypes } from '../ducks/invite';
import { sendInvitationEmail } from './invite';

import { Types as ImportsTypes } from '../ducks/imports';
import { importGeoJSONData } from './imports';

import { getMembers, updateMember } from './members';
import { MembersTypes } from '../ducks/members';

/**  O * diz que estamos criando uma função generator
 * O generator é a maneira de lidarmos com assincronismo
 * da mesma forma que o async faz, porém o generator é melhor
 * yield -> É como se fosse o await do async/await
 */

export default function* rootSaga() {
  yield all([
    init(),
    fork(getPermissions),
    // ProvidersTypes
    takeLatest(ProvidersTypes.GET_PROVIDERS_REQUEST, getProviders),

    //Account
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(AuthTypes.SIGN_UP_WITH_PROVIDER_REQUEST, signUpWithProvider),

    // Clientes
    takeLatest(ClientTypes.CREATE_CLIENT_REQUEST, createClient),
    takeLatest(ClientTypes.UPDATE_CLIENT_REQUEST, updateClient),
    takeLatest(ClientTypes.DELETE_CLIENT_REQUEST, deleteClient),

    //Funcionarios
    takeLatest(UserTypes.INVITE_NEW_USER_PROVIDER_REQUEST, inviteNewUser),

    // Ceo
    takeLatest(CeoTypes.CREATE_CEO_REQUEST, createCeo),
    takeLatest(CeoTypes.UPDATE_CEO_REQUEST, updateCeo),
    takeLatest(CeoTypes.DELETE_CEO_REQUEST, deleteCeo),
    takeLatest(CeoTypes.CREATE_SPREADSHEET_REQUEST, createSpreadsheet),
    takeLatest(CeoTypes.DELETE_SPREADSHEET_REQUEST, deleteSpreadsheet),

    // CTO
    takeLatest(CtoTypes.CREATE_CTO_REQUEST, createCto),
    takeLatest(CtoTypes.UPDATE_CTO_REQUEST, updateCto),
    takeLatest(CtoTypes.DELETE_CTO_REQUEST, deleteCto),

    // Drop
    takeLatest(DropTypes.SHOW_DROP_MODAL_REQUEST, loadSplitters),
    takeLatest(DropTypes.ADD_DROP_REQUEST, addClientInCto),

    // Splitter
    takeLatest(SplitterTypes.UPDATE_SP_REQUEST, updateSplitter),
    takeLatest(SplitterTypes.DELETE_SP_REQUEST, deleteSplitter),
    takeLatest(SplitterTypes.CREATE_SP_REQUEST, createSplitter),

    takeLatest(
      CtoTypes.LOAD_SPLITTER_CLIENT_BY_CTO_REQUEST,
      loadSplitterAndClient
    ),

    takeLatest(ImportsTypes.IMPORT_GEOJSON_REQUEST, importGeoJSONData),

    //Cable
    takeLatest(CablesTypes.CREATE_CABLE_REQUEST, createCable),
    takeLatest(CablesTypes.UPDATE_CABLE_REQUEST, updateCable),
    takeLatest(CablesTypes.DELETE_CABLE_REQUEST, deleteCable),
    takeLatest(
      CablesTypes.ADD_EXISTENT_CABLE_TO_OBJECT_REQUEST,
      addExistentCableToObject
    ),
    takeLatest(
      CableTypes.CREATE_CABLE_WITH_RELATIONSHIP_REQUEST,
      createCableWithRelationship
    ),
    takeLatest(
      CableTypes.ADD_REL_BET_LAYER_AND_CABLE,
      addRelBetweenCableAndLayer
    ),
    takeLatest(CableTypes.DELETE_CABLE_REL_REQUEST, deleteCableRelationship),

    // FiberFusions
    takeLatest(FiberFusionTypes.CREATE_REQUEST, createFusion),
    takeLatest(FiberFusionTypes.DELETE_REQUEST, deleteFusion),
    takeLatest(FiberFusionTypes.UPDATE_REQUEST, updateFusion),
    takeLatest(FiberFusionTypes.SHOW_FIBERS_CABLE_REQUEST, showFibersCable),
    takeLatest(FiberFusionTypes.SHOW_CABLES_CEO_REQUEST, showCablesCeo),

    takeLatest(CableTypes.ADD_REL_CABLE, addRelCable),

    // invites
    takeLatest(InviteTypes.NEW_INVITE_REQUEST, sendInvitationEmail),

    // members
    takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
    takeLatest(MembersTypes.UPDATE_MEMBER_REQUEST, updateMember),
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

// takeLatest(CaboTypes.CREATE_CABO_REQUEST, createCabo)
//takeLatest(ClientTypes.CREATE_CLIENT_REQUEST, createClient)
//takeLatest(ClientTypes.CREATE_CLIENT_REQUEST, createClient)
