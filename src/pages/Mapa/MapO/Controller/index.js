import { getPosition } from './postion-user/index';
import { search } from './search-location/index';
import { searchLayer } from './search-layer';
import { measure } from './measure-distance/index';
import { mapClick } from './click-map/index';

export const loadControllers = (
  map,
  geojson,
  distanceContainer,
  geo,
  store
) => {
  getPosition(map);
  search(map, geo);
  //searchLayer(map, filterInput, store);
  measure(map, distanceContainer, geojson);
  mapClick(map, store);
};
