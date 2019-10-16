/**
 * Types
 */
export const Types = {
  SHOWNEWMODALCEO: "ceo/SHOW_NEW_MODAL",
  HIDENEWMODALCEO: "ceo/HIDE_NEW_MODAL",

  // Creation { saving data }
  CREATE_CEO_REQUEST: "@ceo/CREATE_REQUEST",
  CREATE_CEO_SUCCESS: "@ceo/CREATE_SUCCESS",

  LOAD_CEO_GEOJSON_REQUEST: "@ceo/LOAD_GJ_REQUEST",
  LOAD_CEO_GEOJSON_SUCCESS: "@ceo/LOAD_GJ_SUCCESS"
};

const INITIAL_STATE = {
  viewNewCeo: {
    visible: false,
    coordinates: []
  },

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
    case Types.SHOWNEWMODALCEO:
      return {
        ...state,
        viewNewCeo: {
          coordinates: action.payload.coordinates,
          visible: true
        }
      };
    case Types.HIDENEWMODALCEO:
      return {
        ...state,
        viewNewCeo: {
          visible: false,
          coordinates: []
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
    type: Types.SHOWNEWMODALCEO,
    payload: {
      visible: true,
      coordinates
    }
  }),

  HideNewViewModalCeo: () => ({
    type: Types.HIDENEWMODALCEO,
    payload: {
      visible: false,
      coordinates: []
    }
  }),

  createCeoRequest: ceo => ({
    type: Types.CREATE_CEO_REQUEST,
    payload: { ceo }
  }),

  createCeoSuccess: ceo => ({
    type: Types.CREATE_CEO_SUCCESS,
    payload: { ceo }
  }),

  loadCeoGeoJsonRequest: () => ({
    type: Types.LOAD_CEO_GEOJSON_REQUEST
  }),

  loadCeoGeoJsonSuccess: ceos => ({
    type: Types.LOAD_CEO_GEOJSON_SUCCESS,
    payload: { ceos }
  })
};
