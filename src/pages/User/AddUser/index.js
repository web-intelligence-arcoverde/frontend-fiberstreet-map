import React, { useState } from "react";

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

  const [email, setEmail] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal
      show={viewNewUser.visible}
      onHide={hideModalNewUser}
      animation={false}
    >
      <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
        <Modal.Title>Cadastrar Funcionario</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Insira o e-mail do funcionario:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              minLength="2"
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalNewUser}>
            Fechar
          </Button>
          {email.length > 5 ? (
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          ) : (
            console.log("teste")
          )}
        </Modal.Footer>
      </Form>
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
