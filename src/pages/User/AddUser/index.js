import React from "react";

//Conectors
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Reducers
import { Creators as actionsUser } from "../../../redux/store/ducks/user";

//Components UI
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddUser(props) {
  const { hideModalNewUser } = props;
  const { viewNewUser } = props.redux.user;

  console.log(props);

  return (
    <Modal
      show={viewNewUser.visible}
      onHide={hideModalNewUser}
      animation={false}
    >
      <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
        <Modal.Title>Cadastrar Funcionario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label>Insira o e-mail do funcionario:</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hideModalNewUser}>
          Fechar
        </Button>
        <Button variant="primary" onClick={hideModalNewUser}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionsUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
