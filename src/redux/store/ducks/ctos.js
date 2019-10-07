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

  // Creation { saving data }
  CREATE_CTO_REQUEST: "@cto/CREATE_REQUEST",
  CREATE_CTO_SUCCESS: "@cto/CREATE_SUCCESS",

  LOAD_CTO_GEOJSON_REQUEST: "@cto/LOAD_GJ_REQUEST",
  LOAD_CTO_GEOJSON_SUCCESS: "@cto/LOAD_GJ_SUCCESS",

  // Loading
  LOAD_SUCCESS: "@cto/LOAD_SUCCESS"
};

const INITIAL_STATE = {
  //Estado inicial do modal {Mostrar Informações do CTO}
  viewCto: {
    visible: false,
    data: ""
  },
  ctos: [],
  geojson: {
    ctos: []
  },
  viewNewCto: {
    visible: false,
    coordinates: []
  }
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
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
  })
};
