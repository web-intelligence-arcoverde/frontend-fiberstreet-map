import React from "react";

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

  function handleHideModal() {
    const { hideNewModalClient } = props;
    hideNewModalClient();
  }

  return (
    <>
      <Modal
        show={viewNewClient.visible}
        onHide={handleHideModal}
        animation={false}
      >
        <Form>
          <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
            <Modal.Title>Cadastro de Cliente</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome:</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label>CPF:</Form.Label>
              <Form.Control type="number" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Planos:</Form.Label>
              <Form.Control type="text" as="select">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>PPPOE:</Form.Label>
              <Form.Control type="text" />
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
