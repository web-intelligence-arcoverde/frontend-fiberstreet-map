import { call, put } from 'redux-saga/effects';

import { Creators as ImportActions, Types as ImportTypes } from '../ducks/import';

import api from '../../../services/api';

import { toastr } from 'react-redux-toastr';



/**
 * const formData = {
      layerType: payload.layerType,
      ceos: payload.ceos,
      clients: payload.clients,
      ctos: payload.ctos,
    }

 * @param {*} param0 
 */
export function* importGeoJSONData({ payload }) {
  try {
    const { geojson, layerType } = payload;

    const data = yield importJSON(geojson);
    const postData = yield getLayerGeoJSONPostData(data, layerType);

    const response = yield call([api, 'post'], 'imports', postData)
    yield toastr.success('Import', 'Dados importados com sucesso')
  } catch (err) {
    yield toastr.error('Import', 'Dados não importados')
  }
  yield put(ImportActions.importGeojsonSuccess())
}

function* importJSON(geojson) {
  let features = yield geojson.features.map(feature =>
    true
      ? {
          ...feature,
          geometry: {
            type: "Point",
            coordinates: feature.geometry.geometries
          }
        }
      : feature
  );
  let geo = yield geojson;
  geo.features = yield features;
  return geo;
}

function* getLayerGeoJSONPostData(geojson, layerType) {
  switch (layerType) {
    case 'CLIENTS': 
      let clients = yield geojson.features.map(feature => {
        const client = {
          name: feature.properties.NOME,
          pppoe: feature.properties.Name,
          endereco: feature.properties.ENDERE__O,
          obs: feature.properties.description
        };
        const longitude = feature.geometry;
        client.coordinates = JSON.stringify([feature.geometry.geometries[0].coordinates[0], feature.geometry.geometries[0].coordinates[1]])
        return client;
      });
      return {layerType, clients};
    case 'CEOS':
      // Precisa testar manualmente o geojson das ceos
      return null;
    case 'CTOS':
      // Precisa testar manualmente o geojson das ctos
      return null;

  }
}
