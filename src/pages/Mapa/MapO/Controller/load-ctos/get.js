export const get = (map, store, api, API) => {
  api.get(API.GET_CTO_GEOJSON).then(result => {
    const { data } = result;

    store.dispatch({
      type: '@cto/LOAD_GJ_SUCCESS',
      payload: { ctos: data },
    });

    // cto_lotada cto_cliente_cancelado
    let ctos_ativas = [];
    let ctos_lotadas = [];
    let ctos_clientes_cancelados = [];

    data.forEach(cto => {
      if (cto.properties.data.status === 'full') {
        ctos_lotadas.push(cto);
      } else if (cto.properties.data.status === 'cli_cancel') {
        ctos_clientes_cancelados.push(cto);
      } else if (
        !cto.properties.data.status ||
        cto.properties.data.status === 'active'
      ) {
        ctos_ativas.push(cto);
      }
    });

    const ctos_at = {
      type: 'FeatureCollection',
      features: ctos_ativas,
    };

    const ctos_cli_can = {
      type: 'FeatureCollection',
      features: ctos_clientes_cancelados,
    };

    const ctos_lot = {
      type: 'FeatureCollection',
      features: ctos_lotadas,
    };
    map.getSource('cto').setData(ctos_at);
    map.getSource('cto_lotada').setData(ctos_lot);
    map.getSource('cto_cliente_cancelado').setData(ctos_cli_can);
    // const datax = [
    //   ...ctos_ativas,
    //   ...ctos_lotadas,
    //   ...ctos_clientes_cancelados,
    // ];
    // store.dispatch({
    //   type: '@map/ADD_LAYER_DATA',
    //   payload: { data: datax, type: 'add' },
    // });
  });

  //Carregar imagens ctos images/CTO_24x24.png
  map.loadImage(
    require('../../../../../../src/assets/images/CTO_24x24.png'),
    function(error, image) {
      if (error) throw error;
      map.addImage('custom-CTO', image);
      map.addLayer({
        id: 'cto',
        type: 'symbol',
        source: 'cto',
        layout: {
          'icon-image': 'custom-CTO',
        },
      });
    }
  );

  // cto_lotada cto_cliente_cancelado
  map.loadImage(
    require('../../../../../../src/assets/images/cto_lotada.png'),
    function(error, image) {
      if (error) throw error;
      map.addImage('custom_cto_full', image);
      map.addLayer({
        id: 'cto_lotada',
        type: 'symbol',
        source: 'cto_lotada',
        layout: {
          'icon-image': 'custom_cto_full',
        },
      });
    }
  );

  map.loadImage(
    require('../../../../../../src/assets/images/cto_verde.png'),
    function(error, image) {
      if (error) throw error;
      map.addImage('custom_cto_can', image);
      map.addLayer({
        id: 'cto_cliente_cancelado',
        type: 'symbol',
        source: 'cto_cliente_cancelado',
        layout: {
          'icon-image': 'custom_cto_can',
        },
      });
    }
  );
};
