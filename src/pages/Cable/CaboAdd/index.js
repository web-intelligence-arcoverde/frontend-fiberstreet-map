import React, { useState } from "react";

//API
import { Creators as AllCreators } from "../../../redux/store/ducks/all";
import { Creators as DropCreators } from "../../../redux/store/ducks/drop";
import api from "../../../services/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";

//Components
import { Modal, Button, Container, Form } from "react-bootstrap/";

function CaboAdd(props) {
  const { modalCabo } = props.redux.all;

  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [fibra, setFibra] = useState(0);
  const TNAME = "nome";
  const TMODEL = "modelo";

  function handleHideModal() {
    const { hideAddCaboModal } = props;
    hideAddCaboModal();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let coordinates = props.redux.all.mapa.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1]
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);

    const cabo = {
      nome: nome,
      tipo: modelo,
      quantidade_fibras: fibra,
      coordenadas: coordinatesStrinfigied
    };
    const { addCoordCabo, hideAddCaboModal } = props;
    // addCoordCabo(null);
    // Irá para próxima etapa
    // await api
    //   .post("/cabo/add", cabo)
    //   .then(response => {
    //     console.tron.log(`API => Cabo/ADD: ${JSON.stringify(response)}`);
    //     alert("Cabo armazenado com suceso");
    //     setNome("");
    //     setModelo("");
    //     addCoordCabo([]);
    //     hideAddCaboModal();
    //   })
    //   .catch(err => console.tron.warn(`err -> API => Cabo/ADD: ${err}`));
    setNome("");
    setModelo("");
    addCoordCabo([]);
    hideAddCaboModal();
    const { showDropAddModalRequest } = props;
    const dropNdCtoId = {
      drop: cabo,
      cto_id: modalCabo.cto_id
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
      <Modal show={modalCabo.visible} onHide={handleHideModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Cabo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome do cabo:</Form.Label>
              <Form.Control
                value={nome}
                onChange={e => setNome(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Modelo do cabo:</Form.Label>
              <Form.Control
                value={modelo}
                onChange={e => setModelo(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantidade de fibras:</Form.Label>
              <Form.Control
                value={fibra}
                onChange={e => setFibra(e.target.value)}
                type="number"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Sair
            </Button>
            <Button variant="warning" type="submit" onClick={handleClose}>
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

// const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...AllCreators, ...DropCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaboAdd);