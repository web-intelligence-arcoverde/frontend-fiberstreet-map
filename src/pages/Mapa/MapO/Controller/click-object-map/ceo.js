import { Creators as CreatorsCeo } from "../../../../../redux/store/ducks/ceo";
import { Creators as CreatorsMap } from "../../../../../redux/store/ducks/map";
import { Creators as CreatorsCable } from "../../../../../redux/store/ducks/cabo";
import store from "../../../../../redux/store";

export const handleClickCeo = (features, map) => {
  const { properties } = features.features[0];
  let longitude = features.features[0].geometry.coordinates[0];
  let latitude = features.features[0].geometry.coordinates[1];

  const data = JSON.parse(properties.data);

  handleCeoClickTwoFactor(data, longitude, latitude, map);
};

const handleCeoClickTwoFactor = (ceo, longitude, latitude, map) => {
  const { delimitation, subDelimitation, polyline } = store.getState().map;
  const dispatch = store.dispatch;
  if (delimitation === "cabo") {
    let newPolyline = [...polyline, [longitude, latitude]];
    dispatch(CreatorsMap.addCoordCabo(newPolyline));

    /* 
      Adicionar cabo de uma {cto,ceo} para os mesmo.
    */
    if ((subDelimitation === "cto") | (subDelimitation === "ceo")) {
      dispatch(CreatorsCable.setIdTo(ceo.id));
      dispatch(CreatorsCable.showModalAddCable("ceo"));
    } else if (subDelimitation === "anywhere") {
      const { cable } = store.getState().cabo;
      dispatch(
        CreatorsCable.addExistentCableToObjectRequest(ceo.id, "CEO", cable)
      );
      dispatch(CreatorsMap.hideIcons());
      dispatch(CreatorsMap.setDelimitation("default"));
      
      const newpolyline = [];
      updateDrawn(map, newpolyline);
    }
  } else {
    dispatch(CreatorsCeo.showViewModalCeo(ceo));
  }
};

function updateDrawn(map, polyline) {
  map.getSource("linhas").setData({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: polyline
    }
  });
}
