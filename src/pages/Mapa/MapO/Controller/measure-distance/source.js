export const source = map => {
  map.addLayer({
    id: "measure-points",
    type: "circle",
    source: "geojson",
    paint: {
      "circle-radius": 5,
      "circle-color": "#000"
    },
    filter: ["in", "$type", "Point"]
  });
  map.addLayer({
    id: "measure-lines",
    type: "line",
    source: "geojson",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#000",
      "line-width": 3
    },
    filter: ["in", "$type", "LineString"]
  });
};
