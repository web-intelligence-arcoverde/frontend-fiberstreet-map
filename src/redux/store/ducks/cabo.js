export const Types = {
  SHOW_MODAL_NEW_CABO: "add_new/CABO",
  HIDE_MODAL_NEW_CABO: "hide_new/CABO",

  SHOW_MODAL_NEW_CABO_RESERVA: "add_new_reserva/CABO",
  HIDE_MODAL_NEW_CABO_RESERVA: "hide_new_reserva/CABO"
};

const INITIAL = {
  isVisible: false,
  data: {},
  newCabo: {
    isVisible: false,
    data: {}
  }
};

export default function(state = INITIAL, action) {
  switch (action.type) {
    case Types.SHOW_MODAL_NEW_CABO:
      return { ...state, isVisible: true, data: action.payload.data };
    case Types.HIDE_MODAL_NEW_CABO:
      return { ...state, isVisible: false };
    case Types.SHOW_MODAL_NEW_CABO_RESERVA:
      return {
        ...state,
        newCabo: { isVisible: true, data: action.payload.data }
      };
    case Types.HIDE_MODAL_NEW_CABO_RESERVA:
      return { ...state, newCabo: { isVisible: false } };
    default:
      return state;
  }
}

export const Creators = {
  showAddNewCaboModal: data => ({
    type: Types.SHOW_MODAL_NEW_CABO,
    payload: { data }
  }),

  hideAddNewCaboModal: () => ({
    type: Types.HIDE_MODAL_NEW_CABO
  }),

  showAddNewCaboModalReserva: data => ({
    type: Types.SHOW_MODAL_NEW_CABO_RESERVA,
    payload: { data }
  }),

  hideAddNewCaboModalReserva: () => ({
    type: Types.HIDE_MODAL_NEW_CABO_RESERVA
  })
};
