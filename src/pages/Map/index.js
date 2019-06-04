import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const TOKEN =
  "pk.eyJ1IjoidWxpbmt1eCIsImEiOiJjanczamF5cG8wNWt0NDltcnkydXQybGdjIn0.F1PkG0rCiHhf-jhnRMMdTg";

class Maps extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -27.2108001,
      longitude: -49.6446024,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    },
    markers: [],
    latitude: "",
    longitude: ""
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.addEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleMapClick = e => {
    const [longitude, latitude] = e.lngLat;
    // this.setState({ latitude, longitude });
    this.setState({
      markers: [...this.state.markers, { latitude, longitude }]
    });
    alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };

  renderVariousMarkers() {
    return this.state.markers.map((marker, index) => (
      <Marker
        key={index}
        latitude={marker.latitude}
        longitude={marker.longitude}
        onClick={this.handleMapClick}
        captureClick={true}
      >
        <img
          style={{
            borderRadius: 100,
            width: 48,
            height: 48
          }}
          src="https://avatars2.githubusercontent.com/u/2254731?v=4"
        />
      </Marker>
    ));
  }

  renderMarker() {
    if (this.state.latitude != "") {
      return (
        <Marker
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          onClick={this.handleMapClick}
          captureClick={true}
        >
          <img
            style={{
              borderRadius: 100,
              width: 48,
              height: 48
            }}
            src="https://avatars2.githubusercontent.com/u/2254731?v=4"
          />
        </Marker>
      );
    }
  }

  render() {
    const { containerWidth: width, containerHeight: height } = this.props;

    return (
      <Container>
        <ReactMapGL
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          onClick={this.handleMapClick}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => {
            this.setState({ viewport });
            this._resize();
          }}
        >
          {/* {this.renderMarker()} */}
          {this.renderVariousMarkers()}

          <Button />
          <div style={{ position: "absolute", right: 5, top: 5 }}>
            <NavigationControl />
          </div>
        </ReactMapGL>
      </Container>
    );
  }
}

const DimensionedMap = Dimensions()(Maps);

const Map = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default Map;
