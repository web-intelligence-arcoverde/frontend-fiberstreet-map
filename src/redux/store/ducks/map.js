export const Types = {
  SET_MAP_DELEMITATION: "map/SET_MAP_DELEMITATION",

  SET_SUB_DELEMITATION: "map/SET_SUB_DELEMITATION",

  ADD_COORDINATES: "map/ADD_COORDINATES",

  CAN_ADD_COORDINATES: "map/CAN_ADD_COORDINATES",

  ADD_COORD_CABLE: "@map/ADD_COORD_CABLE"
};

let INITIAL_STATE = {
  delimitation: "default",
  subDelimitation: "default",
  polyline: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    /** Delimitações do mapa **/
    case Types.SET_MAP_DELEMITATION:
      return {
        ...state,
        delimitation: action.payload.delimitation
      };
    case Types.SET_SUB_DELEMITATION:
      return {
        ...state,
        subDelimitation: action.payload.subDelimitation
      };
    /** Delimitações do mapa **/

    case Types.ADD_COORDINATES:
      return { ...state, coordenadas: action.payload.coordenadas };

    case Types.CAN_ADD_COORDINATES:
      return { ...state, canAddCoordenadas: action.payload.canAddCoordenadas };

    // correto
    case Types.ADD_COORD_CABLE:
      return { ...state, polyline: action.payload.polyline };
    default:
      return state;
  }
}

/** Metodos **/
export const Creators = {
  /** Delimitação{metodos para mudar o nome da delitação}**/
  setDelimitation: delimitation => ({
    type: Types.SET_MAP_DELEMITATION,
    payload: {
      delimitation: delimitation
    }
  }),

  setSubDelemitation: delimitation => ({
    type: Types.SET_SUB_DELEMITATION,
    payload: {
      subDelimitation: delimitation
    }
  }),

  canAddCoordenadas: boolean => ({
    type: Types.CAN_ADD_COORDINATES,
    payload: {
      canAddCoordenadas: boolean
    }
  }),
  addCoordenadas: coord => ({
    type: Types.ADD_COORDINATES,
    payload: {
      coordenadas: coord
    }
  }),

  addCoordCabo: polyline => ({
    type: Types.ADD_COORD_CABLE,
    payload: { polyline }
  })
};
