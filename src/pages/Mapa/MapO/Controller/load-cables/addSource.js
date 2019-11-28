export const source = (map, url) => {
  map.addSource("wires", {
    type: "geojson",
    data: url
  });
  map.addLayer({
    id: "wires",
    source: "wires",
    type: "line"
  });
};
