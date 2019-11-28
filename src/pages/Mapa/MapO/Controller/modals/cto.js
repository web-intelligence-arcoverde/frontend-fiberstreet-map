import store from "../../../../../redux/store";
import { Creators as CtoCreators } from "../../../../../redux/store/ducks/ctos";
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";

export const openNewModalCto = coordinates => {
  store.dispatch(CtoCreators.showNewViewModalCto(coordinates));
  store.dispatch(MapCreators.setDelimitation("default"));
};
