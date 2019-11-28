export const handleMapClick = e => {
  const { lng: longitude, lat: latitude } = e.lngLat;
  const { addCoordenadas, canAddCoordenadas } = this.props;
  addCoordenadas({ longitude: longitude, latitude: latitude });
  canAddCoordenadas(false);
  let coordinates = {
    latitude: latitude,
    longitude: longitude
  };

  this.checkDelemitation(coordinates);
};

export const mapStyle = map => {};
