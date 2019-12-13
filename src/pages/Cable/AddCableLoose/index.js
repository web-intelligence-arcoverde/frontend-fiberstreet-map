import React, { useState } from "react";

import { Creators as DropCreators } from "../../../redux/store/ducks/drop";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";
import { Creators as MapCreators } from "../../../redux/store/ducks/map";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Modal, Button, Container, Form } from "react-bootstrap/";

function AddCable(props) {
  const { newCable } = props.redux.cabo;

  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [fibra, setFibra] = useState(0);
  const [obs, setObs] = useState("");

  function hideModal() {
    const { hideNewCable, setDelimitation } = props;
    hideNewCable();
    setDelimitation("default");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { updateCableRequest, addCoordCabo } = props;
    let coordinates = props.redux.map.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1]
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);
    const { cableId } = props.redux.cabo;
    const cabo = {
      // name: nome,
      // type: modelo,
      coordinates: coordinatesStrinfigied,
      // fiberAmount: fibra,
      // obs: obs
    };
    // alert(JSON.stringify(cabo));
    // createCableRequest(cabo);
    updateCableRequest(cableId, cabo)
    hideModal();
    addCoordCabo([]);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Modal show={newCable.visible} onHide={hideModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header
            style={{
              justifyContent: "center",
              backgroundColor: "#F7D358",
              color: "#6c757d"
            }}
          >
            <Modal.Title>Adicionar cabo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome do cabo:</Form.Label>
              <Form.Control
                required
                value={nome}
                onChange={e => setNome(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Modelo do cabo:</Form.Label>
              <Form.Control
                required
                value={modelo}
                onChange={e => setModelo(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Observação:</Form.Label>
              <Form.Control
                required
                value={obs}
                onChange={e => setObs(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantidade de fibras:</Form.Label>
              <Form.Control
                required
                value={fibra}
                onChange={e => setFibra(e.target.value)}
                type="number"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={hideModal}>
              Sair
            </Button>
            <Button variant="secondary" type="submit">
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...CaboCreators, ...DropCreators, ...MapCreators },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCable);
