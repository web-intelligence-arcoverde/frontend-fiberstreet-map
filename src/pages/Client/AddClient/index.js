import React, { useState } from "react";

//Conectores dos Creators
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators {reducers}
import { Creators as ClientActions } from "../../../redux/store/ducks/cliente";

//Components;
import { Modal, Button, Form } from "react-bootstrap";

function ClienteAddModal(props) {
  const { viewNewClient } = props.redux.client;

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const [plano, setPlano] = useState("");
  const [address, setAddress] = useState("");
  const [PPPOE, setPPPOE] = useState("");
  const [obs, setObs] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const { coordinates } = props.redux.client.viewNewClient;
    const { createClientRequest } = props;
    const newClient = {
      name: name,
      coordinates: coordinates,
      cpf: cpf,
      speed: plano,
      pppoe: PPPOE,
      address: address,
      obs: obs,
      status: null
    };
    createClientRequest(newClient);
    console.log(newClient);
    handleHideModal();
  }

  function handleHideModal() {
    const { hideNewModalClient } = props;
    hideNewModalClient();
    setName("");
    setCpf("");
    setPlano("");
    setAddress("");
    setPPPOE("");
    setObs("");
  }

  return (
    <>
      <Modal show={viewNewClient.visible} onHide={handleHideModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header
            style={{
              justifyContent: "center",
              backgroundColor: "#F7D358",
              color: "#585858"
            }}
          >
            <Modal.Title>Cadastrar Cliente</Modal.Title>
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
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                required
                type="text"
                maxLength="18"
                minLength="14"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
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
              <Form.Label>Planos:</Form.Label>
              <Form.Control
                required
                type="text"
                as="select"
                value={plano}
                onChange={e => setPlano(e.target.value)}
              >
                <option></option>
                <option>60</option>
                <option>100</option>
                <option>250</option>
                <option>300</option>
                <option>400</option>
                <option>500</option>
                <option>1</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>PPPOE:</Form.Label>
              <Form.Control
                required
                type="text"
                minLength="5"
                maxLength="100"
                value={PPPOE}
                onChange={e => setPPPOE(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Observações:</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="3"
                minLength="10"
                maxLength="255"
                value={obs}
                onChange={e => setObs(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleHideModal}>
              Fechar
            </Button>

            <Button variant="secondary" type="submit">
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
  bindActionCreators(ClientActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteAddModal);
