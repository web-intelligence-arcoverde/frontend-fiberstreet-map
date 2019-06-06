import  { addMarker as mk, addCto as ct, addDelimitacao as dl} from '../type';

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
})

export const addDelimitacao = delimitacao => ({
  type: dl,
  payload: {
    delimitacao
  }
})

export const openModalCto = modal => ({
  type: 'OPEN_MODAL_CTO',
  payload: {
    modalCto: modal
  }
})