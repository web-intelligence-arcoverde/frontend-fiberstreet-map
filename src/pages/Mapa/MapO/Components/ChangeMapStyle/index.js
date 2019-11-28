import React, { useState } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";

import { Container, Bottom, Widge } from "./styles.js";

import { Image } from "react-bootstrap/";

import map from "./Images/mapa.png";
import satelite from "./Images/satelite.png";

function ChangeMapStyle(props) {
  const [change, setChange] = useState(false);

  const { setMapStyle } = props;

  function changeImage() {
    if (change === false) {
      setMapStyle("streets-v11");
      setChange(!change);
    } else {
      setMapStyle("satellite-v9");
      setChange(!change);
    }
    console.log(props);
  }

  return (
    <Container>
      <Bottom>
        <Widge onClick={changeImage}>
          {change === false ? (
            <Image src={satelite} fluid />
          ) : (
            <Image src={map} fluid />
          )}
        </Widge>
      </Bottom>
    </Container>
  );
}

const mapStateToProps = state => ({ redux: state });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMapStyle);
