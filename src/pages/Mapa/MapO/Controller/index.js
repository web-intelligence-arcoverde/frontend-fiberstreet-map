import { getPosition } from "./postion-user/index";
import { search } from "./search-location/index";
import { measure } from "./measure-distance/index";
import { mapClick } from "./click-map/index";

export const loadControllers = (
  map,
  geojson,
  distanceContainer,
  geo,
  store
) => {
  getPosition(map);
  search(map, geo);
  measure(map, distanceContainer, geojson);
  mapClick(map, store);
};
