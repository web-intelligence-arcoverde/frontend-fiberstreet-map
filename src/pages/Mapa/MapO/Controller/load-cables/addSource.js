export const source = (map, url) => {
  map.addSource("wires", {
    type: "geojson",
    data: url
  });
  map.addLayer({
    id: "wires",
    source: "wires",
    type: "line",
    paint: {
      "line-color": "#000",
      "line-width": 5
    }
  });
};
