import { check } from "../modals/index";
import { Creators as CoordinatesCreators } from "../../../../../redux/store/ducks/coordinates";

export const mapClick = (map, store) =>
  map.on("click", e => {
    check(
      store.getState().map.delimitation,
      {
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng
      },
      map
    );
    store.dispatch(
      CoordinatesCreators.setCoordinatesClick({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng
      })
    );
  });
