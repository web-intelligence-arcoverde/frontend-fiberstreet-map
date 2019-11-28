export const get = (map, store, api, API) => {
  api.get(API.GET_CLIENTE_GEOJSON).then(result => {
    const { data } = result;

    let clientsActive = [];
    data.forEach(client => {
      if (client.properties.data.status === "active") {
        clientsActive.push(client);
      }
    });
    let clientsInactive = [];
    data.forEach(client => {
      if (client.properties.data.status !== "active") {
        clientsInactive.push(client);
      }
    });

    const clientesAtivos = {
      type: "FeatureCollection",
      features: clientsActive
    };

    const clientesInativos = {
      type: "FeatureCollection",
      features: clientsInactive
    };

    store.dispatch({
      type: "@cliente/LOAD_GJ_SUCCESS",
      payload: { clients: data }
    });

    map.getSource("cliente").setData(clientesAtivos);
    map.getSource("cliente_inativo").setData(clientesInativos);
  });
  // ativo
  map.loadImage(
    require("../../../../../assets/images/cliente-ativo.png"),
    function(error, image) {
      if (error) throw error;
      map.addImage("custom-cliente", image);
      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      map.addLayer({
        id: "cliente",
        type: "symbol",
        source: "cliente",
        layout: {
          "icon-image": "custom-cliente"
        }
      });
    }
  );
  // inativo
  map.loadImage(
    require("../../../../../assets/images/cliente-inativo.png"),
    function(error, image) {
      if (error) throw error;
      map.addImage("cliente-inativo", image);
      map.addLayer({
        id: "cliente_inativo",
        type: "symbol",
        source: "cliente_inativo",
        layout: {
          "icon-image": "cliente-inativo"
        }
      });
    }
  );
};
