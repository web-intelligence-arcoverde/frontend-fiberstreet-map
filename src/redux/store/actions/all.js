import {
  addMarker as mk,
  addCto as ct,
  addDelimitacao as dl,
  addCoordenadas as ac,
  canAddCoordenadas as cac,
  SHOWMODALCTO as SHOW,
  HIDEMODALCTO as HIDE,
  delimitacaoMapa,
  obtainCtoFromServer,
  showDataViewModal,
  hideDataViewModal,
  showSpAddModal,
  hideSpAddModal
} from "../type";
import * as Types from "../type";

export const addMarker = marker => ({
  type: mk,
  payload: {
    marker
  }
});

export const addCto = cto => ({
  type: ct,
  payload: {
    cto
  }
});

export const addDelimitacao = delimitacao => ({
  type: dl,
  payload: {
    delimitacao
  }
});

export const openModalCto = modal => ({
  type: "OPEN_MODAL_CTO",
  payload: {
    modalCto: modal
  }
});

export const addCoordenadas = coord => ({
  type: ac,
  payload: {
    coordenadas: coord
  }
});

export const canAddCoordenadas = boolean => ({
  type: cac,
  payload: {
    canAddCoordenadas: boolean
  }
});

export const showModalCto = coordinates => ({
  type: SHOW,
  payload: { coordinates }
});

export const hideModalCto = () => ({
  type: HIDE
});

/** Seleciona o tipo de delimitação do mapa
 * @param delimitacao tipo de delimitação, podendo ser
 * cto, ceo, cliente, switch, rb, etc.
 */
export const setDelimitacaoMapa = delimitacao => ({
  type: delimitacaoMapa,
  payload: {
    delimitacao
  }
});

export const setCtoFromServer = cto => ({
  type: obtainCtoFromServer,
  payload: {
    cto
  }
});

export const setClientFromServer = cliente => ({
  type: Types.obtainClientFromServer,
  payload: {
    cliente
  }
});

export const showDataInViewModal = data => ({
  type: showDataViewModal,
  payload: {
    data: data
  }
});

export const hideDataInViewModal = () => ({
  type: hideDataViewModal,
  payload: {}
});

/**
 * Action que ao ser disparada mostra o modal de adição de Splitter
 * @param {*} id Primary Key da Cto que será relacionada com o SPLITTER
 */
export const showSplitterAddModal = id => ({
  type: showSpAddModal,
  payload: {
    id
  }
});

export const hideSplitterAddModal = () => ({
  type: hideSpAddModal
});

/** Show the client modal */
export const showAddClienteModal = data => ({
  type: Types.showAddClientModal,
  payload: {
    visible: true,
    coordinates: data
  }
});

/** Hide the client modal */
export const hideAddClienteModal = () => ({
  type: Types.hideAddClientModal,
  payload: {
    visible: false
  }
});

export const showClientViewModal = data => ({
  type: Types.showClientViewModal,
  payload: {
    data: data
  }
});

export const changeClienteData = data => ({
  type: Types.changeClienteData,
  payload: {
    data
  }
});

export const hideClientViewModal = () => ({
  type: Types.hideClientViewModal,
  payload: {}
});

/** Adiciona coordenadas para adição de cabo */
export const addCoordCabo = polyline => ({
  type: Types.addCoordCabo,
  payload: {
    polyline: polyline
  }
});

export const showAddCaboModal = () => ({
  type: Types.showAddCabo
});

export const hideAddCaboModal = () => ({
  type: Types.hideAddCabo
});

/** Setta as polylines/Cabos vindas do servidor no redux */
export const setPolylinesFromServer = data => ({
  type: Types.setPolylinesFromServer,
  payload: {
    data: data
  }
});
