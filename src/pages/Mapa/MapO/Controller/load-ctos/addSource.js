export const source = (map, url) => {
  map.addSource("cto", {
    type: "geojson",
    data: url
  });

  map.addSource("cto_lotada", {
    type: "geojson",
    data: url
  });

  map.addSource("cto_cliente_cancelado", {
    type: "geojson",
    data: url
  });
};
