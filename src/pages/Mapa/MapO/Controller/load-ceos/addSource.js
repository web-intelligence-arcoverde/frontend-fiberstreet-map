export const source = (map, url) => {
  map.addSource("ceo", {
    type: "geojson",
    data: url
  });
};
