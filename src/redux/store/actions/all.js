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
