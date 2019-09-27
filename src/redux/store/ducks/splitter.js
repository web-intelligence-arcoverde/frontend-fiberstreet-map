export const Types = {
  //Modal
  SHOWMODALSPLITTER: "splitter/MODAL_SHOW",
  HIDEMODALSPLITTER: "splitter/MODAL_HIDE"
};

const INITIAL_STATE = {
  modalSplitter: {
    visible: false,
    id: 9999999
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOWMODALSPLITTER:
      return {
        ...state,
        modalSplitter: {
          visible: true,
          coordinates: action.payload.coordinates
        }
      };
    case Types.HIDEMODALSPLITTER:
      return {
        ...state,
        modalSplitter: {
          visible: false,
          coordinates: null
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
