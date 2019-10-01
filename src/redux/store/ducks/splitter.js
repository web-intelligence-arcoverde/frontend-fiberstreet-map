export const Types = {
  SHOWNEWMODALSPLITTER: "splitter/MODAL_SHOW",
  HIDENEWMODALSPLITTER: "splitter/MODAL_HIDE"
};

const INITIAL_STATE = {
  modalNewSplitter: {
    visible: false,
    id: null
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOWNEWMODALSPLITTER:
      return {
        ...state,
        modalNewSplitter: {
          visible: true,
          id: action.payload.id
        }
      };
    case Types.HIDENEWMODALSPLITTER:
      return {
        ...state,
        modalNewSplitter: {
          visible: false,
          id: null
        }
      };
    default:
      return state;
  }
}

export const Creators = {
  showSplitterAddModal: id => ({
    type: Types.SHOWMODALSPLITTER,
    payload: {
      id
    }
  }),

  hideSplitterAddModal: () => ({
    type: Types.HIDEMODALSPLITTER
  })
};
