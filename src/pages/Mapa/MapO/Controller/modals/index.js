import { openNewModalClient } from "./client";
import { openNewModalCto } from "./cto";
import { openNewModalCeo } from "./ceo";
import { addCoordinatesCables } from "./cables";

import store from "../../../../../redux/store";

import { Creators as UserCreators } from "../../../../../redux/store/ducks/user";
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";
import { Creators as ProviderCreators } from "../../../../../redux/store/ducks/provider";
import { Creators as CtoCreators } from "../../../../../redux/store/ducks/ctos";
import { Creators as CeoCreators } from "../../../../../redux/store/ducks/ceo";
import { Creators as ClientCreators } from "../../../../../redux/store/ducks/cliente";

export const check = (delimitation, coordinates, map) => {
  const { type, objectId } = store.getState().map.moveObjectMap;

  if (delimitation === "cabo") {
    addCoordinatesCables(map, coordinates);
  } else if (delimitation === "mover") {
    console.log(store.getState().ctos.cto);
    const move = {
      coordinates: JSON.stringify(coordinates)
    };
    if (type === "cto") {
      store.dispatch(CtoCreators.updateCtoRequest(move, objectId));
    } else if (type === "ceo") {
      store.dispatch(CeoCreators.updateCeoRequest(move, objectId));
    } else if (type === "client") {
      store.dispatch(ClientCreators.updateClientRequest(move, objectId));
    } else if (type === "cable") {
    }
    store.dispatch(MapCreators.setDelimitation("default"));
  } else {
    const openModal = modals[delimitation];
    openModal(coordinates);
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
