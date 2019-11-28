import { measureDistance } from "./measureDistance";
import { source } from "./source";

export const measure = (map, distanceContainer, geojson) => {
  map.on("load", function() {
    source(map);
    measureDistance(map, distanceContainer, geojson);
  });
};
