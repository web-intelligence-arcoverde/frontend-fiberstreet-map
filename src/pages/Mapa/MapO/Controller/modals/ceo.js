import store from "../../../../../redux/store";
import { Creators as CeoCreators } from "../../../../../redux/store/ducks/ceo";
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";

export const openNewModalCeo = coordinates => {
  store.dispatch(CeoCreators.showNewViewModalCeo(coordinates));
  store.dispatch(MapCreators.setDelimitation("default"));
};
