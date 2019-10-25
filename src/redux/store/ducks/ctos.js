/**
 * Types
 */
export const Types = {
  //Modal {Recuperando dados}
  SHOWNEWMODALCTO: "cto/SHOW_NEW_MODAL",
  HIDENEWMODALCTO: "cto/HIDE_NEW_MODAL",

  //Modal {Novo}
  SHOWVIEWMODALCTO: "cto/SHOW_VIEW_MODAL",
  HIDEVIEWMODALCTO: "cto/HIDE_VIEW_MODAL",

  //Modal {Clients da cto}
  SHOW_VIEW_MODAL_CLIENTS: "cto/SHOW_VIEW_MODAL_CLIENTS",
  HIDE_VIEW_MODAL_CLIENTS: "cto/HIDE_VIEW_MODAL_CLIENTS",

  //Modal Splitter
  SHOW_VIEW_MODAL_SPLITTER: "cto/SHOW_VIEW_MODAL_SPLITTER",
  HIDE_VIEW_MODAL_SPLITTER: "cto/HIDE_VIEW_MODAL_SPLITTER",

  //Modal Cable
  SHOW_VIEW_MODAL_CABLE: "cto/SHOW_VIEW_MODAL_CABLE",
  HIDE_VIEW_MODAL_CABLE: "cto/HIDE_VIEW_MODAL_CABLE",

  // Creation { saving data }
  CREATE_CTO_REQUEST: "@cto/CREATE_REQUEST",
  CREATE_CTO_SUCCESS: "@cto/CREATE_SUCCESS",

  LOAD_CTO_GEOJSON_REQUEST: "@cto/LOAD_GJ_REQUEST",
  LOAD_CTO_GEOJSON_SUCCESS: "@cto/LOAD_GJ_SUCCESS",

  // Loading
  LOAD_SUCCESS: "@cto/LOAD_SUCCESS",

  LOAD_SPLITTER_CLIENT_BY_CTO_REQUEST: "cto/LOAD_SP_CL_CTO_REQUEST",
  LOAD_SPLITTER_CLIENT_BY_CTO_SUCCESS: "cto/LOAD_SP_CL_CTO_SUCCESS"
};

const INITIAL_STATE = {
  //Estado inicial do modal {Mostrar Informações do CTO}
  viewCto: {
    visible: false,
    data: "",
    clients: [],
    splitter: {}
  },
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
  }
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    case Types.SHOWVIEWMODALCTO:
      return {
        ...state,
        viewCto: {
          visible: true,
          data: action.payload.data
        }
      };
    case Types.HIDEVIEWMODALCTO:
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
    case Types.SHOWNEWMODALCTO:
      return {
        ...state,
        viewNewCto: {
          coordinates: action.payload.coordinates,
          visible: true
        }
      };
    case Types.HIDENEWMODALCTO:
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
    type: Types.SHOWNEWMODALCTO,
    payload: {
      visible: true,
      coordinates
    }
  }),
  HideNewViewModalCto: () => ({
    type: Types.HIDENEWMODALCTO,
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
    type: Types.SHOWVIEWMODALCTO,
    payload: {
      visible: true,
      data: data
    }
  }),

  hideViewModalCto: () => ({
    type: Types.HIDEVIEWMODALCTO,
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
  })
};
