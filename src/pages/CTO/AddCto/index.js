import React, { useState, useEffect } from "react";

import "./styles.css";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as ctoCreators } from "../../../redux/store/ducks/ctos";

//UI-Components
import { Modal, Button, Form } from "react-bootstrap";

//  Vamos fazer aqui uma renderização condicional
//  para ADIÇÃO/AMOSTRAGEM de imagens

function AddNewCto(props) {
  const { HideNewViewModalCto } = props;
  const { viewNewCto } = props.redux.ctos;

  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState("");
  //   JSON.stringify(props.redux.all.coordenadas)
  // );
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
  }

  return (
    <Modal
      show={viewNewCto.visible}
      onHide={HideNewViewModalCto}
      style={{ overflow: "scroll" }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
          <Modal.Title>Cadastrar do CTO</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome CTO:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Observações:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={HideNewViewModalCto}>Fechar</Button>

          <Button type="submit">Salvar</Button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewCto);
