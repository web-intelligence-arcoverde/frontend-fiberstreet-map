import React, { useState } from "react";

//Components Importados
import { Container, Col, Button, Form } from "react-bootstrap/";
import ViewPhoto from "./PhotoCto";

//Creators do redux
import { Creators as ctosActions } from "../../../../redux/store/ducks/ctos";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Components(props) {
  const { showModalPhoto } = props;
  const { ctos } = props.redux;
  const { viewCto } = ctos;
  const { data } = viewCto;

  const [name, setName] = useState(data.name);
  const [model, setModel] = useState(data.model);
  const [address, setAddress] = useState(data.address);
  const [obs, setObs] = useState(data.obs);

  const [status, setStatus] = useState(null);

  //Atualizar CTO
  function handleSubmit(e) {
    e.preventDefault();
    const { updateCtoRequest } = props;
    const updateCto = {
      name: name,
      model: model,
      address: address,
      obs: obs,
      status: status
    };
    updateCtoRequest(updateCto, data.id);
  }

  //Deletar CTO
  function deleteCto() {
    const { deleteCtoRequest } = props;
    deleteCtoRequest(data.id);
  }

  function openPhoto() {
    showModalPhoto();
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>Ativa</option>
              <option>Lotada</option>
              <option>Cliente cancelado</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Endereço:</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Observação:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={obs}
              onChange={e => setObs(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <>
            {status !== null ? (
              <Button variant="primary" style={{ marginRight: "10px" }}>
                Mostrar Foto
              </Button>
            ) : (
              <Button
                variant="primary"
                style={{ marginRight: "10px" }}
                onClick={showModalPhoto}
              >
                Adicionar Foto
              </Button>
            )}
          </>

          <Button variant="info" style={{ marginRight: "10px" }} type="submit">
            Atualizar dados
          </Button>
          <Button variant="danger" onClick={deleteCto}>
            Excluir
          </Button>
        </div>
      </Form>
      <ViewPhoto />
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Components);
