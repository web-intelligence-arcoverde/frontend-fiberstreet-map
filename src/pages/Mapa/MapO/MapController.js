class MapController {
  /** Adiciona uma linha ao mapa */
  addLayerToMap(coordinates) {
    const { map } = this.state;
    let route = [
      [-122.48369693756104, 37.83381888486939],
      [116.48348236083984, 37.83317489144141]
    ];
    let coord = coordinates;
    let geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route
      }
    };
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route //geojson
          }
        }
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#2287be",
        "line-width": 5,
        "line-opacity": 0.75
      }
    });
    let start = [-122.662323, 45.523751];
    // map.addLayer({
    //   id: "point",
    //   type: "circle",
    //   source: {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           properties: {},
    //           geometry: {
    //             type: "Point",
    //             coordinates: start
    //           }
    //         }
    //       ]
    //     }
    //   },
    //   paint: {
    //     "circle-radius": 10,
    //     "circle-color": "#3887be"
    //   }
    // });
  }
}

// const

export default new MapController();
