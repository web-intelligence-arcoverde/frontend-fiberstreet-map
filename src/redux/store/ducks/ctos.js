/**
 * Types
 */
export const Types = {
  ADD_REQUEST: "cto/ADD_REQUEST",
  ADD_SUCCESS: "cto/ADD_SUCCESS",
  ADD_FAILURE: "cto/ADD_FAILURE"
};

const INITIAL_STATE = {};

var initial = {};
/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return state;
    case Types.ADD_SUCCESS:
      return { ...state, ctos: action.payload.data };
    case Types.ADD_FAILURE:
      return state;
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
  })
};
