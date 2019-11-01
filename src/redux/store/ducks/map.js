/**
 * Types, Reducers e Actions no mesmo .js
 */
export const Types = {
  SET_MAP_DELEMITATION: "map/SET_MAP_DELEMITATIO",

  SET_SUB_DELEMITATION: "map/SET_SUB_DELEMITATION",

  ADD_COORDENADAS: "map/ADD_COORDENADAS",

  CAN_ADD_COORD: "map/CAN_ADD_COORD",

  ADD_COORD_CABO: "@map/ADD_COORD_CABO"
};

/**
 * Reducer
 */
let INITIAL_STATE = {
  delimitacao: "default",
  polyline: [],
  subDelimitacao: "default"
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_MAP_DELEMITATION:
      return {
        ...state,
        delimitacao: action.payload.delimitacao
      };
    case Types.SET_SUB_DELEMITATION:
      return {
        ...state,
        subDelimitacao: action.payload.subDelimitacao
      };
    case Types.ADD_COORDENADAS:
      return { ...state, coordenadas: action.payload.coordenadas };
    case Types.CAN_ADD_COORD:
      return { ...state, canAddCoordenadas: action.payload.canAddCoordenadas };

    // correto
    case Types.ADD_COORD_CABO:
      return { ...state, polyline: action.payload.polyline };
    default:
      return state;
  }
}

/**
 * Actions
 *
 */
export const Creators = {
  setSubDelemitation: delemitacao => ({
    type: Types.SET_SUB_DELEMITATION,
    payload: {
      subDelimitacao: delemitacao
    }
  }),
  setDelemitationMap: delimitation => ({
    type: Types.SET_MAP_DELEMITATION,
    payload: {
      delimitacao: delimitation
    }
  }),

  canAddCoordenadas: boolean => ({
    type: Types.CAN_ADD_COORD,
    payload: {
      canAddCoordenadas: boolean
    }
  }),
  addCoordenadas: coord => ({
    type: Types.ADD_COORDENADAS,
    payload: {
      coordenadas: coord
    }
  }),

  addCoordCabo: polyline => ({
    type: Types.ADD_COORD_CABO,
    payload: { polyline }
  })
};
