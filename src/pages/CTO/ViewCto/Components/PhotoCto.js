import React, { useState } from "react";
import { Modal, Image } from "react-bootstrap/";

//Creators do redux
import { Creators as ctosActions } from "../../../../redux/store/ducks/ctos";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function ViewPhoto(props) {
  return (
    <Modal
      show={props.redux.ctos.viewPhoto.visible}
      onHide={props.hideModalPhoto}
    >
      <Image src="caminho da img" fluid></Image>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPhoto);
