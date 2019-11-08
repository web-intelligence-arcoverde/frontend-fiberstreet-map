export const Types = {
  NEW_INVITE_REQUEST: "@invite/NEW_INVITE_REQUEST"
};

const INITIAL = {
  invitationEmail: ""
};

export default function(state = INITIAL, action) {
  switch (action.type) {
    case Types.NEW_INVITE_REQUEST:
      return { ...state, invitationEmail: action.payload.email };

    default:
      return state;
  }
}

/**
 *
 * Creators
 *
 */
export const Creators = {
  sendInviteRequest: email => ({
    type: Types.NEW_INVITE_REQUEST,
    payload: { email }
  })
};
