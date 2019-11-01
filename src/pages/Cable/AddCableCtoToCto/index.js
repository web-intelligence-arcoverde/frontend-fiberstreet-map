import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";

//Components
import { Modal, Form, Col, Button } from "react-bootstrap/";
import CloseIcon from "@material-ui/icons/Close";

function ViewCableCtoToCto(props) {
  const { hideModalCtoToCto } = props;

  const { visible } = props.redux.cabo.idCtos;

  console.log("Informações");
  console.log(props.redux);

  return (
    <Modal size="lg" onHide={hideModalCtoToCto} show={visible}>
      <Modal.Header
        style={{
          justifyContent: "center",
          fontSize: "30px",
          backgroundColor: "#F7D358",
          paddingTop: "15px",
          paddinBottom: "15px"
        }}
      >
        <Modal.Title>Adicionar fusão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Bandeja</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form.Row>

          <div
            style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}
          >
            <Form.Row
              style={{
                display: "block",
                width: "50%",
                marginRight: "15px",
                padding: "15px"
              }}
            >
              <Form.Group as={Col}>
                <Form.Label>Cabo</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fibra</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <div
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                width: "50px"
              }}
            >
              <Button variant="secondary">
                <CloseIcon />
              </Button>
            </div>

            <Form.Row
              style={{
                display: "block",
                width: "50%",
                marginLeft: "15px",
                padding: "15px"
              }}
            >
              <Form.Group as={Col}>
                <Form.Label>Cabo</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fibra</Form.Label>
                <Form.Control as="select">
                  <option></option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          >
            <Button variant="secondary" type="submit" style={{ width: "100%" }}>
              Adicionar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CaboCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCableCtoToCto);
