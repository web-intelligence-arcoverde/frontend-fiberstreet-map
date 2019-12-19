export const Types = {
  SET_MAP_DELEMITATION: "map/SET_MAP_DELEMITATION",

  SET_SUB_DELEMITATION: "map/SET_SUB_DELEMITATION",

  ADD_COORDINATES: "map/ADD_COORDINATES",

  CAN_ADD_COORDINATES: "map/CAN_ADD_COORDINATES",

  ADD_COORD_CABLE: "@map/ADD_COORD_CABLE",

  SET_MAP_STYLE: "map/SET_MAP_STYLE",

  SET_MOVE_OBJECT_ON_MAP: "map/SET_MOVE_OBJECT_ON_MAP",

  SET_TYPE_OBJECT: "map/SET_TYPE.OBJECT",

  SHOW_ICONS_DRAWN: "map/SHOW_ICONS_DRAWN",
  HIDE_ICONS_DRAWN: "map/HIDE_ICONS_DRAWN"
};

let INITIAL_STATE = {
  delimitation: "default",
  subDelimitation: "default",
  mapStyle: "streets-v11",
  polyline: [],
  showIconsDrawn: { visible: false },
  moveObjectMap: { type: "", objectId: "" }
};

/*
setType: type => ({
    type: Types.SET_TYPE.OBJECT,
    payload: type
  }),
  setObjetcMove: object => ({
    type: Types.SET_MOVE_OBJECT_ON_MAP,
    payload: { object }
  })
*/

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW_ICONS_DRAWN:
      return {
        ...state,
        showIconsDrawn: { visible: true }
      };
    case Types.HIDE_ICONS_DRAWN:
      return {
        ...state,
        showIconsDrawn: { visible: false }
      };
    case Types.SET_TYPE_OBJECT:
      return {
        ...state,
        moveObjectMap: {
          type: action.payload.type,
          objectId: action.payload.objectId
        }
      };
    case Types.SET_MOVE_OBJECT_ON_MAP:
      return {
        ...state,
        moveObjectMap: {
          ...state.moveObjectMap,
          objectId: action.payload.objectId
        }
      };
    /** Delimitações do mapa **/
    case Types.SET_MAP_DELEMITATION:
      return {
        ...state,
        lastDelimitation: state.delimitation,
        delimitation: action.payload.delimitation
      };
    case Types.SET_MAP_STYLE:
      return {
        ...state,
        mapStyle: action.payload.style
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
  }),
  setType: (type, objectId) => ({
    type: Types.SET_TYPE_OBJECT,
    payload: { type: type, objectId: objectId }
  }),
  setObjetcMove: id => ({
    type: Types.SET_MOVE_OBJECT_ON_MAP,
    payload: id
  }),
  showIcons: () => ({
    type: Types.SHOW_ICONS_DRAWN
  }),
  hideIcons: () => ({
    type: Types.HIDE_ICONS_DRAWN
  })
};
