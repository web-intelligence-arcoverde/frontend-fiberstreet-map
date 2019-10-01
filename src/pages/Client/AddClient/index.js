import React, { useState } from "react";

//Conectores dos Creators
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators {reducers}
import { Creators as clientCreators } from "../../../redux/store/ducks/cliente";

//UI-Components
import { Modal, Button, Form } from "react-bootstrap";
import "./styles.css";

// Vamos fazer aqui uma renderização condicional para ADIÇÃO/AMOSTRAGEM de imagens

function ClienteAddModal(props) {
  const { viewNewClient } = props.redux.client;

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [plano, setPlano] = useState("");
  const [address, setAddress] = useState("");
  const [PPPOE, setPPPOE] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [observacao, setObservacao] = useState("");

  async function handleClient(e) {
    const newClient = {
      name: name,
      coordinates: coordinates,
      cpf: cpf,
      speed: plano,
      pppoe: PPPOE,
      address: address,
      obs: observacao
    };
  }

  function handleHideModal() {
    const { hideNewModalClient } = props;
    hideNewModalClient();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { createClienteRequest } = props;
    createClienteRequest();
    handleHideModal();
  }

  return (
    <>
      <Modal
        show={viewNewClient.visible}
        onHide={handleHideModal}
        animation={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
            <Modal.Title>Cadastro de Cliente</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                type="text"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
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
              <Form.Label>Planos:</Form.Label>
              <Form.Control
                type="text"
                as="select"
                value={plano}
                onChange={e => setPlano(e.target.value)}
              >
                <option>10</option>
                <option>20</option>
                <option>100</option>
                <option>250</option>
                <option>500</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>PPPOE:</Form.Label>
              <Form.Control
                type="text"
                value={PPPOE}
                onChange={e => setPPPOE(e.target.value)}
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
            <Button
              style={{ backgroundColor: "#0174DF" }}
              onClick={handleHideModal}
            >
              Fechar
            </Button>

            <Button style={{ backgroundColor: "#0174DF" }} type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...clientCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteAddModal);
