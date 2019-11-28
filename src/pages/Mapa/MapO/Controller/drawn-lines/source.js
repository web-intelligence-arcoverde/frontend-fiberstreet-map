import store from "../../../../../redux/store";
export const source = map => {
  map.addSource("linhas", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: store.getState().map.polyline
      }
    }
  });
  map.addLayer({
    id: "linhas",
    type: "line",
    source: "linhas",
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#13d",
      "line-width": 4
    }
  });
};
