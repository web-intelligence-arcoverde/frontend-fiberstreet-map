import React, { useState } from "react";

//Conectores dos Creators
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators {reducers}
import { Creators as ClientActions } from "../../../redux/store/ducks/cliente";

//UI-Components
import { Modal, Button, Form } from "react-bootstrap";
import "./styles.css";

// Vamos fazer aqui uma renderização condicional para ADIÇÃO/AMOSTRAGEM de imagens

function ClienteAddModal(props) {
  const { viewNewClient } = props.redux.client;

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfUnmasked, setCpfUnmasked] = useState("");
  const [plano, setPlano] = useState("");
  const [address, setAddress] = useState("");
  const [PPPOE, setPPPOE] = useState("");
  const [obs, setObs] = useState("");

  function handleHideModal() {
    const { hideNewModalClient } = props;
    hideNewModalClient();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { coordinates } = props.redux.client.viewNewClient;

    const { createClientRequest } = props;
    const newClient = {
      name: name,
      coordinates: coordinates,
      cpf: cpfUnmasked,
      speed: plano,
      pppoe: PPPOE,
      address: address,
      obs: obs
    };
    createClientRequest(newClient);
    handleHideModal();
  }

  function cpfCnpj(v) {
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");
    if (v.length <= 11) {
      //CPF
      //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      //Coloca um hífen entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (v.length <= 14) {
      //CNPJ
      //Coloca ponto entre o segundo e o terceiro dígitos
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      //Coloca ponto entre o quinto e o sexto dígitos
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      //Coloca uma barra entre o oitavo e o nono dígitos
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      //Coloca um hífen depois do bloco de quatro dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return v;
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
                maxlength="18"
                value={cpf}
                onChange={e => {
                  setCpfUnmasked(e.target.value);
                  setCpf(cpfCnpj(e.target.value));
                }}
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
                value={obs}
                onChange={e => setObs(e.target.value)}
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
          {/* <input
            hidden
            value={props.redux.viewNewClient.coordinates}
            required
          /> */}
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
