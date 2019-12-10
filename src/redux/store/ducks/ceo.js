/**
 * Types
 */
export const Types = {
  //Adicionar novo CEO
  SHOW_NEW_MODAL_CEO: "ceo/SHOW_NEW_MODAL",
  HIDE_NEW_MODAL_CEO: "ceo/HIDE_NEW_MODAL",

  //Fusao
  SHOW_NEW_MODAL_FUSAO: "ceo/SHOW_NEW_MODAL_FUSAO",
  HIDE_NEW_MODAL_FUSAO: "ceo/HIDE_NEW_MODAL_FUSAO",

  //Recuperar
  SHOW_MODAL_CEO: "ceo/SHOW_MODAL_CEO",
  HIDE_MODAL_CEO: "ceo/HIDE_MODAL_CEO",

  LOAD_CEO_GEOJSON_REQUEST: "@ceo/LOAD_GJ_REQUEST",
  LOAD_CEO_GEOJSON_SUCCESS: "@ceo/LOAD_GJ_SUCCESS",

  // Creation { saving data }
  CREATE_CEO_REQUEST: "@ceo/CREATE_REQUEST",
  CREATE_CEO_SUCCESS: "@ceo/CREATE_SUCCESS",

  UPDATE_CEO_REQUEST: "@ceo/UPDATE_REQUEST",
  UPDATE_CEO_SUCCESS: "@ceo/UPDATE_SUCCESS",

  DELETE_CEO_REQUEST: "@ceo/DELETE_REQUEST",
  DELETE_CEO_SUCCESS: "@ceo/DELETE_SUCCESS",

  CREATE_SPREADSHEET_REQUEST: "@ceo/CREATE_SPREADSHEET_REQUEST",
  CREATE_SPREADSHEET_SUCCESS: "@ceo/CREATE_SPREADSHEET_SUCCESS",
  DELETE_SPREADSHEET_REQUEST: "@ceo/DELETE_SPREADSHEET_REQUEST",
  DELETE_SPREADSHEET_SUCCESS: "@ceo/DELETE_SPREADSHEET_SUCCESS"
};

const INITIAL_STATE = {
  viewNewCeo: {
    visible: false,
    coordinates: []
  },
  viewCeo: {
    visible: false,
    data: {}
  },

  ceos: [],
  geojson: {
    ceos: []
  },
  viewNewFusao: {
    visible: false
  },

  spreadsheet: {
    downloadURL: null,
    toUpdate: null,
    updated: null
  }
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_NEW_MODAL_FUSAO:
      return {
        ...state,
        viewNewFusao: {
          visible: true
        }
      };
    case Types.HIDE_NEW_MODAL_FUSAO:
      return {
        ...state,
        viewNewFusao: {
          visible: false
        }
      };
    case Types.SHOW_NEW_MODAL_CEO:
      return {
        ...state,
        viewNewCeo: {
          coordinates: action.payload.coordinates,
          visible: true
        }
      };
    case Types.HIDE_NEW_MODAL_CEO:
      return {
        ...state,
        viewNewCeo: {
          visible: false,
          coordinates: []
        }
      };
    case Types.SHOW_MODAL_CEO:
      return {
        ...state,
        viewCeo: {
          visible: true,
          data: action.payload.data
        }
      };
    case Types.HIDE_MODAL_CEO:
      return {
        ...state,
        viewCeo: {
          visible: false,
          data: {}
        }
      };

    case Types.LOAD_CEO_GEOJSON_SUCCESS:
      return { ...state, geojson: { ceos: action.payload.ceos } };
    case Types.LOAD_CEO_GEOJSON_REQUEST:
      return { ...state, geojson: { ceos: action.payload.ceos } };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  showNewViewModalFusao: () => ({
    type: Types.SHOW_NEW_MODAL_FUSAO,
    payload: {
      visible: true
    }
  }),

  hideNewViewModalFusao: () => ({
    type: Types.HIDE_NEW_MODAL_FUSAO,
    payload: {
      visible: false
    }
  }),
  showNewViewModalCeo: coordinates => ({
    type: Types.SHOW_NEW_MODAL_CEO,
    payload: {
      visible: true,
      coordinates
    }
  }),

  HideNewViewModalCeo: () => ({
    type: Types.HIDE_NEW_MODAL_CEO,
    payload: {
      visible: false,
      coordinates: []
    }
  }),

  showViewModalCeo: ceo => ({
    type: Types.SHOW_MODAL_CEO,
    payload: {
      visible: true,
      data: ceo
    }
  }),

  hideViewModalCeo: () => ({
    type: Types.HIDE_MODAL_CEO,
    payload: {
      visible: false,
      data: []
    }
  }),

  loadCeoGeoJsonRequest: () => ({
    type: Types.LOAD_CEO_GEOJSON_REQUEST
  }),

  loadCeoGeoJsonSuccess: ceos => ({
    type: Types.LOAD_CEO_GEOJSON_SUCCESS,
    payload: { ceos }
  }),

  createCeoRequest: ceo => ({
    type: Types.CREATE_CEO_REQUEST,
    payload: { ceo }
  }),

  createCeoSuccess: ceo => ({
    type: Types.CREATE_CEO_SUCCESS,
    payload: { ceo }
  }),

  deleteCeoRequest: id => ({
    type: Types.DELETE_CEO_REQUEST,
    payload: { id }
  }),

  deleteCeoSuccess: ceo => ({
    type: Types.DELETE_CEO_SUCCESS,
    payload: { ceo }
  }),

  updateCeoRequest: (ceo, id) => ({
    type: Types.UPDATE_CEO_REQUEST,
    payload: { ceo, id }
  }),
  updateCeoSuccess: ceo => ({
    type: Types.UPDATE_CEO_SUCCESS,
    payload: { ceo }
  }),

  createSpreadsheetRequest: formData => ({
    type: Types.CREATE_SPREADSHEET_REQUEST,
    payload: { formData }
  }),

  createSpreadsheetSuccess: spreadsheetUrl => ({
    type: Types.CREATE_SPREADSHEET_SUCCESS,
    payload: { spreadsheetUrl }
  }),

  deleteSpreadsheetRequest: id => ({
    type: Types.DELETE_SPREADSHEET_REQUEST,
    payload: { id }
  })
};
