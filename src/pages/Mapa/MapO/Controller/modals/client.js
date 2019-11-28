import store from "../../../../../redux/store";
import { Creators as ClientCreators } from "../../../../../redux/store/ducks/cliente";
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";

export const openNewModalClient = coordinates => {
  store.dispatch(ClientCreators.showNewModalClient(coordinates));
  store.dispatch(MapCreators.setDelimitation("default"));
};
