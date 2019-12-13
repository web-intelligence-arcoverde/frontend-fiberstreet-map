import React from "react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";
import { Creators as CablesCreators } from "../../../../../redux/store/ducks/cabo";

import { ButtonGroup, Button } from "react-bootstrap/";

import { Container, Bottom } from "./styles";

function IconsDrawn(props) {
  const { hideIcons, setDelimitation, addCoordCabo, showNewCable } = props;
  const { polyline } = props.redux.map;
  const { map } = props;

  function remove() {
    if (polyline.length > 1) {
      polyline.pop();
      updateDrawn(map, polyline);
    }
  }

  function reset() {
    var polyline = [];
    addCoordCabo(polyline);
    updateDrawn(map, polyline);
  }

  function save() {
    // showNewCable();
    const { cable, drawType } = props.redux.cabo;

    let coordinates = polyline.map(line => {
      return {
        longitude: line[0],
        latitude: line[1]
      };
    });
    // Verify if is draw or redraw
    // If is redraw, [...oldCoords, ...newCoords]
    if (drawType === "DRAW") {
      let { coordinates: oldCoords } = cable;
      oldCoords = JSON.parse(oldCoords);
      coordinates = oldCoords.concat(coordinates);
    }

    coordinates = JSON.stringify(coordinates);
    const { updateCableRequest } = props;
    updateCableRequest(cable.id, { coordinates });
    reset();
  }

  function updateDrawn(map, polyline) {
    map.getSource("linhas").setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: polyline
      }
    });
  }
  return (
    <Container>
      <Bottom>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="warning"
            size="lg"
            onClick={() => {
              setDelimitation("default");
              hideIcons();
              save();
            }}
          >
            <i className="fa fa-save" style={{ color: "white" }}></i>
          </Button>
          <Button variant="warning" size="lg" onClick={remove}>
            <i className="fa fa-undo" style={{ color: "white" }}></i>
          </Button>
          <Button
            variant="warning"
            size="lg"
            onClick={() => {
              setDelimitation("default");
              reset();
              hideIcons();
            }}
          >
            <i className="fa fa-trash" style={{ color: "white" }}></i>
          </Button>
        </ButtonGroup>
      </Bottom>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...MapCreators, ...CablesCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IconsDrawn);
