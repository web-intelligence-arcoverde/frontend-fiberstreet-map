import React, { useEffect, useState } from "react";
import { Button, Form, Container } from "./styles";
import Modal from "react-modal";

import api from "../../../services/api";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../../redux/store/actions/all";

Modal.setAppElement(document.getElementById("root"));

function SpAddModal(props) {
  const { modalSplitter } = props.redux.all;
  // nome modelo balanceamento cto ceo fibraalimentacao
  const [nome, setNome] = useState("");
  const [balanceamento, setBalanceamento] = useState("");
  const [ctoId, setCtoId] = useState("");
  const [ceoId, setCeoId] = useState("");
  const [id, setId] = useState("");
  const [fibra, setFibra] = useState("");
  const [modelo, setModelo] = useState("");
  const [type, setType] = useState("cto");
  const TNAME = "nome";
  const TBAL = "balanceamento";
  const TMODEL = "modelo";
  const TADDRESS = "address";

  function handleHideModal() {
    const { hideSplitterAddModal } = props;
    hideSplitterAddModal();
  }

  async function handleSplitter() {
    const newSp = {
      nome: nome,
      balanceamento: balanceamento,
      modelo: modelo
    };

    if (type === "cto") {
      api
        .post(`/create/splitter/${modalSplitter.id}`, newSp)
        .then(e => console.log(e))
        .catch(e => console.warn(e));
    } else if (type === "ceo") {
    }

    const { showDataInViewModal, hideSplitterAddModal } = props;
    hideSplitterAddModal();
    showDataInViewModal(modalSplitter.id);
  }

  function handleChange(event, mode) {
    const { value } = event.target;

    switch (mode) {
      case TNAME:
        setNome(value);
        break;
      case TBAL:
        setBalanceamento(value);
        break;
      case TMODEL:
        setModelo(value);
        break;
    }
  }

  return (
    <Modal
      isOpen={modalSplitter.visible}
      onRequestClose={handleHideModal}
      contentLabel="Adicionar Splitter"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Container>
        <Form>
          <label for="spName">Nome Splitter</label>
          <input
            id="spName"
            value={nome}
            type="text"
            name="nome"
            placeholder="Insira o nome do Splitter"
            required
            onChange={e => handleChange(e, TNAME)}
          />

          <label for="modelo">Modelo</label>
          <input
            id="modelo"
            value={modelo}
            type="text"
            name="modelo"
            placeholder="Modelo"
            required
            onChange={e => handleChange(e, TMODEL)}
          />

          <label for="balanceamento">Balanceamento</label>
          <input
            id="balanceamento"
            value={balanceamento}
            type="text"
            name="balanceamento"
            placeholder="Balanceamento"
            required
            onChange={e => handleChange(e, TBAL)}
          />
          <hr />
          <Button onClick={handleSplitter}>Adicionar</Button>
        </Form>
      </Container>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpAddModal);
