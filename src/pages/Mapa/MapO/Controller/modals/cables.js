import store from "../../../../../redux/store";
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";

export const addCoordinatesCables = (map, coordinates) => {
  const { polyline } = store.getState().map;
  let newPolyline = [
    ...polyline,
    [coordinates.longitude, coordinates.latitude]
  ];
  console.log(newPolyline);
  store.dispatch(MapCreators.addCoordCabo(newPolyline));
  adicionarCoordenadasAoCabo(newPolyline, map);
};

const adicionarCoordenadasAoCabo = (coordinates, map) => {
  const { polyline } = store.getState().map;
  map.getSource("linhas").setData({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: polyline
    }
  });
};

/*


*/
