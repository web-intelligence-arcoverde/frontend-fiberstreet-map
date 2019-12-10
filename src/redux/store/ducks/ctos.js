/**
 * Types
 */
export const Types = {
  //Modal {Recuperando dados}
  SHOW_NEW_MODAL_CTO: "cto/SHOW_NEW_MODAL",
  HIDE_NEW_MODAL_CTO: "cto/HIDE_NEW_MODAL",

  //Modal {Novo}
  SHOW_VIEW_MODAL_CTO: "cto/SHOW_VIEW_MODAL",
  HIDE_VIEW_MODAL_CTO: "cto/HIDE_VIEW_MODAL",

  //Modal {Clients da cto}
  SHOW_VIEW_MODAL_CLIENTS: "cto/SHOW_VIEW_MODAL_CLIENTS",
  HIDE_VIEW_MODAL_CLIENTS: "cto/HIDE_VIEW_MODAL_CLIENTS",

  //Modal Splitter
  SHOW_VIEW_MODAL_SPLITTER: "cto/SHOW_VIEW_MODAL_SPLITTER",
  HIDE_VIEW_MODAL_SPLITTER: "cto/HIDE_VIEW_MODAL_SPLITTER",

  //Modal Cable
  SHOW_VIEW_MODAL_CABLE: "cto/SHOW_VIEW_MODAL_CABLE",
  HIDE_VIEW_MODAL_CABLE: "cto/HIDE_VIEW_MODAL_CABLE",

  SHOW_VIEW_MODAL_OUTPUT_CABLES: "cto/SHOW_VIEW_MODAL_OUTPUT_CABLE",
  HIDE_VIEW_MODAL_OUTPUT_CABLES: "cto/SHOW_VIEW_MODAL_OUTPUT_CABLE",

  SHOW_VIEW_MODAL_PHOTO_CTO: "cto/SHOW_VIEW_MODAL_PHOTO_CTO",
  HIDE_VIEW_MODAL_PHOTO_CTO: "cto/HIDE_VIEW_MODAL_PHOTO_CTO",

  LOAD_CTO_GEOJSON_REQUEST: "@cto/LOAD_GJ_REQUEST",
  LOAD_CTO_GEOJSON_SUCCESS: "@cto/LOAD_GJ_SUCCESS",

  // Creation { saving data }
  CREATE_CTO_REQUEST: "@cto/CREATE_REQUEST",
  CREATE_CTO_SUCCESS: "@cto/CREATE_SUCCESS",

  UPDATE_CTO_REQUEST: "@cto/UPDATE_REQUEST",
  UPDATE_CTO_SUCCESS: "@cto/UPDATE_SUCCESS",

  DELETE_CTO_REQUEST: "@cto/DELETE_REQUEST",
  DELETE_CTO_SUCCESS: "@cto/DELETE_SUCCESS",

  // Loading
  LOAD_SUCCESS: "@cto/LOAD_SUCCESS",

  LOAD_SPLITTER_CLIENT_BY_CTO_REQUEST: "cto/LOAD_SP_CL_CTO_REQUEST",
  LOAD_SPLITTER_CLIENT_BY_CTO_SUCCESS: "cto/LOAD_SP_CL_CTO_SUCCESS",

  MOVE_CTO_ON_MAP: "cto/MOVE_CTO_ON_MAP"
};

//Estado inicial
const INITIAL_STATE = {
  viewCto: {
    visible: false,
    data: "",
    clients: [],
    splitter: {}
  },
  cto: {},
  ctos: [],
  geojson: {
    ctos: []
  },
  viewNewCto: {
    visible: false,
    coordinates: []
  },
  viewClients: {
    visible: false
  },
  viewSplitter: {
    visible: false
  },
  viewCable: {
    visible: false
  },
  viewOutputCables: {
    visible: false
  },
  viewPhoto: {
    visible: false
  }
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_VIEW_MODAL_PHOTO_CTO:
      return {
        ...state,
        viewPhoto: {
          visible: true
        }
      };
    case Types.MOVE_CTO_ON_MAP:
      return {
        ...state,
        cto: action.payload.cto
      };
    case Types.HIDE_VIEW_MODAL_PHOTO_CTO:
      return {
        ...state,
        viewPhoto: {
          visible: false
        }
      };
    case Types.SHOW_VIEW_MODAL_CLIENTS:
      return {
        ...state,
        viewClients: {
          visible: true
        }
      };
    case Types.HIDE_VIEW_MODAL_CLIENTS:
      return {
        ...state,
        viewClients: {
          visible: false
        }
      };
    case Types.SHOW_VIEW_MODAL_OUTPUT_CABLES:
      return {
        ...state,
        viewOutputCables: {
          visible: true
        }
      };
    case Types.HIDE_VIEW_MODAL_OUTPUT_CABLES:
      return {
        ...state,
        viewOutputCables: {
          visible: false
        }
      };
    case Types.SHOW_VIEW_MODAL_SPLITTER:
      return {
        ...state,
        viewSplitter: {
          visible: true
        }
      };
    case Types.HIDE_VIEW_MODAL_SPLITTER:
      return {
        ...state,
        viewSplitter: {
          visible: false
        }
      };
    case Types.SHOW_VIEW_MODAL_CABLE:
      return {
        ...state,
        viewCable: {
          visible: true
        }
      };
    case Types.HIDE_VIEW_MODAL_CABLE:
      return {
        ...state,
        viewCable: {
          visible: false
        }
      };
    case Types.SHOW_VIEW_MODAL_CTO:
      return {
        ...state,
        viewCto: {
          visible: true,
          data: action.payload.data
        }
      };
    case Types.HIDE_VIEW_MODAL_CTO:
      return {
        ...state,
        viewCto: {
          visible: false,
          data: {}
        }
      };
    case Types.LOAD_CTO_GEOJSON_SUCCESS:
      return { ...state, geojson: { ctos: action.payload.ctos } };
    case Types.LOAD_CTO_GEOJSON_REQUEST:
      return { ...state, geojson: { ctos: action.payload.ctos } };
    case Types.SHOW_NEW_MODAL_CTO:
      return {
        ...state,
        viewNewCto: {
          coordinates: action.payload.coordinates,
          visible: true
        }
      };
    case Types.HIDE_NEW_MODAL_CTO:
      return {
        ...state,
        viewNewCto: {
          visible: false,
          coordinates: []
        }
      };

    case Types.LOAD_SUCCESS:
      return {
        ...state,
        ctos: action.payload.ctos
      };

    case Types.LOAD_SPLITTER_CLIENT_BY_CTO_SUCCESS:
      return {
        ...state,
        viewCto: {
          ...state.viewCto,
          splitter: action.payload.splitter,
          clients: action.payload.clients
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
  showModalPhoto: () => ({
    type: Types.SHOW_VIEW_MODAL_PHOTO_CTO,
    payload: {
      visible: true
    }
  }),
  hideModalPhoto: () => ({
    type: Types.HIDE_VIEW_MODAL_PHOTO_CTO,
    payload: {
      visible: false
    }
  }),
  showModalOutputCables: () => ({
    type: Types.SHOW_VIEW_MODAL_OUTPUT_CABLES,
    payload: {
      visible: true
    }
  }),
  hideModalOutputCables: () => ({
    type: Types.HIDE_VIEW_MODAL_OUTPUT_CABLES,
    payload: {
      visible: false
    }
  }),
  showModalClients: () => ({
    type: Types.SHOW_VIEW_MODAL_CLIENTS,
    payload: {
      visible: true
    }
  }),
  hideModalClients: () => ({
    type: Types.HIDE_VIEW_MODAL_CLIENTS,
    payload: {
      visible: false
    }
  }),
  showModalSplitter: () => ({
    type: Types.SHOW_VIEW_MODAL_SPLITTER,
    payload: {
      visible: true
    }
  }),
  hideModalSplitter: () => ({
    type: Types.HIDE_VIEW_MODAL_SPLITTER,
    payload: {
      visible: false
    }
  }),
  showModalCable: () => ({
    type: Types.SHOW_VIEW_MODAL_CABLE,
    payload: {
      visible: true
    }
  }),
  hideModalCable: () => ({
    type: Types.HIDE_VIEW_MODAL_CABLE,
    payload: {
      visible: false
    }
  }),
  showNewViewModalCto: coordinates => ({
    type: Types.SHOW_NEW_MODAL_CTO,
    payload: {
      visible: true,
      coordinates
    }
  }),
  HideNewViewModalCto: () => ({
    type: Types.HIDE_NEW_MODAL_CTO,
    payload: {
      visible: false,
      coordinates: []
    }
  }),

  createCtoRequest: cto => ({
    type: Types.CREATE_CTO_REQUEST,
    payload: { cto }
  }),

  createCtoSuccess: cto => ({
    type: Types.CREATE_CTO_SUCCESS,
    payload: { cto }
  }),

  loadCtoSuccess: ctos => ({
    type: Types.LOAD_SUCCESS,
    payload: { ctos }
  }),

  showViewModalCto: data => ({
    type: Types.SHOW_VIEW_MODAL_CTO,
    payload: {
      visible: true,
      data: data
    }
  }),

  hideViewModalCto: () => ({
    type: Types.HIDE_VIEW_MODAL_CTO,
    payload: { visible: false }
  }),
  loadCtoGeoJsonRequest: () => ({
    type: Types.LOAD_CTO_GEOJSON_REQUEST
  }),

  loadCtoGeoJsonSuccess: ctos => ({
    type: Types.LOAD_CTO_GEOJSON_SUCCESS,
    payload: { ctos }
  }),

  loadSplitterAndClientByCtoRequest: cto => ({
    type: Types.LOAD_SPLITTER_CLIENT_BY_CTO_REQUEST,
    payload: { cto }
  }),

  loadSplitterAndClientByCtoSuccess: (splitter, clients) => ({
    type: Types.LOAD_SPLITTER_CLIENT_BY_CTO_SUCCESS,
    payload: { splitter, clients }
  }),
  deleteCtoRequest: id => ({
    type: Types.DELETE_CTO_REQUEST,
    payload: { id }
  }),

  deleteCtoSuccess: cto => ({
    type: Types.DELETE_CTO_SUCCESS,
    payload: { cto }
  }),

  updateCtoRequest: (cto, id) => ({
    type: Types.UPDATE_CTO_REQUEST,
    payload: { cto, id }
  }),

  updateCtoSuccess: cto => ({
    type: Types.UPDATE_CTO_SUCCESS,
    payload: { cto }
  }),
  setCtoMove: cto => ({
    type: Types.MOVE_CTO_ON_MAP,
    payload: { cto }
  })
};
