export const Types = {
  SHOW_MODAL_NEW_CABO: "add_new/CABO",
  HIDE_MODAL_NEW_CABO: "hide_new/CABO",

  SHOW_MODAL_NEW_CABO_RESERVA: "add_new_reserva/CABO",
  HIDE_MODAL_NEW_CABO_RESERVA: "hide_new_reserva/CABO",

  // Creating

  ADD_CLIENTE_ID: "ADD_ID/cliente",

  CREATE_CABLE_REQUEST: "@cable/CREATE_CABLE_REQUEST",
  CREATE_CABLE_SUCCESS: "@cable/CREATE_CABLE_SUCCESS"
};

const INITIAL = {
  isVisible: false,
  data: {},
  newCabo: {
    isVisible: false,
    clientId: null,
    data: {}
  },
  cliente_id: null
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
    case Types.ADD_CLIENTE_ID:
      return { ...state, id: action.payload.id };

    default:
      return state;
  }
}

export const Creators = {
  //Adicionar cabo aparti do cliente. *addClienteId*
  addCableClient: id => ({
    type: Types.ADD_CLIENTE_ID,
    payload: { id }
  }),

  //showAddNewCaboModal
  showAddCableCto: data => ({
    type: Types.SHOW_MODAL_NEW_CABO,
    payload: { data }
  }),

  //hideAddNewCaboModal
  hideAddCableCto: () => ({
    type: Types.HIDE_MODAL_NEW_CABO
  }),

  showAddNewCaboModalReserva: data => ({
    type: Types.SHOW_MODAL_NEW_CABO_RESERVA,
    payload: { data }
  }),

  hideAddNewCaboModalReserva: () => ({
    type: Types.HIDE_MODAL_NEW_CABO_RESERVA
  }),

  createCableRequest: cable => ({
    type: Types.CREATE_CABLE_REQUEST,
    payload: { cable }
  }),

  createCableSuccess: cable => ({
    type: Types.CREATE_CABLE_SUCCESS,
    payload: { cable }
  })
};
