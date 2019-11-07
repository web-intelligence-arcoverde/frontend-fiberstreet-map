/**
 * Types, Reducers e Actions no mesmo .js
 */
export const Types = {
  CREATE_REQUEST: "@fiberfusion/CREATE_REQUEST",
  CREATE_SUCCESS: "@fiberfusion/CREATE_SUCCESS",

  UPDATE_REQUEST: "@fiberfusion/UPDATE_REQUEST",
  UPDATE_SUCCESS: "@fiberfusion/UPDATE_SUCCESS",

  DELETE_REQUEST: "@fiberfusion/DELETE_REQUEST",
  DELETE_SUCCESS: "@fiberfusion/DELETE_SUCCESS",

  SHOW_FIBERS_CABLE_REQUEST: "@fiberfusion/SHOW_FIBERS_CABLE_REQUEST",
  SHOW_FIBERS_CABLE_SUCCESS: "@fiberfusion/SHOW_FIBERS_CABLE_SUCCESS",
  SHOW_CABLES_CEO_REQUEST: "@fiberfusion/SHOW_CABLES_CEO_REQUEST",
  SHOW_CABLES_CEO_SUCCESS: "@fiberfusion/SHOW_CABLES_CEO_SUCCESS"
};

/**
 * Reducer
 */
let INITIAL_STATE = {
  cables: [],
  fibers: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_SUCCESS:
      return {
        ...state,
        lastCreated: action.payload.fusion
      };

    case Types.SHOW_CABLES_CEO_SUCCESS:
      return {
        ...state,
        cables: action.payload.cables
      };

    default:
      return state;
  }
}

/**
 * Actions
 *
 */
export const Creators = {
  createFiberFusionRequest: fiberfusion => ({
    type: Types.CREATE_REQUEST,
    payload: {
      fiberfusion
    }
  }),

  createFiberFusionSuccess: fiberfusion => ({
    type: Types.CREATE_SUCCESS,
    payload: { fiberfusion }
  }),

  updateFiberFusionRequest: (fiberfusion, id) => ({
    type: Types.UPDATE_REQUEST,
    payload: { fiberfusion }
  }),

  updateFiberFusionSuccess: fiberfusion => ({
    type: Types.UPDATE_SUCESS,
    payload: { fiberfusion }
  }),

  deleteFiberFusionRequest: id => ({
    type: Types.DELETE_REQUEST,
    payload: { id }
  }),

  showFibersCableRequest: cableId => ({
    type: Types.SHOW_FIBERS_CABLE_REQUEST,
    payload: { cableId }
  }),

  showFibersCableSuccess: fibers => ({
    type: Types.SHOW_FIBERS_CABLE_SUCCESS,
    payload: { fibers }
  }),

  showCablesCeoRequest: ceoId => ({
    type: Types.SHOW_CABLES_CEO_REQUEST,
    payload: { ceoId }
  }),

  showCablesCeoSuccess: cables => ({
    type: Types.SHOW_CABLES_CEO_SUCCESS,
    payload: { cables }
  })
};
