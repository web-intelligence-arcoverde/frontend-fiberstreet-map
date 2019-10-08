/**
 * Types, Reducers e Actions no mesmo .js
 */
export const Types = {
  SETMAPDELEMITATION: "map/DELEMITATION_MAP",

  addCoordenadas: "ADD_COORDENADAS",

  canAddCoordenadas: "CAN_ADD_COORD",

  ADD_COORD_CABO: "@map/ADD_COORD_CABO"
};

/**
 * Reducer
 */
let INITIAL_STATE = {
  delimitacao: "default",
  polyline: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SETMAPDELEMITATION:
      return {
        ...state,
        delimitacao: action.payload.delimitacao
      };
    case Types.addCoordenadas:
      return { ...state, coordenadas: action.payload.coordenadas };
    case Types.canAddCoordenadas:
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
  setDelemitationMap: delimitation => ({
    type: Types.SETMAPDELEMITATION,
    payload: {
      delimitacao: delimitation
    }
  }),

  canAddCoordenadas: boolean => ({
    type: Types.canAddCoordenadas,
    payload: {
      canAddCoordenadas: boolean
    }
  }),
  addCoordenadas: coord => ({
    type: Types.addCoordenadas,
    payload: {
      coordenadas: coord
    }
  }),

  addCoordCabo: polyline => ({
    type: Types.ADD_COORD_CABO,
    payload: { polyline }
  })
};
