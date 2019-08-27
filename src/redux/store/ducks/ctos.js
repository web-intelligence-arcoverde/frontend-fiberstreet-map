/**
 * Types
 */
export const Types = {
  ADD_REQUEST: "cto/ADD_REQUEST",
  ADD_SUCCESS: "cto/ADD_SUCCESS",
  ADD_FAILURE: "cto/ADD_FAILURE",

  VIEW_REQUEST: "cto/VIEW_REQUEST",
  VIEW_SUCCESS: "cto/VIEW_SUCCESS",
  VIEW_FAILURE: "cto/VIEW_FAILURE",

  ADD_CTO_ID: "cto/ADD_ID"
};

const INITIAL_STATE = {
  ctos: []
};

var initial = {};
/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_SUCCESS:
      return { ...state, ctos: action.payload.data };
    case Types.ADD_FAILURE:
      return state;

    case Types.VIEW_REQUEST:
      return { ...state, ctos: action.payload.data };

    case Types.ADD_CTO_ID:
      return { ...state, ctoId: action.payload.id };

    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addCtoRequest: request => ({
    type: Types.ADD_REQUEST,
    payload: { request }
  }),

  addCtoSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addCtoFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  }),

  addCtoId: id => ({
    type: Types.ADD_CTO_ID,
    payload: { id }
  })
};
