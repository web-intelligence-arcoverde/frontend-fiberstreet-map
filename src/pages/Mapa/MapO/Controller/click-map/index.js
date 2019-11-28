import { check } from "../modals/index";

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
  });
