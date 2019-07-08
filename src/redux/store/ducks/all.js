/**
 * Types
 */

export const Types = {
  addMarker: "ADD_MARKER",
  addCto: "ADD_CTO",
  addDelimitacao: "ADD_DELIMITACAO",
  addCoordenadas: "ADD_COORDENADAS",
  openModalCto: "OPEN_MODAL_CTO",
  canAddCoordenadas: "CAN_ADD_COORD",
  SHOWMODALCTO: "modal/SHOW",
  HIDEMODALCTO: "modal/HIDE",
  delimitacaoMapa: "delimitacaoSelecionada",
  obtainCtoFromServer: "obtainCtoFromServer",
  showDataViewModal: "ADD_DATA_VIEWMODAL",
  hideDataViewModal: "REMOVE_DATA_VIEWMODAL",
  showSpAddModal: "modalAddSp/SHOW",
  hideSpAddModal: "modalAddSp/HIDE",
  showAddClientModal: "modalAddCl/SHOW",
  hideAddClientModal: "modalAddCl/HIDE",
  obtainClientFromServer: "obtainClientFromServer",
  showClientViewModal: "modalClient/SHOW",
  hideClientViewModal: "modalClient/HIDE",
  changeClienteData: "ccdata",
  addCoordCabo: "coordaddcabo",
  showAddCabo: "show/ADDCabo",
  hideAddCabo: "hide/ADDCabo",
  setPolylinesFromServer: "setPolyFServer",
  addMapReference: "map/Reference"
};

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

/**
 * Reducers antigos
 * @param {*} state
 * @param {*} action
 */
export default function(state = INITIAL_STATE, action) {
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

/** Action Creators antigos */
export const Creators = {
  addMarker: marker => ({
    type: Types.addMarker,
    payload: {
      marker
    }
  }),

  addCto: cto => ({
    type: Types.addCto,
    payload: {
      cto
    }
  }),

  addDelimitacao: delimitacao => ({
    type: Types.addDelimitacao,
    payload: {
      delimitacao
    }
  }),

  openModalCto: modal => ({
    type: "OPEN_MODAL_CTO",
    payload: {
      modalCto: modal
    }
  }),

  addCoordenadas: coord => ({
    type: Types.addCoordenadas,
    payload: {
      coordenadas: coord
    }
  }),

  canAddCoordenadas: boolean => ({
    type: Types.canAddCoordenadas,
    payload: {
      canAddCoordenadas: boolean
    }
  }),

  showModalCto: coordinates => ({
    type: Types.showAddCabo,
    payload: { coordinates }
  }),

  hideModalCto: () => ({
    type: Types.hideAddCabo
  }),

  /** Seleciona o tipo de delimitação do mapa
   * @param delimitacao tipo de delimitação, podendo ser
   * cto, ceo, cliente, switch, rb, etc.
   */
  setDelimitacaoMapa: delimitacao => ({
    type: Types.delimitacaoMapa,
    payload: {
      delimitacao
    }
  }),

  setCtoFromServer: cto => ({
    type: Types.obtainCtoFromServer,
    payload: {
      cto
    }
  }),

  setClientFromServer: cliente => ({
    type: Types.obtainClientFromServer,
    payload: {
      cliente
    }
  }),

  showDataInViewModal: data => ({
    type: Types.showDataViewModal,
    payload: {
      data: data
    }
  }),

  hideDataInViewModal: () => ({
    type: Types.hideDataViewModal,
    payload: {}
  }),

  /**
   * Action que ao ser disparada mostra o modal de adição de Splitter
   * @param {*} id Primary Key da Cto que será relacionada com o SPLITTER
   */
  showSplitterAddModal: id => ({
    type: Types.showSpAddModal,
    payload: {
      id
    }
  }),

  hideSplitterAddModal: () => ({
    type: Types.hideSpAddModal
  }),

  /** Show the client modal */
  showAddClienteModal: data => ({
    type: Types.showAddClientModal,
    payload: {
      visible: true,
      coordinates: data
    }
  }),

  /** Hide the client modal */
  hideAddClienteModal: () => ({
    type: Types.hideAddClientModal,
    payload: {
      visible: false
    }
  }),

  showClientViewModal: data => ({
    type: Types.showClientViewModal,
    payload: {
      data: data
    }
  }),

  changeClienteData: data => ({
    type: Types.changeClienteData,
    payload: {
      data
    }
  }),

  hideClientViewModal: () => ({
    type: Types.hideClientViewModal,
    payload: {}
  }),

  /** Adiciona coordenadas para adição de cabo */
  addCoordCabo: polyline => ({
    type: Types.addCoordCabo,
    payload: {
      polyline: polyline
    }
  }),

  showAddCaboModal: () => ({
    type: Types.showAddCabo
  }),

  hideAddCaboModal: () => ({
    type: Types.hideAddCabo
  }),

  /** Setta as polylines/Cabos vindas do servidor no redux */
  setPolylinesFromServer: data => ({
    type: Types.setPolylinesFromServer,
    payload: {
      data: data
    }
  }),

  addMapReference: map => ({
    type: Types.addMapReference,
    payload: {
      map: map
    }
  })
};
