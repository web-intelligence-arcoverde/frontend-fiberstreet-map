import React, { useState } from "react";

//Components
import { Modal, Form, Button } from "react-bootstrap";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as ceoCreators } from "../../../redux/store/ducks/ceo";

function AddCeo(props) {
  const { HideNewViewModal } = props;
  const { viewNewCeo } = props.redux.ceo;

  const [model, setModel] = useState("");
  const [coordinates, setCoordinates] = useState("");
  //   JSON.stringify(props.redux.all.coordenadas)
  // );
  const [observacao, setObservacao] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");

  async function handleCeo(e) {
    // e.preventDefault();

    const newCeo = {
      type: type,
      coordinates: coordinates,
      model: model,
      address: address,
      obs: observacao
    };
  }

  return (
    <Modal
      show={viewNewCeo.visible}
      onHide={HideNewViewModal}
      style={{ overflow: "scroll" }}
    >
      <Form>
        <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
          <Modal.Title>Cadastrar da CEO</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipo:</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
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
          <Button style={{ backgroundColor: "#0174DF" }}>Fechar</Button>

          <Button style={{ backgroundColor: "#0174DF" }} type="submit">
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
  bindActionCreators({ ...ceoCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCeo);
