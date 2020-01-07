export const Types = {
  ADD_DROP_REQUEST: 'ADD_REQUEST/drop',
  ADD_DROP_SUCCESS: 'ADD_SUCCESS/drop',
  ADD_DROP_FAILURE: 'ADD_FAILED/drop',

  SHOW_DROP_MODAL_REQUEST: 'SHOW_MODAL_REQUEST/drop',
  SHOW_DROP_MODAL: 'SHOW_MODAL/drop',
  HIDE_DROP_MODAL: 'HIDE_MODAL/drop',

  ADD_SAIDAS_SPLITTER: 'ADD_SAIDAS_SPLITTER/drop',

  ADD_DROP_CLIENT_ID: '@drop/ADD_CLIENT_ID',
};

const INITIAL_STATE = {
  isVisible: false,
  request: false,
  data: {
    splitters: [],
  },
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_DROP_MODAL_REQUEST:
      return { ...state, carregando: true };
    case Types.SHOW_DROP_MODAL:
      return {
        ...state,
        isVisible: true,
        data: action.payload.data,
        carregando: false,
      };
    case Types.HIDE_DROP_MODAL:
      return { ...state, isVisible: false, carregando: false };
    case Types.ADD_DROP_REQUEST:
      return { ...state, request: true };
    case Types.ADD_SAIDAS_SPLITTER:
      return { ...state, saidas: action.payload.saidas };
    case Types.ADD_DROP_CLIENT_ID:
      return {
        ...state,
        client_id: action.payload.clientId,
        // data: { ...state.data, client_id:  }
      };
    default:
      return state;
  }
}

export const Creators = {
  addDropClientId: clientId => ({
    type: Types.ADD_DROP_CLIENT_ID,
    payload: { clientId },
  }),

  addDropRequest: data => ({
    type: Types.ADD_DROP_REQUEST,
    payload: { data },
  }),

  showDropAddModalRequest: data => ({
    type: Types.SHOW_DROP_MODAL_REQUEST,
    payload: { data },
  }),

  showDropAddModal: data => ({
    type: Types.SHOW_DROP_MODAL,
    payload: { data },
  }),

  hideDropAddModal: () => ({
    type: Types.HIDE_DROP_MODAL,
  }),

  addSaidasSplitter: saidas => ({
    type: Types.ADD_SAIDAS_SPLITTER,
    payload: { saidas },
  }),

  // removeSaidasSplitter°
};
