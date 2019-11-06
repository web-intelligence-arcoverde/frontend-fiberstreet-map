export const Types = {
  SHOW_MODAL_NEW_CABO: "cabo/SHOW_MODAL_NEW_CABO",
  HIDE_MODAL_NEW_CABO: "cabo/HIDE_MODAL_NEW_CABO",

  SHOW_MODAL_NEW_CABO_RESERVA: "cabo/SHOW_MODAL_NEW_CABO_RESERVA",
  HIDE_MODAL_NEW_CABO_RESERVA: "cabo/HIDE_MODAL_NEW_CABO_RESERVA",
  // Creating

  ADD_CLIENTE_ID: "ADD_ID/cliente",

  ADD_NEW_CABLE_TO_CTO_ID: "cable/ADD_NEW_CABLE_TO_CTO_ID",

  CREATE_CABLE_REQUEST: "@cable/CREATE_CABLE_REQUEST",
  CREATE_CABLE_SUCCESS: "@cable/CREATE_CABLE_SUCCESS",

  DELETE_CABLE_REQUEST: "@cable/DELETE_CABLE_REQUEST",
  DELETE_CABLE_SUCCESS: "@cable/DELETE_CABLE_SUCCESS",

  /** adicionar cabo de uma cto para [cto ou ceo] **/

  // ID da cto [Lado que vai receber { FROM=DE }]
  CABLE_CTO_ID_FROM: "cabo/CABLE_CTO_ID_FROM",

  // ID da {ceo ou cto} [ Lado que vai sair { TO=PARA } ]
  CABLE_OTHER_ID_TO: "cabo/CABLE_OTHER_ID_TO",

  /** manipulação da modal **/
  SHOW_MODAL_NEW_CABO_CTO_CEO: "cabo/SHOW_MODAL_NEW_CABO_CTO_CEO",
  HIDE_MODAL_NEW_CABO_CTO_CEO: "cabo/HIDE_MODAL_NEW_CABO_CTO_CEO",

  /** adicionar cabo de uma cto para outra [fim] **/

  ADD_REL_CABLE: "@cable/ADD_REL",

  SET_OBJECT_TO: "cable/SET_OBJECT_TO"
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

  //Obter o cabo da {cto ou ceo} para=from {ceo ou cto}
  idFromTo: {
    visible: false,
    idFrom: null,
    idTo: null
  },
  objectTo: {}
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

    // ID da cto [ Lado que vai sair { FROM=DE } ]
    case Types.CABLE_CTO_ID_FROM:
      return {
        ...state,
        idFromTo: {
          ...state.idFromTo,
          idFrom: action.payload.id
        }
      };
    // ID da {cto ou ceo} [Lado que vai receber { TO=PARA }]
    case Types.CABLE_OTHER_ID_TO:
      return {
        ...state,
        idFromTo: {
          ...state.idFromTo,
          idTo: action.payload.id
        }
      };
    /** Abrir Modal [cto] to [cto] **/
    case Types.SHOW_MODAL_NEW_CABO_CTO_CEO:
      return {
        ...state,
        objectTo: action.payload.type,
        idFromTo: { ...state.idFromTo, visible: true }
      };
    /** Fechar Modal [cto] to [cto] **/
    case Types.HIDE_MODAL_NEW_CABO_CTO_CEO:
      return { ...state, idFromTo: { visible: false } };

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
    type: Types.CABLE_CTO_ID_FROM,
    payload: { id }
  }),

  setObject: name => ({
    type: Types.OBJECT_TO,
    payload: { name }
  }),

  // Id da cto que vai receber o cabo [TO]
  setIdTo: id => ({
    type: Types.CABLE_OTHER_ID_TO,
    payload: { id }
  }),

  /** Abrir Modal [cto] to [cto] **/
  showModalAddCable: type => ({
    type: Types.SHOW_MODAL_NEW_CABO_CTO_CEO,
    payload: { type }
  }),

  /** Fechar Modal [cto] to [cto] **/
  hideModalAddCable: () => ({
    type: Types.HIDE_MODAL_NEW_CABO_CTO_CEO
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

  deleteCableRequest: cable => ({
    type: Types.DELETE_CABLE_REQUEST,
    payload: { cable }
  }),

  deleteCableSuccess: cable => ({
    type: Types.DELETE_CABLE_SUCCESS,
    payload: { cable }
  }),

  //Adicionar cabo aparti do cliente. *addClienteId*
  addCableClientId: id => ({
    type: Types.ADD_CLIENTE_ID,
    payload: { id }
  }),

  saveRel: (typeOne, typeTwo, relationOne, relationTwo, cable) => ({
    type: Types.ADD_REL_CABLE,
    payload: { typeOne, typeTwo, relationOne, relationTwo, cable }
  })
};
