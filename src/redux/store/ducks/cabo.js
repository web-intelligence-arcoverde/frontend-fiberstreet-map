export const Types = {
  SHOW_MODAL_NEW_CABO: "cabo/SHOW_MODAL_NEW_CABO",
  HIDE_MODAL_NEW_CABO: "cabo/HIDE_MODAL_NEW_CABO",

  SHOW_MODAL_NEW_CABO_RESERVA: "cabo/SHOW_MODAL_NEW_CABO_RESERVA",
  HIDE_MODAL_NEW_CABO_RESERVA: "cabo/HIDE_MODAL_NEW_CABO_RESERVA",

  /** adicionar cabo de uma cto para outra [inicio] **/

  // ID da cto [Lado que vai receber { FROM=PARA }]
  CABLE_CTO_FROM_ID: "cabo/CABLE_CTO_FROM_ID",

  // ID da cto [ Lado que vai sair { TO=DE } ]
  CABLE_CTO_TO_ID: "cabo/CABLE_CTO_TO_ID",

  /** manipulação da modal **/
  SHOW_MODAL_NEW_CABO_CTO_TO_OTHER: "cabo/SHOW_MODAL_NEW_CABO_CTO_TO_OTHER",
  HIDE_MODAL_NEW_CABO_CTO_TO_OTHER: "cabo/HIDE_MODAL_NEW_CTO_TO_OTHER",

  /** adicionar cabo de uma cto para outra [fim] **/

  // Creating

  ADD_CLIENTE_ID: "ADD_ID/cliente",

  ADD_NEW_CABLE_TO_CTO_ID: "cable/ADD_NEW_CABLE_TO_CTO_ID",

  CREATE_CABLE_REQUEST: "@cable/CREATE_CABLE_REQUEST",
  CREATE_CABLE_SUCCESS: "@cable/CREATE_CABLE_SUCCESS"
};

const INITIAL = {
  newCabo: {
    isVisible: false,
    ctoId: null,
    data: {}
  },
  newCaboReserva: {
    isVisible: false,
    clientId: null,
    data: {}
  },
  addNewCableToCto: {
    ctoId: null
  },
  showModalCableToCto: {
    visible: false
  },

  //ID's da ctos [Adicionar cabo de uma cto para outra]
  idCtos: {
    visible: false,
    idFrom: null,
    idTo: null
  }
};

export default function(state = INITIAL, action) {
  switch (action.type) {
    case Types.SHOW_MODAL_NEW_CABO:
      return {
        ...state,
        newCabo: { isVisible: true, ctoId: action.payload.id }
      };
    case Types.HIDE_MODAL_NEW_CABO:
      return { ...state, newCabo: { isVisible: false } };
    case Types.SHOW_MODAL_NEW_CABO_RESERVA:
      return {
        ...state,
        newCaboReserva: { isVisible: true, data: action.payload.data }
      };
    case Types.HIDE_MODAL_NEW_CABO_RESERVA:
      return { ...state, newCaboReserva: { isVisible: false } };
    case Types.ADD_CLIENTE_ID:
      return { ...state, newCto: { ...state.newCto, id: action.payload.id } };

    // ID da cto [ Lado que vai sair { TO=DE } ]
    case Types.CABLE_CTO_TO_ID:
      return {
        ...state,
        idCtos: {
          ...state.idCtos,
          idTo: action.payload.id
        }
      };
    // ID da cto [Lado que vai receber { FROM=PARA }]
    case Types.CABLE_CTO_FROM_ID:
      return {
        ...state,
        idCtos: {
          ...state.idCtos,
          idFrom: action.payload.id
        }
      };
    /** Abrir Modal [cto] to [cto] **/
    case Types.SHOW_MODAL_NEW_CABO_CTO_TO_OTHER:
      return {
        ...state,
        idCtos: { ...state.idCtos, visible: true }
      };
    /** Fechar Modal [cto] to [cto] **/
    case Types.HIDE_MODAL_NEW_CABO_CTO_TO_OTHER:
      return { ...state, idCtos: { visible: false } };

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
  //Id da cto que vai sair o cabo [FROM]
  setIdFrom: id => ({
    type: Types.CABLE_CTO_FROM_ID,
    payload: { id }
  }),

  // Id da cto que vai receber o cabo [TO]
  setIdTo: id => ({
    type: Types.CABLE_CTO_TO_ID,
    payload: { id }
  }),

  /** Abrir Modal [cto] to [cto] **/
  showModalCtoToCto: () => ({
    type: Types.SHOW_MODAL_NEW_CABO_CTO_TO_OTHER
  }),

  /** Fechar Modal [cto] to [cto] **/
  hideModalCtoToCto: () => ({
    type: Types.HIDE_MODAL_NEW_CABO_CTO_TO_OTHER
  }),

  addNewCableCtoId: id => ({
    type: Types.ADD_NEW_CABLE_TO_CTO_ID,
    payload: { id }
  }),

  //showAddNewCaboModal
  showAddCableCto: id => ({
    type: Types.SHOW_MODAL_NEW_CABO,
    payload: { id }
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
  }),

  //Adicionar cabo aparti do cliente. *addClienteId*
  addCableClientId: id => ({
    type: Types.ADD_CLIENTE_ID,
    payload: { id }
  })
};
