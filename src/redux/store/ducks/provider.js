/**
 * TIPOS
 */
export const Types = {
  SHOW_MODAL_NEW_PROVIDER: "provider/SHOW_MODAL_NEW_PROVIDER",
  HIDE_MODAL_NEW_PROVIDER: "provider/HIDE_MODAL_NEW_PROVIDER",

  GET_PROVIDERS_REQUEST: "@provider/GET_PROVIDERS_REQ",
  GET_PROVIDERS_SUCCESS: "@provider/GET_PROVIDERS_SUC",

  SELECT_PROVIDER: "@provider/SELECT_PROVIDER"
};
/**
 * VALOR INICIAL DO STATE
 */
const initialState = {
  viewNewProvider: {
    visible: false,
    data: ""
  },
  data: {}, // aqui tem os providers
  active: JSON.parse(localStorage.getItem("@gz-net-fs:provider")) || null,

  user: {},
  admin: {}
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SHOW_MODAL_NEW_PROVIDER:
      return {
        ...state,
        viewNewProvider: {
          visible: true
        }
      };
    case Types.HIDE_MODAL_NEW_PROVIDER:
      return {
        ...state,
        viewNewProvider: {
          visible: false
        }
      };

    case Types.GET_PROVIDERS_SUCCESS:
      return { ...state, providers: action.payload.data };

    case Types.SELECT_PROVIDER:
      localStorage.setItem(
        "@gz-net-fs:provider",
        JSON.stringify(action.payload.provider)
      );
      return { ...state, active: action.payload.provider };
    default:
      return state;
  }
}

/**
 * Ações
 */
export const Creators = {
  showModalNewProvider: () => ({
    type: Types.SHOW_MODAL_NEW_PROVIDER
  }),
  hideModalNewProvider: () => ({
    type: Types.HIDE_MODAL_NEW_PROVIDER
  }),

  getProvidersRequest: () => ({
    type: Types.GET_PROVIDERS_REQUEST
  }),

  getProvidersSuccess: data => ({
    type: Types.GET_PROVIDERS_SUCCESS,
    payload: { data }
  }),

  selectProvider: provider => ({
    type: Types.SELECT_PROVIDER,
    payload: { provider }
  })
};
