import React from "react";

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

  return (
    <Modal
      animation={false}
      show={viewNewProvider.visible}
      onHide={hideModalNewProvider}
    >
      <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
        <Modal.Title>Cadastrar Provedor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>CNPJ</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Endereco</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hideModalNewProvider}>
          Fechar
        </Button>
        <Button variant="primary">Salvar</Button>
      </Modal.Footer>
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
