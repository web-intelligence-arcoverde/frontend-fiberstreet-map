import { Creators as CreatorsCto } from '../../../../../redux/store/ducks/ctos';
import { Creators as CreatorsMap } from '../../../../../redux/store/ducks/map';
import { Creators as CreatorsCable } from '../../../../../redux/store/ducks/cabo';
import { Creators as CreatorsDrop } from '~/redux/store/ducks/drop';
import store from '../../../../../redux/store';

export const handleClickCto = (features, map) => {
  const { properties } = features;
  const longitude = features.geometry.coordinates[0];
  const latitude = features.geometry.coordinates[1];

  const data = JSON.parse(properties.data);

  handleCtoClickTwoFactor(data, longitude, latitude, map);
};

export const handleCtoClickTwoFactor = (cto, longitude, latitude, map) => {
  const { delimitation, polyline, subDelimitation } = store.getState().map;
  console.log({ delimitation });
  const { dispatch } = store;
  if (delimitation === 'cabo') {
    const newPolyline = [...polyline, [longitude, latitude]];

    /*
      Algumas das funções para desenhar o cabo (Depois descubro)
    */

    dispatch(CreatorsMap.addCoordCabo(newPolyline));

    /* 
      Adicionar cabo de uma {cto,ceo} para os mesmo.
    */
    if ((subDelimitation === 'cto') | (subDelimitation === 'ceo')) {
      dispatch(CreatorsCable.setIdTo(cto.id));
      dispatch(CreatorsCable.showModalAddCable('cto'));
    } else if (subDelimitation === 'anywhere') {
      const { cable } = store.getState().cabo;

      dispatch(
        CreatorsCable.addExistentCableToObjectRequest(cto.id, 'CTO', cable)
      );

      dispatch(CreatorsMap.hideIcons());
      dispatch(CreatorsMap.setDelimitation('default'));
      const newpolyline = [];

      updateDrawn(map, newpolyline);
    } else {
      // subdelimitacao
      /* Cabo do cliente para a Caixa Terminal */
      dispatch(CreatorsCable.showAddCableCto(cto.id));
    }
  } else if (delimitation === 'client_add_cable') {
    // dispatch(CreatorsCable.showAddCableCto(cto.id));
    dispatch(CreatorsDrop.showDropAddModalRequest({ cto_id: cto.id }));
  } else {
    /* Modal View Caixa Terminal */
    dispatch(CreatorsCto.loadSplitterAndClientByCtoRequest(cto));
    dispatch(CreatorsCto.showViewModalCto(cto));
  }
};

function updateDrawn(map, polyline) {
  map.getSource('linhas').setData({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: polyline,
    },
  });
}
