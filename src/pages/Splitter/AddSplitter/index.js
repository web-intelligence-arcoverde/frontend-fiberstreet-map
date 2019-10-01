import React, { useEffect, useState } from "react";

//API
import api, { API } from "../../../services/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../../redux/store/actions/all";

//Componentes
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SpAddModal(props) {
  const { splitter } = props.redux;

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

  async function handleSplitter(e) {
    e.preventDefault();
    const newSp = {
      name: nome,
      balancing: balanceamento,
      model: modelo
    };

    if (type === "cto") {
      api
        .post(`${API.CREATE_SPLITTER}/${splitter.id}`, newSp)
        .then(e => console.log(e))
        .catch(e => console.warn(e));
    } else if (type === "ceo") {
    }

    const {
      showDataInViewModal,
      hideSplitterAddModal,
      hideDataInViewModal
    } = props;
    hideSplitterAddModal();
    showDataInViewModal(splitter.id);

    hideDataInViewModal();
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
    <Container>
      <Modal show={splitter.visible} onHide={handleHideModal}>
        <Modal.Header style={{ justifyContent: "center", color: "#FFBF00" }}>
          <Modal.Title>Adicionar splitter</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSplitter}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome Splitter:</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={e => handleChange(e, TNAME)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo:</Form.Label>
              <Form.Control
                type="text"
                value={modelo}
                onChange={e => handleChange(e, TMODEL)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Balanceamento:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantidade de saidas do splitter"
                value={balanceamento}
                onChange={e => handleChange(e, TBAL)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleHideModal}>
              Fechar
            </Button>
            <Button variant="warning" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
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
