import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";

Modal.setAppElement(document.getElementById("root"));

function ClienteAddModal(props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  function handleHideModal() {}

  return (
    <Modal
      isOpen={false}
      onRequestClose={handleHideModal}
      contentLabel="Adicionar novo cliente"
      className="modal-container"
      overlayClassName="modal-overlay"
    />
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const mapStateToProps = state => ({
  redux: state
});

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(ClienteAddModal);
