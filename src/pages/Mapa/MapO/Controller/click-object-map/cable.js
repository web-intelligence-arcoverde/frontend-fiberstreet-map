import { Creators as CreatorsCto } from "../../../../../redux/store/ducks/ctos";
import { Creators as CreatorsMap } from "../../../../../redux/store/ducks/map";
import { Creators as CreatorsCable } from "../../../../../redux/store/ducks/cabo";
import store from "../../../../../redux/store";

export const handleClickCable = features => {
  const { properties } = features;
  let longitude = features.geometry.coordinates[0];
  let latitude = features.geometry.coordinates[1];

  const data = JSON.parse(properties.data);

  handleCableClickTwoFactor(data, longitude, latitude);
};

const handleCableClickTwoFactor = (cable, longitude, latitude) => {
  const { delimitation, polyline, subDelimitation } = store.getState().map;

  if (delimitation === "cabo") {
    if (subDelimitation === "cabo") {
    } else if (subDelimitation === "ceo") {
    } else if (subDelimitation === "cto") {
    } else if (subDelimitation === "cliente") {
    }
  } else {
    store.dispatch(CreatorsCable.showViewCable(cable));
  }
};
