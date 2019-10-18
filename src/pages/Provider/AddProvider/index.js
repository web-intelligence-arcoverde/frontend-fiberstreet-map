import React, { useState } from "react";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as actionProvider } from "../../../redux/store/ducks/provider";

//Components UI
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddProvider(props) {
  const { hideModalNewProvider } = props;

  const { viewNewProvider } = props.redux.provider;

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cnpjUnmasked, setCnpjUnmasked] = useState("");
  const [address, setAddress] = useState("");
  const [validated, setValidated] = useState(false);

  function validateForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (validated === true) {
      handleCeo(event);
    }
  }

  function handleCeo(e) {
    e.preventDefault();
    const newProvider = {
      name: name,
      cnpj: cnpjUnmasked,
      address: address
    };

    hideModalNewProvider();
    setName("");
    setCnpj("");
    setAddress("");
  }

  function cpfCnpj(v) {
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");
    //CNPJ
    //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    //Coloca um hífen depois do bloco de quatro dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    return v;
  }

  return (
    <Modal show={viewNewProvider.visible} onHide={hideModalNewProvider}>
      <Form onSubmit={handleCeo}>
        <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
          <Modal.Title>Cadastrar Provedor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              minLength="15"
              maxLength="255"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>CNPJ</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="18"
              minLength="18"
              value={cnpj}
              onChange={e => {
                setCnpjUnmasked(e.target.value);
                setCnpj(cpfCnpj(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Endereco</Form.Label>
            <Form.Control
              required
              minLength="20"
              maxLength="255"
              type="text"
              onChange={e => {
                setAddress(e.target.value);
              }}
              value={address}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalNewProvider}>
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
  bindActionCreators({ ...actionProvider }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProvider);
