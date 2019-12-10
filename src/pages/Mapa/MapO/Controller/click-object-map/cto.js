import { Creators as CreatorsCto } from "../../../../../redux/store/ducks/ctos";
import { Creators as CreatorsMap } from "../../../../../redux/store/ducks/map";
import { Creators as CreatorsCable } from "../../../../../redux/store/ducks/cabo";
import store from "../../../../../redux/store";

export const handleClickCto = features => {
  const { properties } = features;
  let longitude = features.geometry.coordinates[0];
  let latitude = features.geometry.coordinates[1];

  const data = JSON.parse(properties.data);

  handleCtoClickTwoFactor(data, longitude, latitude);
};

export const handleCtoClickTwoFactor = (cto, longitude, latitude) => {
  const { delimitation, polyline, subDelimitation } = store.getState().map;

  if (delimitation === "cabo") {
    let newPolyline = [...polyline, [longitude, latitude]];

    /*
      Algumas das funções para desenhar o cabo (Depois descubro)
    */
    store.dispatch(CreatorsMap.addCoordCabo(newPolyline));

    /* 
      Adicionar cabo de uma {cto,ceo} para os mesmo.
    */
    if ((subDelimitation === "cto") | (subDelimitation === "ceo")) {
      store.dispatch(CreatorsCable.setIdTo(cto.id));
      store.dispatch(CreatorsCable.showModalAddCable("cto"));
    } else {
      /* Cabo do cliente para a Caixa Terminal */
      store.dispatch(CreatorsCable.showAddCableCto(cto.id));
    }
  } else {
    /* Modal View Caixa Terminal */
    store.dispatch(CreatorsCto.loadSplitterAndClientByCtoRequest(cto));
    store.dispatch(CreatorsCto.showViewModalCto(cto));
  }
};
