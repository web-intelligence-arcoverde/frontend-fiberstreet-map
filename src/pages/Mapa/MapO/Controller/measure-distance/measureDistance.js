import lineDistance from "turf-line-distance";

var linestring = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: []
  }
};

export const measureDistance = (map, distanceContainer, geojson) => {
  map.on("mouseup", function(e) {
    if (e.originalEvent.button === 2) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ["measure-points"]
      });
      if (geojson.features.length > 1) {
        geojson.features.pop();
      }

      distanceContainer.innerHTML = "";
      if (features.length) {
        var id = features[0].properties.id;
        geojson.features = geojson.features.filter(function(point) {
          return point.properties.id !== id;
        });
      } else {
        var point = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [e.lngLat.lng, e.lngLat.lat]
          },
          properties: {
            id: String(new Date().getTime())
          }
        };
        geojson.features.push(point);
      }
      if (geojson.features.length > 1) {
        linestring.geometry.coordinates = geojson.features.map(function(point) {
          return point.geometry.coordinates;
        });
        geojson.features.push(linestring);

        var value = document.createElement("pre");
        value.textContent =
          "Distancia total: " +
          lineDistance(linestring, "kilometers").toLocaleString() +
          "km";
        distanceContainer.appendChild(value);
      }
      map.getSource("geojson").setData(geojson);
    }
  });
};
