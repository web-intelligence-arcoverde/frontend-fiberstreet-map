import { createClient } from "reactotron-core-client";

export const Types = {
  SHOWNEWMODALCLIENT: "client/SHOW_NEW_MODAL_CLIENT",
  HIDENEWMODALCLIENT: "client/HIDE_NEW_MODAL_CLIENT",
  CREATE_CLIENT_REQUEST: "@cliente/CREATE_REQUEST",
  CREATE_CLIENT_SUCCESS: "@cliente/CREATE_SUCCESS"
};

const INITIAL_STATE = {
  viewNewClient: {
    visible: false,
    coordinates: []
  }
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
  })
};
