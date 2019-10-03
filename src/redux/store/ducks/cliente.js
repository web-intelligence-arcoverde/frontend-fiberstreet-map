import { createClient } from "reactotron-core-client";

export const Types = {
  SHOWNEWMODALCLIENT: "client/SHOW_NEW_MODAL_CLIENT",
  HIDENEWMODALCLIENT: "client/HIDE_NEW_MODAL_CLIENT",

  SHOWVIEWCLIENTMODAL: "client/SHOW_VIEW_MODAL_CLIENT",
  HIDEVIEWCLIENTMODAL: "client/SHOW_VIEW_MODAL_CLEINT",

  CREATE_CLIENT_REQUEST: "@cliente/CREATE_REQUEST",
  CREATE_CLIENT_SUCCESS: "@cliente/CREATE_SUCCESS",

  SHOWVIEWCLIENTCOMMENT: "client/SHOW_VIEW_CLIENT_COMMENT",
  HIVEVIEWCLIENTCOMMENT: "client/HIDE_VIEW_CLIENT_COMMENT"
};

const INITIAL_STATE = {
  viewNewClient: {
    visible: false,
    coordinates: []
  },
  viewClient: {
    data: {},
    visible: false
  },
  viewDialogComment: {
    // comment: {},
    visible: false
  }
};

export default function(state = INITIAL_STATE, action) {
  console.log(state);
  switch (action.type) {
    case Types.SHOWNEWMODALCLIENT:
      return {
        ...state,
        viewNewClient: {
          visible: true,
          coordinates: action.payload.coordinates
        }
      };
    case Types.HIDENEWMODALCLIENT:
      return {
        ...state,
        viewNewClient: {
          visible: false,
          coordinates: {}
        }
      };
    case Types.SHOWVIEWCLIENTMODAL:
      return {
        ...state,
        viewClient: {
          visible: true,
          data: action.payload.data
        }
      };
    case Types.HIDEVIEWCLIENTMODAL:
      return {
        ...state,
        viewClient: {
          visible: false
        }
      };
    case Types.SHOWVIEWCLIENTCOMMENT:
      return {
        ...state,
        viewDialogComment: {
          visible: true
          // comment: action.payload.comment
        }
      };
    case Types.HIVEVIEWCLIENTCOMMENT:
      return {
        ...state,
        viewDialogComment: {
          visible: false
        }
      };

    default:
      return state;
  }
}

export const Creators = {
  showNewModalClient: coordinates => ({
    type: Types.SHOWNEWMODALCLIENT,
    payload: {
      visible: true,
      coordinates
    }
  }),

  hideNewModalClient: () => ({
    type: Types.HIDENEWMODALCLIENT,
    payload: {
      visible: false
    }
  }),

  createClientRequest: client => ({
    type: Types.CREATE_CLIENT_REQUEST,
    payload: { client }
  }),

  createClientSuccess: client => ({
    type: Types.CREATE_CLIENT_SUCCESS,
    payload: { client }
  }),

  showClientViewModal: data => ({
    type: Types.SHOWVIEWCLIENTMODAL,
    payload: {
      data
    }
  }),

  hideClientModal: () => ({
    type: Types.HIDEVIEWCLIENTMODAL,
    payload: {
      visible: false
    }
  }),
  //comment como atributo[Ta bugado essa porra vai tomar no cu]
  showClientComment: () => ({
    type: Types.SHOWVIEWCLIENTCOMMENT,
    payload: {
      visible: true
    }
  }),

  hideClientComment: () => ({
    type: Types.HIDEVIEWCLIENTCOMMENT,
    payload: {
      visible: false
    }
  })
};
