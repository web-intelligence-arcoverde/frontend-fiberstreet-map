/**
 * REDUCER PARA OS FUNCIONARIOS
 */

/**
 * TIPOS
 */
export const Types = {
  SHOWMODALNEWUSER: "user/SHOW_MODAL_NEW_USER",
  HIDEMODALNEWUSER: "user/HIDE_MODAL_NEW_USER"
};
/**
 * VALOR INICIAL DO STATE
 */
const initialState = {
  viewNewUser: {
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
  console.log(action);
  switch (action.type) {
    case Types.SHOWMODALNEWUSER:
      return {
        ...state,
        viewNewUser: {
          visible: true
        }
      };
    case Types.HIDEMODALNEWUSER:
      return {
        ...state,
        viewNewUser: {
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
  showModalNewUser: () => ({
    type: Types.SHOWMODALNEWUSER,
    payload: {
      visible: true
    }
  }),
  hideModalNewUser: () => ({
    type: Types.HIDEMODALNEWUSER,
    payload: {
      visible: false
    }
  })
};
