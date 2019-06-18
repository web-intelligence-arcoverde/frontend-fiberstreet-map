import { createStore, combineReducers } from "redux";
import * as Types from "./store/type";

const INITIAL_STATE = {
  markers: [],
  coordenadas: {
    latitude: "",
    longitude: ""
  },
  canAddCoordenadas: true,
  modalCto: {
    visible: false
  },
  viewCto: {
    visible: false,
    data: {}
  },
  modalSplitter: {
    visible: false,
    id: 9999999
  },
  mapa: {
    delimitacao: "default",
    cto: []
  }
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.addMarker:
      return { ...state, markers: [...state.markers, action.payload.markers] };
    case Types.addCto:
      return { ...state, cto: [...state.cto, action.payload.cto] };
    case Types.openModalCto:
      return { ...state, modalCto: action.payload.modalCto };
    case Types.addCoordenadas:
      return { ...state, coordenadas: action.payload.coordenadas };
    case Types.canAddCoordenadas:
      return { ...state, canAddCoordenadas: action.payload.canAddCoordenadas };
    case Types.delimitacaoMapa:
      return {
        ...state,
        mapa: { ...state.mapa, delimitacao: action.payload.delimitacao }
      };
    // CTO MODAL
    case Types.SHOWMODALCTO:
      return {
        ...state,
        modalCto: {
          visible: true,
          coordinates: action.payload.coordinates
        }
      };
    case Types.HIDEMODALCTO:
      return {
        ...state,
        modalCto: {
          visible: false,
          coordinates: null
        }
      };
    // CTO SERVER HANDLE DATA TO STORE
    case Types.obtainCtoFromServer:
      return {
        ...state,
        mapa: {
          // ...state.mapa,
          cto: action.payload.cto
        }
      };
    // Data to show in modal
    case Types.showDataViewModal:
      return {
        ...state,
        viewCto: {
          visible: true,
          data: action.payload.data
        }
      };
    case Types.hideDataViewModal:
      return {
        ...state,
        viewCto: {
          visible: false,
          data: ""
        }
      };
    case Types.showSpAddModal:
      return {
        ...state,
        modalSplitter: {
          visible: true,
          id: action.payload.id
        }
      };
    case Types.hideSpAddModal:
      return {
        ...state,
        modalSplitter: {
          visible: false,
          id: null
        }
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
