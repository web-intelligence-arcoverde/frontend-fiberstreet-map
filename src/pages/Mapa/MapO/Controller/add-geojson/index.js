export const addGeojson = (map, geojson) => {
  map.on("load", function() {
    map.addSource("geojson", {
      type: "geojson",
      data: geojson
    });
  });
};
