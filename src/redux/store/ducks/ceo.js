/**
 * Types
 */
export const Types = {
  SHOWNEWMODALCEO: "ceo/SHOW_NEW_MODAL",
  HIDENEWMODALCEO: "ceo/HIDE_NEW_MODAL",

  // Creation { saving data }
  CREATE_CEO_REQUEST: "@ceo/CREATE_REQUEST",
  CREATE_CEO_SUCCESS: "@ceo/CREATE_SUCCESS"
};

const INITIAL_STATE = {
  viewNewCeo: {
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
  })
};
