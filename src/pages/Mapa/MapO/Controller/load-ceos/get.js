export const get = (map, store, api, API) => {
  api.get(API.GET_CEO_GEOJSON).then(result => {
    const { data } = result;
    const dados = {
      type: 'FeatureCollection',
      features: data,
    };
    store.dispatch({
      type: '@ceo/LOAD_GJ_SUCCESS',
      payload: { ceos: data },
    });
    map.getSource('ceo').setData(dados);
    // store.dispatch({
    //   type: '@map/ADD_LAYER_DATA',
    //   payload: { data: dados, type: 'add' },
    // });
  });
  map.loadImage(
    require('../../../../../../src/assets/images/ceo_24.png'),
    function(error, image) {
      if (error) throw error;
      map.addImage('custom-CEO', image);
      map.addLayer({
        id: 'ceo',
        type: 'symbol',
        source: 'ceo',
        layout: {
          'icon-image': 'custom-CEO',
        },
      });
    }
  );
};
