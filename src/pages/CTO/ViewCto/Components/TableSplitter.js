import React, { useState, useEffect } from "react";

//UI-Components
import { Form, Button, Modal, Table, Col } from "react-bootstrap";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import api from "../../../../services/api";

//Creators
import { Creators as SplitterActions } from "../../../../redux/store/ducks/splitter";
import { Creators as CtoActions } from "../../../../redux/store/ducks/ctos";

import StorageIcon from "@material-ui/icons/Storage";
import { Container } from "@material-ui/core";

function TableSplitter(props) {
  const { modalNewSplitter } = props.redux.splitter;

  const { data, visible } = props.redux.ctos.viewCto;

  const [splitters, setSplitters] = useState([]);
  const { hideViewModalCto } = props;

  console.log("informações da cto {splitter(id)}");
  console.log(data.id); //pegando o id da cto selecionada.

  useEffect(() => {
    function getSplitters(id) {
      api
        .get(`/splittercto/${id}`)
        .then(response => {
          const sp = response.data;
          setSplitters(sp);
          // getClientes(sp[0].id);
          // getCabosCto(id);
        })
        .catch(e => console.warn(e));
    }
    if (visible) getSplitters(data.id);
  }, [data.id, visible]);

  function handleAddSplitter() {
    const { showSplitterAddModal } = props;
    showSplitterAddModal(data.id);
  }

  const { viewSplitter } = props.redux.ctos;
  const { hideModalSplitter } = props;

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [balancing, setBalancing] = useState("");
  const [fib, setFib] = useState("");

  return (
    <Modal show={viewSplitter.visible} onHide={hideModalSplitter} size="lg">
      <Modal.Title
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F7D358",
          paddingTop: "15px",
          paddingBottom: "10px"
        }}
      >
        <h2>Informações do Splitter</h2>
        <StorageIcon fontSize="large" />
      </Modal.Title>
      <Modal.Body style={{ marginBottom: "20px" }}>
        <Container>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nome do splitter:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Modelo do Splitter</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Balanceamento:</Form.Label>
                <Form.Control type="number" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Fibra de alimentação:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Form.Row>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "40px"
              }}
            >
              <Button
                variant="secondary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
              <Button variant="secondary" style={{ marginRight: "10px" }}>
                Edit
              </Button>
              <Button variant="secondary">Remove</Button>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...SplitterActions,
      ...CtoActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSplitter);

function teste() {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Nome do splitter:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Modelo do Splitter</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Balanceamento:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Fibra de alimentação:</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Form.Row>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
        <Button variant="secondary">Edit</Button>
        <Button variant="secondary">Remove</Button>
      </div>
    </Form>
  );
}
