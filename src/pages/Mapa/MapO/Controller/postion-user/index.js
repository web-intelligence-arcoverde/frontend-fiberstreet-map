import mapboxgl from "mapbox-gl";

export const getPosition = map => {
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
  );
};
