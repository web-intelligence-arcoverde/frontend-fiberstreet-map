export const Types = {
  SHOW_NEW_MODAL_SPLITTER: "@splitter/MODAL_SHOW",
  HIDE_NEW_MODAL_SPLITTER: "@splitter/MODAL_HIDE",

  SHOW_MODAL_VIEW: "splitter/SHOW_MODAL_VIEW",
  HIDE_MODAL_VIEW: "splitter/HIDE_MODAL_VIEW",

  CREATE_SP_REQUEST: "@splitter/CREATE_REQUEST",
  CREATE_SP_SUCCESS: "@splitter/CREATE_SUCCESS",

  DELETE_SP_REQUEST: "@splitter/DELETE_REQUEST",
  DELETE_SP_SUCCESS: "@splitter/DELETE_SUCCESS",

  UPDATE_SP_REQUEST: "@splitter/UPDATE_REQUEST",
  UPDATE_SP_SUCCESS: "@splitter/UPDATE_SUCCESS"
};

const INITIAL_STATE = {
  modalNewSplitter: {
    visible: false,
    id: null
  },
  show: {
    visible: false,
    data: {}
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
    case Types.SHOW_MODAL_VIEW: {
      return {
        ...state,
        view: {
          visible: true
        }
      };
    }
    case Types.HIDE_VIEW: {
      return {
        ...state,
        view: {
          visible: false
        }
      };
    }

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

  hideSplitterAddModal: () => ({
    type: Types.HIDE_NEW_MODAL_SPLITTER
  }),

  showModal: () => ({
    type: Types.SHOW_MODAL_VIEW
  }),

  hideModal: () => ({
    type: Types.HIDE_MODAL_VIEW
  }),

  createSplitterRequest: splitter => ({
    type: Types.CREATE_SP_REQUEST,
    payload: { splitter }
  }),

  createSplitterSuccess: splitter => ({
    type: Types.CREATE_SP_SUCCESS,
    payload: { splitter }
  }),

  updateSplitterRequest: splitter => ({
    type: Types.UPDATE_SP_REQUEST,
    payload: { splitter }
  }),

  updateSplitterSuccess: splitter => ({
    type: Types.UPDATE_SP_SUCCESS,
    payload: { splitter }
  })
};
