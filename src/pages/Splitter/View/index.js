import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap/";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as splitterCreators } from "../../../redux/store/ducks/splitter";
import { Creators as ctosActions } from "../../../redux/store/ducks/ctos";

function Splitter(props) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [balancing, setBalancing] = useState("");

  const { show } = props.redux.splitter;
  console.log(show);
  console.log("informações");

  function hide() {
    const { hideModalSplitter } = props;
    hideModalSplitter();
  }
  return (
    <Modal show={show.visible} size="lg">
      <Modal.Header
        style={{
          justifyContent: "center",
          backgroundColor: "#ffc107",
          color: "#6c757d"
        }}
      >
        <Modal.Title>Informações</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome Splitter:</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              required
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Balanceamento:</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Quantidade de saidas do splitter"
              value={balancing}
              onChange={e => setBalancing(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={hide}>
            Fechar
          </Button>
          <Button variant="secondary" type="submit">
            Atualizar
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
  bindActionCreators({ ...ctosActions, ...splitterCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splitter);
