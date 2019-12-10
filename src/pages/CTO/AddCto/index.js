import React, { useState } from "react";

//Redux connect Actions
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as ctoCreators } from "../../../redux/store/ducks/ctos";

//UI-Components
import { Modal, Button, Form } from "react-bootstrap";

function AddNewCto(props) {
  const { HideNewViewModalCto } = props;
  const { visible } = props.redux.ctos.viewNewCto;

  const [name, setName] = useState("");
  const [observacao, setObservacao] = useState("");
  const [model, setModel] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newCto = {
      name: name,
      coordinates: props.redux.ctos.viewNewCto.coordinates,
      model: model,
      address: address,
      obs: observacao
    };

    const { createCtoRequest } = props;

    createCtoRequest(newCto);

    hideModal();
  }

  function hideModal() {
    HideNewViewModalCto();
    setName("");
    setAddress("");
    setModel("");
    setObservacao("");
  }

  return (
    <Modal show={visible} onHide={hideModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header
          style={{
            justifyContent: "center",
            backgroundColor: "#ffc107",
            color: "#6c757d"
          }}
        >
          <Modal.Title>Caixa Terminal Óptica</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="150"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="150"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="50"
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Observações:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="255"
              as="textarea"
              rows="3"
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={hideModal}>
            Fechar
          </Button>

          <Button variant="secondary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctoCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCto);
