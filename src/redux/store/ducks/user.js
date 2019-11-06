/**
 * REDUCER PARA OS FUNCIONARIOS
 */

/**
 * TIPOS
 */
export const Types = {
  SHOW_MODAL_ADD_USER: "user/SHOW_MODAL_NEW_USER",
  HIDE_MODAL_ADD_USER: "user/HIDE_MODAL_NEW_USER",

  INVITE_NEW_USER_PROVIDER_REQUEST: "user/INVITE_NEW_USER_PROVIDER_REQUEST"
};
/**
 * VALOR INICIAL DO STATE
 */
const initialState = {
  viewNewUser: {
    visible: false,
    email: ""
  }
};

/*
 *
 * Reducer
 *
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SHOW_MODAL_ADD_USER:
      return {
        ...state,
        viewNewUser: {
          visible: true
        }
      };
    case Types.HIDE_MODAL_ADD_USER:
      return {
        ...state,
        viewNewUser: {
          visible: false
        }
      };
    case Types.SET_EMAIL_NEW_USER:
      return {
        ...state,
        viewNewUser: {
          email: action.payload.email
        }
      };
    default:
      return state;
  }
}

export const Creators = {
  showModalNewUser: () => ({
    type: Types.SHOW_MODAL_ADD_USER
  }),
  hideModalNewUser: () => ({
    type: Types.HIDE_MODAL_ADD_USER
  }),
  inviteNewUserProvider: email => ({
    type: Types.INVITE_NEW_USER_PROVIDER_REQUEST,
    payload: {
      email
    }
  })
};
