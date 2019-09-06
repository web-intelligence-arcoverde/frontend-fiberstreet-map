export const Types = {
  ADD_CLIENTE_ID: "ADD_ID/cliente"
};

const INITIAL_STATE = {
  cliente_id: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_CLIENTE_ID:
      return { ...state, cliente_id: action.payload.cliente_id };
    default:
      return state;
  }
}

export const Creators = {
  addClienteId: cliente_id => ({
    type: Types.ADD_CLIENTE_ID,
    payload: { cliente_id }
  })
};
