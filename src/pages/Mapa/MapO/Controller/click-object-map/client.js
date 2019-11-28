import { Creators as CreatorsClient } from "../../../../../redux/store/ducks/cliente";

export const handleClickClient = (e, store) => {
  // eslint-disable-next-line no-unused-vars
  let coordenadas = {
    longitude: e.features[0].geometry.coordinates[0],
    latitude: e.features[0].geometry.coordinates[1]
  };
  let cliente = JSON.parse(e.features[0].properties.data);
  store.dispatch(CreatorsClient.showClientViewModal(cliente));
  console.log("Chegou aqui nessa porra");
};

const handleCtoCaboClickTwoFactor = cliente => {};
