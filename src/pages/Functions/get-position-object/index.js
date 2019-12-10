export const positionObject = data => {
  let latitude;
  let longitude;
  try {
    latitude = JSON.parse(data.coordinates).latitude;
    longitude = JSON.parse(data.coordinates).longitude;
  } catch (err) {
    latitude = data.coordinates.latitude;
    longitude = data.coordinates.longitude;
  }

  let coord = [longitude, latitude];
  let arrayDeArray = new Array(coord);
  return arrayDeArray;
};
