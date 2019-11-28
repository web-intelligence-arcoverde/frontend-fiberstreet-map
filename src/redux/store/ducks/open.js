export const Types = {
  TESTE_SHOW: "DESCRIÇÃO",
  TESTE_HIDE: "DESCRIÇÃO"
};

const INITIAL_STATE = {
  action: {
    visible: false
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.TESTE_SHOW:
      return { ...state, action: { visible: true } };
    case Types.TESTE_HIDE:
      return { ...state, action: { visible: false } };
    default:
      return state;
  }
}

export const Creators = {
  showDrawn: () => ({
    type: Types.TESTE_SHOW,
    payload: {
      visible: true
    }
  }),
  hideDrawn: () => ({
    type: Types.TESTE_HIDE,
    payload: {
      visible: false
    }
  })
};
