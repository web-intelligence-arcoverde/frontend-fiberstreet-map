import { Creators as CreatorsCeo } from "../../../../../redux/store/ducks/ceo";
import { Creators as CreatorsMap } from "../../../../../redux/store/ducks/map";
import { Creators as CreatorsCable } from "../../../../../redux/store/ducks/cabo";
import store from "../../../../../redux/store";

export const handleClickCeo = features => {
  const { properties } = features.features[0];
  let longitude = features.features[0].geometry.coordinates[0];
  let latitude = features.features[0].geometry.coordinates[1];

  const data = JSON.parse(properties.data);

  handleCeoClickTwoFactor(data, longitude, latitude);
};

const handleCeoClickTwoFactor = (ceo, longitude, latitude) => {
  const { delimitation, subDelimitation, polyline } = store.getState().map;
  const dixpesti = store.dispatch;
  if (delimitation === "cabo") {
    let newPolyline = [...polyline, [longitude, latitude]];
    dixpesti(CreatorsMap.addCoordCabo(newPolyline));

    /* 
      Adicionar cabo de uma {cto,ceo} para os mesmo.
    */
    if ((subDelimitation === "cto") | (subDelimitation === "ceo")) {
      dixpesti(CreatorsCable.setIdTo(ceo.id));
      dixpesti(CreatorsCable.showModalAddCable("ceo"));
    } else if (subDelimitation === "anywhere") {
      const { cableId } = store.getState().cabo;
      dixpesti(
        CreatorsCable.addExistentCableToObjectRequest(ceo.id, "CEO", cableId)
      );
    }
  } else {
    dixpesti(CreatorsCeo.showViewModalCeo(ceo));
  }
};
