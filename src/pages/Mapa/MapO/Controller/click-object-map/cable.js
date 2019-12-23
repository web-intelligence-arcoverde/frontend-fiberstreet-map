import { Creators as CreatorsCto } from "../../../../../redux/store/ducks/ctos";
import { Creators as CreatorsMap } from "../../../../../redux/store/ducks/map";
import { Creators as CreatorsCable } from "../../../../../redux/store/ducks/cabo";

import { toastr } from "react-redux-toastr";

import store from "../../../../../redux/store";

export const handleClickCable = features => {
  const { properties } = features;

  const [longitude, latitude] = features.geometry.coordinates;

  const data = JSON.parse(properties.data);

  handleCableClickTwoFactor(data, longitude, latitude);
};

const handleCableClickTwoFactor = (cable, longitude, latitude) => {
  const {
    delimitation,
    lastDelimitation,
    polyline,
    subDelimitation
  } = store.getState().map;
  const dispatch = store.dispatch;

  if (lastDelimitation === "mover") {
    verifyMoveLayer(cable.id, dispatch);
    dispatch(CreatorsMap.setDelimitation(delimitation));
  }

  dispatch(CreatorsCable.saveCable(cable));
  if (delimitation === "cabo") {
    if (subDelimitation === "cabo") {
      dispatch(CreatorsCable.updateCableRequest(cable.id, polyline));
    } else if (subDelimitation === "ceo") {
    } else if (subDelimitation === "cto") {
    } else if (subDelimitation === "cliente") {
    }
  } else {
    dispatch(CreatorsCable.showViewCable(cable));
  }
};

const verifyMoveLayer = (cableId, dispatch) => {
  const {
    moveObjectMap: { type, objectId }
  } = store.getState().map;

  const toastrConfirmOptions = {
    onOk: () =>
      dispatch(
        CreatorsCable.addRelationshipBetLayerAndCableRequest(
          type,
          objectId,
          cableId
        )
      ),
    onCancel: () => toastr.info("Informação", "Nenhuma relação foi criada boy")
  };
  toastr.confirm(`Deseja adicionar o cabo no ${type}?`, toastrConfirmOptions);
  dispatch(CreatorsMap.setDelimitation("default"));
  dispatch(CreatorsMap.setDelimitation("default"));
};
