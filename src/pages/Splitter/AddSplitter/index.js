import React, { useState } from "react";

//API
import api, { API } from "../../../services/api";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as splitterCreators } from "../../../redux/store/ducks/splitter";

//Componentes
import { Modal, Container, Button, Form } from "react-bootstrap/";

function AddNewSplitter(props) {
  const { hideSplitterAddModal } = props;
  const { modalNewSplitter } = props.redux.splitter;

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [balancing, setBalancing] = useState("");

  function handleHideModal() {
    const { hideSplitterAddModal } = props;
    hideSplitterAddModal();
  }

  async function handleSplitter(e) {
    e.preventDefault();

    const { cto_id } = props.redux.splitter.modalNewSplitter;
    const newSplitter = {
      name: name,
      balancing: balancing,
      model: model,
      cto_id
    };

    const { createSplitterRequest } = props;
    await createSplitterRequest(newSplitter);
    handleHideModal();
  }

  return (
    <Container>
      <Modal show={modalNewSplitter.visible} onHide={handleHideModal}>
        <Modal.Header style={{ justifyContent: "center", color: "#FFBF00" }}>
          <Modal.Title>Adicionar splitter</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSplitter}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome Splitter:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo:</Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Balanceamento:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantidade de saidas do splitter"
                value={balancing}
                onChange={e => setBalancing(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleHideModal}>
              Fechar
            </Button>
            <Button variant="warning" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...splitterCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewSplitter);
