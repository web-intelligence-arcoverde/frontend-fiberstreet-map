import React, { useState } from 'react';
import { Modal } from '@material-ui/core';

// Creators do redux

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ctosActions } from '../../../../redux/store/ducks/ctos';

function ViewPhoto(props) {
  return (
    <Modal
      show={props.redux.ctos.viewPhoto.visible}
      onHide={props.hideModalPhoto}
    >
      <img src="caminho da img" fluid />
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhoto);
