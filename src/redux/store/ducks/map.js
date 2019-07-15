/**
 * Types, Reducers e Actions no mesmo .js
 */
export const Types = {
  ADD_REQUEST: "map/ADD_REQUEST",
  ADD_SUCCESS: "map/ADD_SUCCESS",
  ADD_FAILURE: "map/ADD_FAILURE"
};

/**
 * Reducer
 */
let INITIAL_STATE = {
  map: {}
};

/**
 * Reducer
 * @param {*} state Estado atual da aplicação
 * @param {*} action Action enviada para o reducer
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        map: action.payload.map,
        loading: false,
        error: null
      };
    case Types.ADD_FAILURE:
      return { ...state, map: {}, error: action.payload.error };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addMapRequest: request => ({
    type: Types.ADD_REQUEST,
    payload: { request }
  }),

  addMapSuccess: map => ({
    type: Types.ADD_SUCCESS,
    payload: { map }
  }),

  addMapFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  })
};
