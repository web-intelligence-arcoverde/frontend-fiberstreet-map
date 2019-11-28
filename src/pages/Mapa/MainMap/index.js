import React from "react";
import MapO from "../MapO";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

function MainMap() {
  return (
    <>
      <MapO
        container="map"
        zoom={14}
        classNameStyle="mapContainer"
        style="mapbox://styles/mapbox/streets-v11"
        accessToken={TOKEN}
      />
    </>
  );
}

export default MainMap;
