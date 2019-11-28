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
    console.log("Primeiro IF");
    let newPolyline = [...polyline, [longitude, latitude]];

    store.dispatch(CreatorsMap.addCoordCabo(newPolyline));

    console.log(subDelimitation);
    // CTO para CTO
    if (subDelimitation === "cto") {
      store.dispatch(CreatorsCable.setIdTo(cto.id));
      store.dispatch(CreatorsCable.showModalAddCable("cto"));
      console.log("Pq");
    }
    //CEO para CTO
    else if (subDelimitation === "ceo") {
      store.dispatch(CreatorsCable.setIdTo(cto.id));
      store.dispatch(CreatorsCable.showModalAddCable("cto"));
    }
    //Cliente para CTO
    else {
      console.log("Por que não?");
      store.dispatch(CreatorsCable.showAddCableCto(cto.id));
    }
  } else {
    //Abrir modal com as informações da cto {informações, clientes e splitters}
    store.dispatch(CreatorsCto.loadSplitterAndClientByCtoRequest(cto));
    store.dispatch(CreatorsCto.showViewModalCto(cto));
    console.log("Segundo IF");
  }
};
