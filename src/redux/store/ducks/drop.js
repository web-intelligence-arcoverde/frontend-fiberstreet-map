export const Types = {
  ADD_DROP_REQUEST: "ADD_REQUEST/drop",
  ADD_DROP_SUCCESS: "ADD_SUCCESS/drop",
  ADD_DROP_FAILURE: "ADD_FAILED/drop",

  SHOW_DROP_MODAL: "SHOW_MODAL/drop",
  HIDE_DROP_MODAL: "HIDE_MODAL/drop"
};

const INITIAL_STATE = {
  isVisible: false,
  request: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_DROP_MODAL:
      return { ...state, isVisible: true, data: action.payload.data };
    case Types.HIDE_DROP_MODAL:
      return { ...state, isVisible: false };
    case Types.ADD_DROP_REQUEST:
      return { ...state, request: true };
    default:
      return state;
  }
}

export const Creators = {
  addDropRequest: drop => ({
    type: Types.ADD_DROP_REQUEST,
    payload: { drop }
  }),

  showDropAddModal: data => ({
    type: Types.SHOW_DROP_MODAL,
    payload: { data }
  }),

  hideDropAddModal: () => ({
    type: Types.HIDE_DROP_MODAL
  })
};
