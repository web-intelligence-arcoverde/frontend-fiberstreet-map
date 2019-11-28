export const loadSocket = (map, store, socket) => {
  const { token } = store.getState().auth;
  const { active: provider } = store.getState().provider;

  socket.connect(token);
  const clients = socket.subscribe(`clients:${provider.id}`);
  const ctos = socket.subscribe(`ctos:${provider.id}`);
  const ceos = socket.subscribe(`ceos:${provider.id}`);
  const cables = socket.subscribe(`cables:${provider.id}`);
  // const ceos = socket.subscribe(`ceos:${provider.id}`);

  map.on("load", function() {
    clients.on("newClient", async client => {
      const data = await store.getState().client.geojson.clients;

      let clientes = data;
      clientes.push(client); // Adiciona o cliente novo

      await store.dispatch({
        type: "@cliente/LOAD_GJ_SUCCESS",
        payload: { clients: clientes }
      }); // Dispara no store

      let clientsActive = [];
      let clientsInactive = [];

      data.forEach(client => {
        if (client.properties.data.status === "active") {
          clientsActive.push(client);
        }
      });

      data.forEach(client => {
        if (client.properties.data.status !== "active") {
          clientsInactive.push(client);
        }
      });

      if (client.properties.data.status === "active") {
        const activeClients = await {
          type: "FeatureCollection",
          features: [...clientsActive, client]
        };
        await map.getSource("cliente").setData(activeClients);
      } else {
        const inactiveClients = await {
          type: "FeatureCollection",
          features: [...clientsInactive, client]
        };
        await map.getSource("cliente_inativo").setData(inactiveClients);
      }
    });

    clients.on("updatedClient", clientUp => {
      const data = store.getState().client.geojson.clients;

      let clientUpdated = clientUp;
      const longitude = JSON.parse(clientUp.properties.data.coordinates)
        .longitude;
      const latitude = JSON.parse(clientUp.properties.data.coordinates)
        .latitude;
      clientUpdated.geometry.coordinates = [longitude, latitude];

      let clientes = data;
      clientes.push(clientUpdated);

      const clientsActive = [];
      const clientsInactive = [];

      data.forEach(client => {
        if (client.properties.data.status === "active") {
          // eslint-disable-next-line eqeqeq
          if (client.properties.data.id != clientUpdated.properties.data.id)
            clientsActive.push(client);
        }
      });
      map.getSource("cliente").setData({
        type: "FeatureCollection",
        features: clientsActive
      });

      data.forEach(client => {
        if (client.properties.data.status !== "active") {
          // eslint-disable-next-line eqeqeq
          if (client.properties.data.id != clientUpdated.properties.data.id)
            clientsInactive.push(client);
        }
      });
      map.getSource("cliente_inativo").setData({
        type: "FeatureCollection",
        features: clientsInactive
      });

      // console.log([...clientsActive, ...clientsInactive, clientUpdated]);
      store.dispatch({
        type: "@cliente/LOAD_GJ_SUCCESS",
        payload: {
          clients: [...clientsActive, ...clientsInactive, clientUpdated]
        }
      });

      if (clientUpdated.properties.data.status === "active") {
        const activeClients = {
          type: "FeatureCollection",
          features: [...clientsActive, clientUpdated]
        };

        map.getSource("cliente").setData(activeClients);
      } else {
        const inactiveClients = {
          type: "FeatureCollection",
          features: [...clientsInactive, clientUpdated]
        };

        map.getSource("cliente_inativo").setData(inactiveClients);
      }
    });

    clients.on("deletedClient", async clientDeleted => {
      const data = await store.getState().client.geojson.clients;

      let clientsActive = [];
      let clientsInactive = [];

      // Se estiver ativo e o id
      // for diferente do cliente deletado
      // adiciona no array clientsActive
      data.forEach(client => {
        if (client.properties.data.status === "active") {
          if (client.properties.data.id !== clientDeleted.id)
            clientsActive.push(client);
        }
      });

      // Se estiver diferente de ativo e o id
      // for diferente do cliente deletado
      // adiciona no array clientsActive
      data.forEach(client => {
        if (client.properties.data.status !== "active") {
          if (client.properties.data.id !== clientDeleted.id)
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

      await store.dispatch({
        type: "@cliente/LOAD_GJ_SUCCESS",
        payload: { clients: [...clientsActive, ...clientsInactive] }
      });

      map.getSource("cliente").setData(clientesAtivos);
      map.getSource("cliente_inativo").setData(clientesInativos);
    });

    ctos.on("newCto", async cto => {
      const data = await store.getState().ctos.geojson.ctos;

      let ctos = data;
      ctos.push(cto);

      await store.dispatch({
        type: "@cto/LOAD_GJ_SUCCESS",
        payload: { ctos }
      });

      let ctos_ativas = [];
      let ctos_lotadas = [];
      let ctos_clientes_cancelados = [];

      data.forEach(cto => {
        if (cto.properties.data.status === "full") {
          ctos_lotadas.push(cto);
        } else if (cto.properties.data.status === "cli_cancel") {
          ctos_clientes_cancelados.push(cto);
        } else if (
          !cto.properties.data.status ||
          cto.properties.data.status === "active"
        ) {
          ctos_ativas.push(cto);
        }
      });

      const ctos_at = {
        type: "FeatureCollection",
        features: ctos_ativas
      };

      const ctos_cli_can = {
        type: "FeatureCollection",
        features: ctos_clientes_cancelados
      };

      const ctos_lot = {
        type: "FeatureCollection",
        features: ctos_lotadas
      };
      map.getSource("cto").setData(ctos_at);
      map.getSource("cto_lotada").setData(ctos_lot);
      map.getSource("cto_cliente_cancelado").setData(ctos_cli_can);

      // const dados = await {
      //   type: "FeatureCollection",
      //   features: ctos //[...data, cto]
      // };

      // await map.getSource("cto").setData(dados);
    });

    // Não testado @ probably ok
    ctos.on("deletedCto", async ctoDeleted => {
      const data = await store.getState().ctos.geojson.ctos;

      let ctos = [];

      await data.forEach(cto => {
        if (cto.properties.data.id !== ctoDeleted.id) {
          ctos.push(cto);
        }
      });

      await store.dispatch({
        type: "@cto/LOAD_GJ_SUCCESS",
        payload: { ctos }
      });

      let ctos_ativas = [];
      let ctos_lotadas = [];
      let ctos_clientes_cancelados = [];

      ctos.forEach(cto => {
        if (cto.properties.data.status === "full") {
          ctos_lotadas.push(cto);
        } else if (cto.properties.data.status === "cli_cancel") {
          ctos_clientes_cancelados.push(cto);
        } else if (
          !cto.properties.data.status ||
          cto.properties.data.status === "active"
        ) {
          ctos_ativas.push(cto);
        }
      });

      const ctos_at = {
        type: "FeatureCollection",
        features: ctos_ativas
      };

      const ctos_cli_can = {
        type: "FeatureCollection",
        features: ctos_clientes_cancelados
      };

      const ctos_lot = {
        type: "FeatureCollection",
        features: ctos_lotadas
      };
      map.getSource("cto").setData(ctos_at);
      map.getSource("cto_lotada").setData(ctos_lot);
      map.getSource("cto_cliente_cancelado").setData(ctos_cli_can);

      // const dados = {
      //   type: "FeatureCollection",
      //   features: ctos
      // };

      // await map.getSource("cto").setData(dados);
    });
    // Não testado @ probably ok
    ctos.on("updatedCto", async ctoUpdated => {
      const data = await store.getState().ctos.geojson.ctos;

      let ctos = [];

      await data.forEach(cto => {
        if (cto.properties.data.id !== ctoUpdated.properties.data.id) {
          ctos.push(cto);
        } else {
          let ctoUp = ctoUpdated;
          const longitude = JSON.parse(ctoUpdated.properties.data.coordinates)
            .longitude;
          const latitude = JSON.parse(ctoUpdated.properties.data.coordinates)
            .latitude;
          ctoUp.geometry.coordinates = [longitude, latitude];

          ctos.push(ctoUp);
        }
      });

      await store.dispatch({
        type: "@cto/LOAD_GJ_SUCCESS",
        payload: { ctos }
      });

      // NEW METHODS

      let ctos_ativas = [];
      let ctos_lotadas = [];
      let ctos_clientes_cancelados = [];

      ctos.forEach(cto => {
        if (cto.properties.data.status === "full") {
          ctos_lotadas.push(cto);
        } else if (cto.properties.data.status === "cli_cancel") {
          ctos_clientes_cancelados.push(cto);
        } else if (
          !cto.properties.data.status ||
          cto.properties.data.status === "active"
        ) {
          ctos_ativas.push(cto);
        }
      });

      const ctos_at = {
        type: "FeatureCollection",
        features: ctos_ativas
      };

      const ctos_cli_can = {
        type: "FeatureCollection",
        features: ctos_clientes_cancelados
      };

      const ctos_lot = {
        type: "FeatureCollection",
        features: ctos_lotadas
      };
      map.getSource("cto").setData(ctos_at);
      map.getSource("cto_lotada").setData(ctos_lot);
      map.getSource("cto_cliente_cancelado").setData(ctos_cli_can);
    });

    // Probably ok

    ceos.on("newCeo", async newCeo => {
      const data = await store.getState().ceo.geojson.ceos;

      let ceos = data;
      await ceos.push(newCeo);

      await store.dispatch({
        type: "@ceo/LOAD_GJ_SUCCESS",
        payload: { ceos }
      });

      const dados = await {
        type: "FeatureCollection",
        features: ceos //[...data, newCeo]
      };

      await map.getSource("ceo").setData(dados);
    });

    ceos.on("updatedCeo", async ceoUpdated => {
      const data = await store.getState().ceo.geojson.ceos;

      const ceos = [];

      await data.forEach(ceo => {
        if (ceo.properties.data.id !== ceoUpdated.properties.data.id) {
          ceos.push(ceo);
        } else {
          let ceoUp = ceoUpdated;
          const longitude = JSON.parse(ceoUpdated.properties.data.coordinates)
            .longitude;
          const latitude = JSON.parse(ceoUpdated.properties.data.coordinates)
            .latitude;
          ceoUp.geometry.coordinates = [longitude, latitude];

          ceos.push(ceoUp);
        }
      });

      await store.dispatch({
        type: "@ceo/LOAD_GJ_SUCCESS",
        payload: { ceos }
      });

      const dados = {
        type: "FeatureCollection",
        features: ceos
      };

      await map.getSource("ceo").setData(dados);
    });

    ceos.on("deletedCeo", async ceoDeleted => {
      const data = await store.getState().ceo.geojson.ceos;

      const ceos = [];

      await data.forEach(ceo => {
        if (ceo.properties.data.id !== ceoDeleted.id) {
          ceos.push(ceo);
        }
      });

      await store.dispatch({
        type: "@ceo/LOAD_GJ_SUCCESS",
        payload: { ceos }
      });

      const dados = {
        type: "FeatureCollection",
        features: ceos
      };
      await map.getSource("ceo").setData(dados);
    });

    cables.on("newCable", async newCable => {
      const data = await store.getState().cabo.geojson.cables;

      const cables = data;
      await cables.push(newCable);
      // console.log(store.getState().cabo)
      // console.warn(data)
      await store.dispatch({
        type: "@cable/LOAD_SUCCESS",
        payload: { cables }
      });

      const dados = {
        type: "FeatureCollection",
        features: cables
      };

      await map.getSource("wires").setData(dados);
    });

    cables.on("deletedCable", async deletedCable => {
      const data = await store.getState().cabo.geojson.cables;

      const cables = [];

      await data.forEach(cable => {
        if (cable.properties.data.id !== deletedCable.id) {
          cables.push(cable);
        }
      });

      await store.dispatch({
        type: "@cable/LOAD_SUCCESS",
        payload: { cables }
      });

      const dados = {
        type: "FeatureCollection",
        features: cables
      };

      await map.getSource("wires").setData(dados);
    });
  });
};
