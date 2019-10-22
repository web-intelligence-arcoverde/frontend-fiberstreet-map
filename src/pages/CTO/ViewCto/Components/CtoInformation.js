import React, { useState } from "react";

//Components Importados
import { Container, Col, Button, Form } from "react-bootstrap/";

//Icons
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Components(props) {
  const { ctos } = props.info.redux;
  const { viewCto } = ctos;
  const { data } = viewCto;

  const [name, setName] = useState(data.name);
  const [model, setModel] = useState(data.model);
  const [address, setAddress] = useState(data.address);
  const [obs, setObs] = useState(data.obs);

  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Endereço:</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Observação:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={obs}
            onChange={e => setObs(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="info" style={{ marginRight: "10px" }}>
            Atualizar informações
            <SaveIcon style={{ marginLeft: "5px" }} />
          </Button>

          <Button variant="danger">
            Excluir
            <DeleteIcon style={{ marginLeft: "5px" }} />
          </Button>
        </div>
      </Form>
    </Container>
  );
}
