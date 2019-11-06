export const Types = {};

const INITIAL = {};

export default function(state = INITIAL, action) {
  switch (action.type) {
    case Types.HIDE_MODAL_NEW_CABO_CTO_CEO:
      return { ...state, idFromTo: { visible: false } };

    default:
      return state;
  }
}

/**
 *
 * Creators
 *
 */
export const Creators = {};
