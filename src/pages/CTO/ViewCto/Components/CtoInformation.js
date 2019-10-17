import React, { useState } from "react";

//Components
import { Field } from "../../../components/Inputs/InputBase";
import { InputField } from "../../../components/Inputs/InputFieldComponent";

//Components Importados
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Form
} from "react-bootstrap/";

//Icons
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

export default function Components(props) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [address, setAddress] = useState("");
  const [obs, setObs] = useState("");
  return (
    <Container>
      <Card style={{ marginTop: "10px" }}>
        <Card.Body>
          <Row style={{ marginTop: "10px" }}>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Nome:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Modelo:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col sm={12}>
              <Form.Group>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "10px"
            }}
          >
            <Col sm={8}>
              <Form.Group>
                <Form.Label>Observação:</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
            </Col>
            <Col sm={4}></Col>
          </Row>
          <Row
            style={{
              marginTop: "20px",
              marginBottom: "5px"
            }}
          >
            <Col sm={10}></Col>
            <Col sm={1}>
              <Button variant="secondary">
                <EditIcon />
              </Button>
            </Col>
            <Col sm={1}>
              <Button variant="secondary">
                <SaveIcon />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

/*
* <ButtonGroup aria-label="Basic example">
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup> */

/*
<Col sm={1}>
                <Button variant="secondary">
                  <EditIcon />
                </Button>
              </Col>
              <Col sm={1}>
                <Button variant="secondary">
                  <SaveIcon />
                </Button>
              </Col>

*/
