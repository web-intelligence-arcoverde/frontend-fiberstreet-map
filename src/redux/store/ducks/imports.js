export const Types = {
  OPEN_IMPORT_GJ: '@import/OPEN_MODAL',
  CLOSE_IMPORT_GJ: '@import/CLOSE_MODAL',

  IMPORT_GEOJSON_REQUEST: '@import/IMPORT_GJ_REQUEST',
  IMPORT_GEOJSON_SUCCESS: '@import/IMPORT_GJ_SUCCESS',
}

const INITIAL_STATE = {
  modal: {
    visible: false,
  },
  loading: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case Types.OPEN_IMPORT_GJ:
      return {...state, modal: {...state.modal, visible: true}}
    case Types.CLOSE_IMPORT_GJ:
      return {...state, modal: {visible: false}}
    case Types.IMPORT_GEOJSON_REQUEST:
      return {...state, loading: true}
    case Types.IMPORT_GEOJSON_SUCCESS:
      return {...state, loading: false}
    default: return state
  }
}

export const Creators = {
  openImportGeojsonModal: () => ({
    type: Types.OPEN_IMPORT_GJ,
  }),
  closeImportGeojsonModal: () => ({
    type: Types.CLOSE_IMPORT_GJ
  }),

  importGeojsonRequest: (geojson, layerType) => ({
    type: Types.IMPORT_GEOJSON_REQUEST,
    payload: {geojson, layerType}
  }),
  importGeojsonSuccess: () => ({
    type: Types.IMPORT_GEOJSON_SUCCESS
  })
}
