/**
 * Types
 */
export const Types = {
  SET_COORDINATES_CLICK: "coordinates/SET_COORDINATES_CLICK"
};

const INITIAL_STATE = {
  coordinates: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_COORDINATES_CLICK:
      return {
        ...state,
        coordinates: action.payload.coordinates
      };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  setCoordinatesClick: coordinates => ({
    type: Types.SET_COORDINATES_CLICK,
    payload: { coordinates }
  })
};
