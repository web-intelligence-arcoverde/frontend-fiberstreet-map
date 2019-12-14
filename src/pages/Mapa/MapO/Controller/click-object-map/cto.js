import { Creators as CreatorsCto } from "../../../../../redux/store/ducks/ctos";
import { Creators as CreatorsMap } from "../../../../../redux/store/ducks/map";
import { Creators as CreatorsCable } from "../../../../../redux/store/ducks/cabo";
import store from "../../../../../redux/store";

export const handleClickCto = (features, map) => {
  const { properties } = features;
  let longitude = features.geometry.coordinates[0];
  let latitude = features.geometry.coordinates[1];

  const data = JSON.parse(properties.data);

  handleCtoClickTwoFactor(data, longitude, latitude, map);
};

export const handleCtoClickTwoFactor = (cto, longitude, latitude, map) => {
  const { delimitation, polyline, subDelimitation } = store.getState().map;
  const disgraca = store.dispatch;
  if (delimitation === "cabo") {
    let newPolyline = [...polyline, [longitude, latitude]];

    /*
      Algumas das funções para desenhar o cabo (Depois descubro)
    */

    disgraca(CreatorsMap.addCoordCabo(newPolyline));

    /* 
      Adicionar cabo de uma {cto,ceo} para os mesmo.
    */
    if ((subDelimitation === "cto") | (subDelimitation === "ceo")) {
      disgraca(CreatorsCable.setIdTo(cto.id));
      disgraca(CreatorsCable.showModalAddCable("cto"));
    } else if (subDelimitation === "anywhere") {
      const { cable } = store.getState().cabo;

      disgraca(
        CreatorsCable.addExistentCableToObjectRequest(cto.id, "CTO", cable.id)
      );

      disgraca(CreatorsMap.hideIcons());
      disgraca(CreatorsMap.setDelimitation("default"));
      const newpolyline = [];
      disgraca(CreatorsMap.addCoordCabo(newpolyline));
      updateDrawn(map, newpolyline);
    } else {
      /* Cabo do cliente para a Caixa Terminal */
      disgraca(CreatorsCable.showAddCableCto(cto.id));
    }
  } else {
    /* Modal View Caixa Terminal */
    disgraca(CreatorsCto.loadSplitterAndClientByCtoRequest(cto));
    disgraca(CreatorsCto.showViewModalCto(cto));
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
