import React, { useState } from "react";

import { Creators as DropCreators } from "../../../redux/store/ducks/drop";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";
import { Creators as MapCreators } from "../../../redux/store/ducks/map";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Modal, Button, Container, Form } from "react-bootstrap/";

function CaboAdd(props) {
  const { newCabo } = props.redux.cabo;

  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [fibra, setFibra] = useState(0);
  const TNAME = "nome";
  const TMODEL = "modelo";

  function handleHideModal() {
    const { hideAddCableCto } = props;
    hideAddCableCto();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let coordinates = props.redux.map.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1]
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);

    const cabo = {
      name: nome,
      type: modelo,
      fiberAmount: fibra,
      coordinates //: coordinatesStrinfigied
    };
    const { addCoordCabo } = props;
    setNome("");
    setModelo("");
    addCoordCabo([]);
    handleHideModal();
    const { showDropAddModalRequest } = props;
    const dropNdCtoId = {
      drop: cabo,
      cto_id: newCabo.ctoId
    };
    showDropAddModalRequest(dropNdCtoId);
  }

  function handleChange(event, mode) {
    const { value } = event.target;

    switch (mode) {
      case TNAME:
        setNome(value);
        break;
      case TMODEL:
        setModelo(value);
        break;
      case "QTFIBRA":
        setFibra(value);
        break;
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Modal show={newCabo.isVisible} onHide={handleHideModal}>
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
            <Button variant="danger" onClick={handleClose}>
              Sair
            </Button>
            <Button variant="secondary" type="submit" onClick={handleClose}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaboAdd);
