/**
 * Types, Reducers e Actions no mesmo .js
 */
export const Types = {
  SETMAPDELEMITATION: "map/DELEMITATION_MAP",

  addCoordenadas: "ADD_COORDENADAS",

  canAddCoordenadas: "CAN_ADD_COORD"
};

/**
 * Reducer
 */
let INITIAL_STATE = {
  delimitacao: "default"
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
  })
};
