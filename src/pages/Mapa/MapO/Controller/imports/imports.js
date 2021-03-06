function loadImports(map, geojson) {
  map.on("load", function() {
    function importar(geojson) {
      let features = geojson.features.map(feature =>
        true
          ? {
              ...feature,
              geometry: {
                type: "Point",
                coordinates:
                  // [
                  feature.geometry.geometries //[0].coordinates,
                // feature.geometry.geometries[0].coordinates[0],
                // feature.geometry.geometries[0].coordinates[1]
                // ]
              }
            }
          : feature
      );
      let geo = geojson;
      geo.features = features;
      console.log(geo);
      return geo;
    }

    function sendBatchCreate(geojson) {
      const clients = geojson.features.map(feature => {
        const client = {
          name: feature.properties.NOME,
          pppoe: feature.properties.Name,
          address: feature.properties.ENDERE__O,
          obs: feature.properties.description
        };

        const longitude = feature.geometry;

        return client
      })
    }

    function saveImportsOnDatabase(geojson) {
      let clients = geojson.features.map(feature => {
        const client = {
          name: feature.properties.NOME,
          pppoe: feature.properties.Name,
          endereco: feature.properties.ENDERE__O,
          obs: feature.properties.description
        };
        // eslint-disable-next-line no-unused-vars
        const longitude = feature.geometry;
        //  console.log(longitude)
        client.coordinates = JSON.stringify([feature.geometry.geometries[0].coordinates[0], feature.geometry.geometries[0].coordinates[1]])
        return client;
      });
      const postData = {
        layerType: 'CLIENTS',
        clients
      }
      api.post('imports', postData)

      clients.forEach(client => {
        // api.post(`http://localhost:3333/clients`, client)
      });
    }

    const dados = importar(geojson);
    saveImportsOnDatabase(dados);

    const geojsondois = {
      type: "FeatureCollection",
      name: "vsfdesgrassa",
      features: [
        {
          type: "Feature",
          properties: {
            Name: "yali01",
            description:
              "descri????o: NOME: YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)<br>ENDERE??O: RUA DINATO RODRIGUES DE ALENCAR, 320<br>CTO: CTO: CENTRO ESP??RITA S??O MIGUEL<br>NOME: YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)<br>ENDERE??O: RUA DINATO RODRIGUES DE ALENCAR, 320<br>CTO: CTO: CENTRO ESP??RITA S??O MIGUEL",
            tessellate: "1",
            extrude: "0",
            visibility: "-1",
            descri____o:
              "NOME: YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)\nENDERE??O: RUA DINATO RODRIGUES DE ALENCAR, 320\nCTO: CTO: CENTRO ESP??RITA S??O MIGUEL",
            NOME: "YALI THAUANA RODRIGUES SILVA (COMODATO FIBRA)",
            ENDERE__O: "RUA DINATO RODRIGUES DE ALENCAR, 320",
            CTO: "CTO: CENTRO ESP??RITA S??O MIGUEL"
          },
          // "geometry": {
          //   "type": 'Point',
          //   "coordinates": [-37.061347, -8.425715]
          // }
          // ,
          geometry: {
            type: "GeometryCollection",
            geometries: [
              { type: "Point", coordinates: [-37.061347, -8.425715, 0.0] },
              {
                type: "LineString",
                coordinates: [
                  [-37.065675, -8.428961, 0.0],
                  [-37.057019, -8.428961, 0.0],
                  [-37.057019, -8.422469, 0.0],
                  [-37.065675, -8.422469, 0.0],
                  [-37.065675, -8.428961, 0.0]
                ]
              }
            ]
          }
        },
        {
          type: "Feature",
          properties: {
            Name: "anny12",
            description:
              "descri????o: NOME: ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU ) <br>ENDERE??O: RUA BARBOSA LIMA, 246<br>CTO: CTO: SANTA RAMOS<br>NOME: ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU )<br>ENDERE??O: RUA BARBOSA LIMA, 246<br>CTO: CTO: SANTA RAMOS",
            tessellate: "-1",
            extrude: "0",
            visibility: "-1",
            descri____o:
              "NOME: ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU ) \nENDERE??O: RUA BARBOSA LIMA, 246\nCTO: CTO: SANTA RAMOS",
            NOME: "ANNY DAGILA MORAES DE LIMA ( COMODATO FIBRA + ONU )",
            ENDERE__O: "RUA BARBOSA LIMA, 246",
            CTO: "CTO: SANTA RAMOS"
          },
          geometry: {
            type: "Point",
            coordinates: [-37.054176, -8.418783, 0.0]
          }
        },
        {
          type: "Feature",
          properties: {
            Name: "livramento",
            description:
              "descri????o: NOME: ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP<br>ENDERE??O: RUA JOS?? ESTRELA DE SOUZA, 23<br>CTO: CTO: SUBINDO A CASA DO FARELO<br>NOME: ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP<br>ENDERE??O: RUA JOS?? ESTRELA DE SOUZA, 23<br>CTO: CTO: SUBINDO A CASA DO FARELO",
            tessellate: "1",
            extrude: "0",
            visibility: "-1",
            descri____o:
              "NOME: ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP\nENDERE??O: RUA JOS?? ESTRELA DE SOUZA, 23\nCTO: CTO: SUBINDO A CASA DO FARELO",
            NOME:
              "ASSOCIA????O NOSSA SENHORA DO LIVRAMENTO (COMODATO ROTEADOR TP LINK 3 ANTENAS) VP",
            ENDERE__O: "RUA JOS?? ESTRELA DE SOUZA, 23",
            CTO: "CTO: SUBINDO A CASA DO FARELO"
          },
          geometry: {
            type: "GeometryCollection",
            geometries: [
              { type: "Point", coordinates: [-37.053913, -8.415811, 0.0] },
              {
                type: "LineString",
                coordinates: [
                  [-37.058241, -8.419057, 0.0],
                  [-37.049585, -8.419057, 0.0],
                  [-37.049585, -8.412565, 0.0],
                  [-37.058241, -8.412565, 0.0],
                  [-37.058241, -8.419057, 0.0]
                ]
              }
            ]
          }
        }
      ]
    };
    map.loadImage(
      require("../../../assets/images/clienteCom24x12.png"),
      function(error, image) {
        if (error) throw error;
        map.addImage("import-cliente", image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        map.addLayer({
          id: "import_clients",
          type: "symbol",
          source: "import_clients",
          layout: {
            "icon-image": "import-cliente"
          }
        });
      }
    );
    map.getSource("import_clients").setData(geojsondois);
  });
}
