import React from "react";

import "./styles.css";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as ctoCreators } from "../../../redux/store/ducks/ctos";

//UI-Components
import { Modal, Button, Form } from "react-bootstrap";

//  Vamos fazer aqui uma renderização condicional
//  para ADIÇÃO/AMOSTRAGEM de imagens

function AddNewCto(props) {
  const { HideNewViewModal } = props;

  const { viewNewCto } = props.redux.ctos;

  return (
    <Modal
      show={viewNewCto.visible}
      onHide={HideNewViewModal}
      style={{ overflow: "scroll" }}
    >
      <Form>
        <Modal.Header style={{ justifyContent: "center", color: "#ffc107" }}>
          <Modal.Title>Cadastrar do CTO</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome CTO:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Modelo:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#0174DF" }}
            onClick={HideNewViewModal}
          >
            Fechar
          </Button>

          <Button style={{ backgroundColor: "#0174DF" }} type="submit">
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
  bindActionCreators({ ...ctoCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewCto);
