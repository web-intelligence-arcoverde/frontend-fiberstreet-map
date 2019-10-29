import React, { useState } from "react";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as splitterCreators } from "../../../redux/store/ducks/splitter";
import { Creators as ctosActions } from "../../../redux/store/ducks/ctos";

//Componentes
import { Modal, Container, Button, Form } from "react-bootstrap/";

function AddNewSplitter(props) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [balancing, setBalancing] = useState("");

  const { splitter } = props.redux; //Dados do splitter
  const { data } = props.redux.ctos.viewCto; //Dados da cto
  const { hideViewModalCto } = props;
  const { hideSplitterAddModal } = props;

  async function handleSplitter(e) {
    e.preventDefault();
    const { createSplitterRequest } = props;
    const newSplitter = {
      name: name,
      balancing: balancing,
      model: model,
      cto_id: data.id
    };
    createSplitterRequest(newSplitter);
    hideSplitterAddModal();
    hideViewModalCto();
  }

  function closeModal() {
    hideSplitterAddModal();
  }

  return (
    <Container>
      <Modal
        show={splitter.modalNewSplitter.visible}
        onHide={closeModal}
        size="lg"
      >
        <Modal.Header style={{ justifyContent: "center", color: "#FFBF00" }}>
          <Modal.Title>Adicionar splitter</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSplitter}>
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
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
            <Button variant="secondary" type="submit">
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
  bindActionCreators({ ...ctosActions, ...splitterCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewSplitter);
