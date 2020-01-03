import { call, put } from 'redux-saga/effects';

import { Creators as ImportActions, Types as ImportTypes } from '../ducks/imports';

import api from '../../../services/api';

import { toastr } from 'react-redux-toastr';

import parser from 'xml-js';
import fastParser from 'fast-xml-parser';
import he from 'he';

const options = {
  attributeNamePrefix : "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName : "#text",
  ignoreAttributes : true,
  ignoreNameSpace : false,
  allowBooleanAttributes : false,
  parseNodeValue : true,
  parseAttributeValue : false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
};

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

  const { reqType } = payload;

  if (reqType === 'XML') {

    function * getPostData(xmlData, layerType) {
      switch(layerType) {
        case 'CLIENTS': 
        return {layerType, clients: xmlData}
        case 'CTOS': 
        return {layerType, ctos: xmlData}
        case 'CEOS': 
        return {layerType, ceos: xmlData}
      }
    }

    function* parseXmlToJson(xml) {
      // const json = yield parser.xml2json  (xml,{compact: false, spaces: 4});
      if( parser.validate(xml) === true) { //optional (it'll return an object in case it's not valid)
          let jsonObj = yield parser.parse(xml,options);
      }
 
      // Intermediate obj
      let tObj = yield parser.getTraversalObj(xml,options);
      let jsonObj = yield parser.convertToJson(tObj,options);
      return jsonObj;
    }

    
    const parsedGeojson = yield parseXmlToJson(payload.geojson)
    console.log(parsedGeojson)
    // const postData = yield getPostData(parsedGeojson, payload.layerType)
    
    try {
      const { geojson, layerType } = payload;
  
      const data = yield importJSON(parsedGeojson);
      const postData = yield getLayerGeoJSONPostData(data, layerType);
  
      const response = yield call([api, 'post'], 'imports', {...postData, reqType: 'json'})
      yield toastr.success('Import', 'Dados importados com sucesso')
    } catch (err) {
      yield toastr.error('Import', 'Dados não importados')
    }
    yield put(ImportActions.importGeojsonSuccess())

  } else {
    try {
      const { geojson, layerType } = payload;
  
      const data = yield importJSON(geojson);
      const postData = yield getLayerGeoJSONPostData(data, layerType);
  
      const response = yield call([api, 'post'], 'imports', {...postData, reqType: 'json'})
      yield toastr.success('Import', 'Dados importados com sucesso')
    } catch (err) {
      yield toastr.error('Import', 'Dados não importados')
    }
    yield put(ImportActions.importGeojsonSuccess())
  }

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
