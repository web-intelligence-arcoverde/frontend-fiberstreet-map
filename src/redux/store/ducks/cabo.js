export const Types = {
  SHOW_MODAL_NEW_CABO: "cabo/SHOW_MODAL_NEW_CABO",
  HIDE_MODAL_NEW_CABO: "cabo/HIDE_MODAL_NEW_CABO",

  /* ADICIONAR CABO SOLTO */
  SHOW_MODAL_NEW_CABLE: "cabo/SHOW_MODAL_NEW_CABLE",
  HIDE_MODAL_NEW_CABLE: "cabo/HIDE_MODAL_NEW_CABLE",

  SHOW_MODAL_NEW_CABO_RESERVA: "cabo/SHOW_MODAL_NEW_CABO_RESERVA",
  HIDE_MODAL_NEW_CABO_RESERVA: "cabo/HIDE_MODAL_NEW_CABO_RESERVA",

  SHOW_MODAL_VIEW_CABLE: "cable/SHOW_MODAL_VIEW_CABLE",
  HIDE_MODAL_VIEW_CABLE: "cable/HIDE_MODAL_VIEW_CABLE",
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

  LOAD_SUCCESS: "@cable/LOAD_SUCCESS",
  SET_OBJECT_TO: "cable/SET_OBJECT_TO",

  DELETE_CABLE_BY_ID: "@cable/DELETE_CABLE_BY_ID",
  ADD_EXISTENT_CABLE_TO_OBJECT_REQUEST: "@cable/ADD_TO_OBJ_REQUEST",
  SAVE_CABLE: "@cable/SAVE_CABLE",
  UPDATE_CABLE_REQUEST: "@cable/UPDATE_CABLE_REQUEST",
  SET_DRAW_TYPE: "@cable/SET_DRAW_TYPE",
  CREATE_CABLE_WITH_RELATIONSHIP_REQUEST:
    "@cable/CREATE_CABLE_WITH_RELATIONSHIP_REQUEST",
  SET_TYPE_ND_ID: "@cable/SET_TYPE_ND_ID",

  ADD_REL_BET_LAYER_AND_CABLE: '@cable/ADD_REL_B_C_L',
  DELETE_CABLE_REL_REQUEST: '@cable/DELETE_CABLE_REL_REQUEST'
};

const INITIAL = {
  newCabo: {
    isVisible: false,
    ctoId: null,
    data: {}
  },
  newCable: { visible: false },
  newCaboReserva: {
    isVisible: false,
    clientId: null,
    data: {}
  },
  viewCable: {
    visible: false,
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
  objectTo: {},
  geojson: {
    cables: []
  },
  drawType: "NONE",
  relationshipCable: {}
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
    case Types.SHOW_MODAL_NEW_CABLE:
      return {
        ...state,
        newCable: { visible: true }
      };
    case Types.HIDE_MODAL_NEW_CABLE:
      return {
        ...state,
        newCable: { visible: false }
      };
    case Types.SHOW_MODAL_NEW_CABO_RESERVA:
      return {
        ...state,
        newCaboReserva: { isVisible: true, data: action.payload.data }
      };

    case Types.HIDE_MODAL_NEW_CABO_RESERVA:
      return { ...state, newCaboReserva: { isVisible: false } };
    case Types.SHOW_MODAL_VIEW_CABLE:
      return {
        ...state,
        viewCable: { visible: true, data: action.payload.data }
      };
    case Types.HIDE_MODAL_VIEW_CABLE:
      return { ...state, viewCable: { visible: false } };
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

    case Types.LOAD_SUCCESS:
      return {
        ...state,
        geojson: {
          cables: action.payload.cables
        }
      };
    case Types.SAVE_CABLE:
      return {
        ...state,
        cable: action.payload.cable
      };
    case Types.SET_DRAW_TYPE:
      return {
        ...state,
        drawType: action.payload.type
      };
    case Types.SET_TYPE_ND_ID:
      return {
        ...state,
        relationshipCable: {
          type: action.payload.type,
          id: action.payload.id
        }
      };
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
  showViewCable: data => ({
    type: Types.SHOW_MODAL_VIEW_CABLE,
    payload: { data }
  }),
  hideViewCable: () => ({
    type: Types.HIDE_MODAL_VIEW_CABLE
  }),

  createCableRequest: cable => ({
    type: Types.CREATE_CABLE_REQUEST,
    payload: { cable }
  }),

  createCableSuccess: cable => ({
    type: Types.CREATE_CABLE_SUCCESS,
    payload: { cable }
  }),

  deleteCableRequest: id => ({
    type: Types.DELETE_CABLE_REQUEST,
    payload: { id }
  }),

  deleteCableSuccess: cable => ({
    type: Types.DELETE_CABLE_SUCCESS,
    payload: { cable }
  }),

  updateCableRequest: (id, cable) => ({
    type: Types.UPDATE_CABLE_REQUEST,
    payload: { id, cable }
  }),

  loadCableSuccess: cables => ({
    type: Types.LOAD_SUCCESS,
    payload: { cables }
  }),

  //Adicionar cabo aparti do cliente. *addClienteId*
  addCableClientId: id => ({
    type: Types.ADD_CLIENTE_ID,
    payload: { id }
  }),

  saveRel: (typeOne, typeTwo, relationOne, relationTwo, cable) => ({
    type: Types.ADD_REL_CABLE,
    payload: { typeOne, typeTwo, relationOne, relationTwo, cable }
  }),

  deleteCableByIdRequest: cableId => ({
    type: Types.DELETE_CABLE_BY_ID,
    payload: { cableId }
  }),

  showNewCable: () => ({
    type: Types.SHOW_MODAL_NEW_CABLE
  }),
  hideNewCable: () => ({
    type: Types.HIDE_MODAL_NEW_CABLE
  }),

  addExistentCableToObjectRequest: (objectId, objectType, cable) => ({
    type: Types.ADD_EXISTENT_CABLE_TO_OBJECT_REQUEST,
    payload: { objectId, objectType, cable }
  }),

  saveCable: cable => ({
    type: Types.SAVE_CABLE,
    payload: { cable }
  }),

  setDrawType: type => ({
    type: Types.SET_DRAW_TYPE,
    payload: { type }
  }),

  setTypeAndId: (type, id) => ({
    type: Types.SET_TYPE_ND_ID,
    payload: { type, id }
  }),

  createCableWithRelationshipRequest: (cable, objectId, objectType) => ({
    type: Types.CREATE_CABLE_WITH_RELATIONSHIP_REQUEST,
    payload: { cable, objectId, objectType }
  }),

  addRelationshipBetLayerAndCableRequest: (type, objectId, cableId) => ({
    type:Types.ADD_REL_BET_LAYER_AND_CABLE,
    payload: {type, objectId, cableId} 
  }),

  deleteCableRelationshipRequest: (cableId, objectId, objectType) => ({
    type: Types.DELETE_CABLE_REL_REQUEST,
    payload: {cableId, objectId, objectType}
  })
  
};
