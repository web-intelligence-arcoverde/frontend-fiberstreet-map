export const source = (map, url) => {
  map.addSource("cliente", {
    type: "geojson",
    data: url
  });
  map.addSource("cliente_inativo", {
    type: "geojson",
    data: url
  });
};
