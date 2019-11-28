/** Adiciona coordenadas ao JSON de coordenadas de polyline contido no redux store
 * mapa.polyline - REDUX
 */

export const addCoordenadasCabo = coordinates => {
  const { addCoordCabo } = this.props;
  const { polyline } = this.props.redux.map;
  let newPolyline = [
    ...polyline,
    [coordinates.longitude, coordinates.latitude]
  ];
  addCoordCabo(newPolyline);
  this.adicionarCoordenadasAoCabo(newPolyline);
};

export const adicionarCoordenadasAoCabo = coordinates => {
  const { map } = this.state;
  const { polyline } = this.props.redux.map;

  map.getSource("linhas").setData({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: polyline
    }
  });
};

export const resetarCoordenadasAoCabo = () => {
  const { map } = this.state;
  const datab = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-77.03202080476535, 38.91454768710531],
        [-78.03, 39.91]
      ]
    }
  };
  map.getSource("linhas").setData({
    type: "geojson",
    data: datab
  });
};
