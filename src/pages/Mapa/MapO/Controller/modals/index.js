import { openNewModalClient } from "./client";
import { openNewModalCto } from "./cto";
import { openNewModalCeo } from "./ceo";
import { addCoordinatesCables } from "./cables";

import store from "../../../../../redux/store";

import { Creators as UserCreators } from "../../../../../redux/store/ducks/user";
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";
import { Creators as ProviderCreators } from "../../../../../redux/store/ducks/provider";

export const check = (delimitation, coordinates, map) => {
  if (delimitation !== "cabo") {
    const openModal = modals[delimitation];
    openModal(coordinates);
  } else {
    addCoordinatesCables(map, coordinates);
  }
};

const modals = {
  client: coordinates => {
    openNewModalClient(coordinates);
    return 1;
  },
  cto: coordinates => {
    openNewModalCto(coordinates);
    return 2;
  },
  ceo: coordinates => {
    openNewModalCeo(coordinates);
    return 3;
  },

  functionary: () => {
    store.dispatch(UserCreators.showModalNewUser());
    store.dispatch(MapCreators.setDelimitation("default"));
    return 4;
  },
  provider: () => {
    store.dispatch(ProviderCreators.showModalNewProvider());
    store.dispatch(MapCreators.setDelimitation("default"));
    return 5;
  },

  default: coordinates => {
    return 0;
  }
};
