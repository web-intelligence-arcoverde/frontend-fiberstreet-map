export const get = (map, store, api, API) => {
  api
    .get(API.GET_CABO_GEOJSON)
    .then(response => {
      const { data } = response;

      const dat = {
        type: 'FeatureCollection',
        features: data,
      };

      store.dispatch({
        type: '@cable/LOAD_SUCCESS',
        payload: { cables: data },
      });

      map.getSource('wires').setData(dat);

      // store.dispatch({
      //   type: '@map/ADD_LAYER_DATA',
      //   payload: { data: dat, type: 'add' },
      // });
    })
    .catch(error => {});
};
