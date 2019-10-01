/**
 * TIPOS
 */
export const Types = {
  SHOWMODALNEWPROVIDER: "provider/SHOW_MODAL_NEW_PROVIDER",
  HIDEMODALNEWPROVIDER: "provider/HIDE_MODAL_NEW_PROVIDER"
};
/**
 * VALOR INICIAL DO STATE
 */
const initialState = {
  viewNewProvider: {
    visible: false,
    data: ""
  }
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SHOWMODALNEWPROVIDER:
      return {
        ...state,
        viewNewProvider: {
          visible: true
        }
      };
    case Types.HIDEMODALNEWPROVIDER:
      return {
        ...state,
        viewNewProvider: {
          visible: false
        }
      };
    default:
      return state;
  }
}

/**
 * Ações
 */
export const Creators = {
  showModalNewProvider: () => ({
    type: Types.SHOWMODALNEWPROVIDER,
    payload: {
      visible: true
    }
  }),
  hideModalNewProvider: () => ({
    type: Types.HIDEMODALNEWPROVIDER,
    payload: {
      visible: false
    }
  })
};
