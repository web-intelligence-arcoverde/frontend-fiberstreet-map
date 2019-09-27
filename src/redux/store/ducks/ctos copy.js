/**
 * Types
 */
export const Types = {
  ADD_REQUEST: "cto/ADD_REQUEST",
  ADD_SUCCESS: "cto/ADD_SUCCESS",
  ADD_FAILURE: "cto/ADD_FAILURE",

  VIEW_REQUEST: "cto/VIEW_REQUEST",
  VIEW_SUCCESS: "cto/VIEW_SUCCESS",
  VIEW_FAILURE: "cto/VIEW_FAILURE",

  //Modal
  SHOWMODALCTO: "cto/MODAL_SHOW",
  HIDEMODALCTO: "cto/MODAL_HIDE",

  ADD_CTO_ID: "cto/ADD_ID",

  //Actions antigas
  openModalCto: "OPEN_MODAL_CTO",
  SWMODALCTO: "modal/SHOW",
  HDMODALCTO: "modal/HIDE",
  addCto: "ADD_CTO",
  obtainCtoFromServer: "obtainCtoFromServer"
};

const INITIAL_STATE = {
  ctos: [],
  createCtos: {
    visible: false
  },
  viewCtos: {
    visible: false
  },
  //Estado inicial antigo
  modalCto: {
    visible: false
  },
  viewCto: {
    visible: false,
    data: {}
  }
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_SUCCESS:
      return { ...state, ctos: action.payload.data };
    case Types.ADD_FAILURE:
      return state;
    case Types.VIEW_REQUEST:
      return { ...state, ctos: action.payload.data };

    case Types.ADD_CTO_ID:
      return { ...state, ctoId: action.payload.id };

    case Types.SHOWMODALCTO:
      return {
        ...state,
        modalCto: {
          visible: true,
          coordinates: action.payload.coordinates
        }
      };
    case Types.HIDEMODALCTO:
      return {
        ...state,
        modalCto: {
          visible: false,
          coordinates: null
        }
      };

    //Actions antigas
    case Types.addCto:
      return { ...state, cto: [...state.cto, action.payload.cto] };
    case Types.openModalCto:
      return { ...state, modalCto: action.payload.modalCto };
    case Types.SWMODALCTO:
      return {
        ...state,
        modalCto: {
          visible: true,
          coordinates: action.payload.coordinates
        }
      };
    case Types.HEMODALCTO:
      return {
        ...state,
        modalCto: {
          visible: false,
          coordinates: null
        }
      };
    case Types.obtainCtoFromServer:
      return {
        ...state,
        mapa: {
          ...state.mapa,
          cto: action.payload.cto
        }
      };

    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addCtoRequest: request => ({
    type: Types.ADD_REQUEST,
    payload: { request }
  }),

  addCtoSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addCtoFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  }),

  addCtoId: id => ({
    type: Types.ADD_CTO_ID,
    payload: { id }
  }),
  showCtoAddModal: coordinates => ({
    type: Types.SHOWMODALCTO,
    payload: { coordinates }
  }),

  hideCtoAddModal: () => ({
    type: Types.HIDEMODALCTO
  }),

  //Antigos
  addCto: cto => ({
    type: Types.addCto,
    payload: {
      cto
    }
  }),
  openModalCto: modal => ({
    type: "OPEN_MODAL_CTO",
    payload: {
      modalCto: modal
    }
  }),
  showModalCto: coordinates => ({
    type: Types.showAddCabo,
    payload: { coordinates }
  }),

  hideModalCto: () => ({
    type: Types.hideAddCabo
  }),
  setCtoFromServer: cto => ({
    type: Types.obtainCtoFromServer,
    payload: {
      cto
    }
  })
};
