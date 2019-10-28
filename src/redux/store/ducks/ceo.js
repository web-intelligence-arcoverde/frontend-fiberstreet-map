/**
 * Types
 */
export const Types = {
  //Adicionar novo CEO
  SHOW_NEW_MODAL_CEO: "ceo/SHOW_NEW_MODAL",
  HIDE_NEW_MODAL_CEO: "ceo/HIDE_NEW_MODAL",

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
  DELETE_CEO_SUCCESS: "@ceo/DELETE_SUCCESS"
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
  }
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
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
  })
};
