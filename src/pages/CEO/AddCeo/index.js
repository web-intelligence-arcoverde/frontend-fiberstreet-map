import React, { useState, useEffect } from "react";

//Components
import { Modal, Form, Button } from "react-bootstrap";

//Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as ceoCreators } from "../../../redux/store/ducks/ceo";

function AddCeo(props) {
  const { HideNewViewModalCeo, createCeoRequest } = props;
  const { viewNewCeo } = props.redux.ceo;

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [observacao, setObservacao] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    if (viewNewCeo.visible) {
      setClickable(true);
    }
  }, [viewNewCeo.visible]);

  async function handleCeo(e) {
    // e.preventDefault();
    if (clickable) {
      await setClickable(false);
      const newCeo = await {
        name,
        type,
        coordinates: await viewNewCeo.coordinates,
        model,
        address,
        obs: observacao
      };
      await setName("");
      await setModel("");
      await setType("");
      await setAddress("");
      await setObservacao("");
      await HideNewViewModalCeo();

      await createCeoRequest(newCeo);
    }
  }

  return (
    <Modal show={viewNewCeo.visible} onHide={HideNewViewModalCeo}>
      <Form>
        <Modal.Header
          style={{
            justifyContent: "center",
            backgroundColor: "#ffc107",
            color: "#6c757d"
          }}
        >
          <Modal.Title>Cadastrar Caixa de Emenda Óptica</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="150"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipo:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              type="text"
              value={type}
              onChange={e => setType(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="200"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Observações:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="200"
              as="textarea"
              rows="3"
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={HideNewViewModalCeo}>
            Fechar
          </Button>

          <Button variant="secondary" onClick={handleCeo}>
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
  bindActionCreators({ ...ceoCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCeo);
