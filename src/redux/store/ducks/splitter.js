export const Types = {
  SHOW_NEW_MODAL_SPLITTER: "@splitter/MODAL_SHOW",
  HIDE_NEW_MODAL_SPLITTER: "@splitter/MODAL_HIDE",

  SHOW_SP_EDITION_MODAL: "@splitter/SHOW_SP_EDITION_MODAL",
  HIDE_SP_EDITION_MODAL: "@splitter/HIDE_SP_EDITION_MODAL",

  CREATE_SP_REQUEST: "@splitter/CREATE_REQUEST",
  CREATE_SP_SUCCESS: "@splitter/CREATE_SUCCESS",

  DELETE_SP_REQUEST: "@splitter/DELETE_REQUEST",
  DELETE_SP_SUCCESS: "@splitter/DELETE_SUCCESS",

  UPDATE_SP_REQUEST: "@splitter/UPDATE_REQUEST",
  UPDATE_SP_SUCCESS: "@splitter/UPDATE_SUCCESS",

  SHOW_MODAL_SPLITTER: "splitter/SHOW_MODAL_SPLITTER"
};

const INITIAL_STATE = {
  modalNewSplitter: {
    visible: false,
    id: null
  },
  show: {
    visible: false,
    data: {}
  },
  modalEdition: {
    visible: false
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_NEW_MODAL_SPLITTER:
      return {
        ...state,
        modalNewSplitter: {
          visible: true,
          cto_id: action.payload.ctoId
        }
      };
    case Types.HIDE_NEW_MODAL_SPLITTER:
      return {
        ...state,
        modalNewSplitter: {
          visible: false,
          data: {}
        }
      };
    case Types.SHOW_MODAL_SPLITTER:
      return {
        ...state,
        showSplitter: {
          visible: true
        }
      };
    case Types.HIDE_VIEW: {
      return {
        ...state,
        view: {
          visible: false
        }
      };
    }
    case Types.SHOW_SP_EDITION_MODAL:
      return {
        ...state,
        modalEdition: {
          visible: true
        }
      };
    case Types.HIDE_SP_EDITION_MODAL:
      return {
        ...state,
        modalEdition: {
          visible: false
        }
      };

    default:
      return state;
  }
}

export const Creators = {
  showSplitterAddModal: ctoId => ({
    type: Types.SHOW_NEW_MODAL_SPLITTER,
    payload: {
      ctoId
    }
  }),

  showSpEditionModal: spId => ({
    type: Types.SHOW_SP_EDITION_MODAL,
    payload: {
      spId
    }
  }),
  hideSpEditionModal: spId => ({
    type: Types.SHOW_SP_EDITION_MODAL,
    payload: {
      spId
    }
  }),

  hideSplitterAddModal: () => ({
    type: Types.HIDE_NEW_MODAL_SPLITTER
  }),

  showModalSplitter: () => ({
    type: Types.SHOW_MODAL_SPLITTER
  }),

  createSplitterRequest: splitter => ({
    type: Types.CREATE_SP_REQUEST,
    payload: { splitter }
  }),

  createSplitterSuccess: splitter => ({
    type: Types.CREATE_SP_SUCCESS,
    payload: { splitter }
  }),

  updateSplitterRequest: (splitter, id) => ({
    type: Types.UPDATE_SP_REQUEST,
    payload: { splitter, id }
  }),

  updateSplitterSuccess: splitter => ({
    type: Types.UPDATE_SP_SUCCESS,
    payload: { splitter }
  }),

  deleteSplitterRequest: id => ({
    type: Types.DELETE_SP_REQUEST,
    payload: { id }
  }),

  deleteSplitterSuccess: splitter => ({
    type: Types.DELETE_SP_SUCCESS,
    payload: { splitter }
  })
};
