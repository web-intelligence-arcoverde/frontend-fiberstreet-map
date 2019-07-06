import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import * as Types from "./store/type";
import reducerCto from "./store/ducks/ctos";

import sagas from "./store/sagas";

const middlewares = [];
const sagaMiddlewares = createSagaMiddleware();
middlewares.push(sagaMiddlewares);

const composer =
  process.env.NODE_ENV === "development"
    ? compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer()
      )
    : applyMiddleware(...middlewares);

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
  modalCliente: {
    visible: false,
    coordinates: {}
  },
  modalCabo: {
    visible: false
  },
  mapa: {
    map: {},
    delimitacao: "default",
    cto: [],
    cliente: [],
    cabos: [],
    polyline: []
  },
  viewClient: {
    visible: false,
    data: ""
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
          ...state.mapa,
          cto: action.payload.cto
        }
      };
    // CLIENTE SERVER HANDLE DATA TO STORE
    case Types.obtainClientFromServer:
      return {
        ...state,
        mapa: {
          ...state.mapa,
          cliente: action.payload.cliente
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
    case Types.showAddClientModal:
      return {
        ...state,
        modalCliente: {
          visible: true,
          coordinates: action.payload.coordinates
        }
      };
    case Types.hideAddClientModal:
      return {
        ...state,
        modalCliente: {
          visible: false,
          coordinates: {}
        }
      };
    // View MODAL Client
    case Types.showClientViewModal:
      return {
        ...state,
        viewClient: {
          visible: true,
          data: action.payload.data
        }
      };
    case Types.hideClientViewModal:
      return {
        ...state,
        viewClient: {
          visible: false,
          data: ""
        }
      };
    case Types.changeClienteData:
      return {
        ...state,
        viewClient: {
          ...state.viewClient,
          data: action.payload.data
        }
      };
    case Types.addCoordCabo:
      return {
        ...state,
        mapa: {
          ...state.mapa,
          polyline: action.payload.polyline
        }
      };
    case Types.showAddCabo:
      return {
        ...state,
        modalCabo: {
          visible: true
        }
      };
    case Types.hideAddCabo:
      return {
        ...state,
        modalCabo: {
          visible: false
        }
      };
    // Seta os cabos vindos do servidor
    case Types.setPolylinesFromServer:
      return {
        ...state,
        mapa: {
          ...state.mapa,
          cabos: action.payload.data
        }
      };
    case Types.addMapReference:
      return {
        ...state,
        mapa: {
          ...state.mapa,
          map: action.payload.map
        }
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({reducer, reducerCto});

// const store = createStore(reducer, composer);
const store = createStore(rootReducer, composer);

sagaMiddlewares.run(sagas);

export default store;
