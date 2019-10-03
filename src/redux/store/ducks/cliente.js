import { createClient } from "reactotron-core-client";

export const Types = {
  SHOWNEWMODALCLIENT: "client/SHOW_NEW_MODAL_CLIENT",
  HIDENEWMODALCLIENT: "client/HIDE_NEW_MODAL_CLIENT",

  CREATE_CLIENT_REQUEST: "@cliente/CREATE_REQUEST",
  CREATE_CLIENT_SUCCESS: "@cliente/CREATE_SUCCESS",

  LOAD_CLIENT_REQUEST: "@cliente/LOAD_REQUEST",
  LOAD_CLIENT_SUCCESS: "@cliente/LOAD_SUCCESS",

  UPDATE_CLIENT_REQUEST: "@cliente/UPDATE_REQUEST",
  UPDATE_CLIENT_SUCCESS: "@cliente/UPDATE_SUCCESS",

  DELETE_CLIENT_REQUEST: "@cliente/DELETE_REQUEST",
  DELETE_CLIENT_SUCCESS: "@cliente/DELETE_SUCCESS"
};

const INITIAL_STATE = {
  viewNewClient: {
    visible: false,
    coordinates: []
  },
  clients: []
};

export default function(state = INITIAL_STATE, action) {
  console.log(state);
  switch (action.type) {
    case Types.SHOWNEWMODALCLIENT:
      return {
        ...state,
        viewNewClient: {
          visible: true,
          coordinates: action.payload.coordinates
        }
      };
    case Types.HIDENEWMODALCLIENT:
      return {
        ...state,
        viewNewClient: {
          visible: false,
          coordinates: {}
        }
      };

    // GET
    case Types.LOAD_CLIENT_SUCCESS:
      return { ...state, clients: action.payload.clients };

    // POST - PUT - DELETE
    // Não iremos usar os métodos agora pois já iremos fazer a atualização pelo socket
    case Types.CREATE_CLIENT_SUCCESS:
      return { ...state, clients: [...state.clients, action.payload.client] };
    default:
      return state;
  }
}

export const Creators = {
  showNewModalClient: coordinates => ({
    type: Types.SHOWNEWMODALCLIENT,
    payload: {
      visible: true,
      coordinates
    }
  }),

  hideNewModalClient: () => ({
    type: Types.HIDENEWMODALCLIENT,
    payload: {
      visible: false
    }
  }),

  createClientRequest: client => ({
    type: Types.CREATE_CLIENT_REQUEST,
    payload: { client }
  }),

  createClientSuccess: client => ({
    type: Types.CREATE_CLIENT_SUCCESS,
    payload: { client }
  }),

  loadClientRequest: () => ({
    type: Types.LOAD_CLIENT_REQUEST
  }),

  loadClientSuccess: clients => ({
    type: Types.LOAD_CLIENT_SUCCESS,
    payload: { clients }
  }),

  updateClientRequest: (client, id) => ({
    type: Types.UPDATE_CLIENT_REQUEST,
    payload: { client, id }
  }),

  updateClientSuccess: client => ({
    type: Types.UPDATE_CLIENT_SUCCESS,
    payload: { client }
  }),

  deleteClientRequest: id => ({
    type: Types.DELETE_CLIENT_REQUEST,
    payload: { id }
  }),

  deleteClientSuccess: client => ({
    type: Types.DELETE_CLIENT_SUCCESS,
    payload: { client }
  })
};
