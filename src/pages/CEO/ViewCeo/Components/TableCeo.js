import React, { useState } from "react";

import { Container, Col, Form, Button } from "react-bootstrap/";

export default function tableCeo(props) {
  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Tipo:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Modelo:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Endereço:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Observação:</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </Form.Row>
      </Form>

      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Button variant="danger" style={{ marginRight: "10px" }}>
          Excluir
        </Button>
        <Button variant="info" style={{ marginRight: "10px" }}>
          Atualizar
        </Button>
        <Button variant="secondary">Adicionar splitter</Button>
      </div>
    </Container>
  );
}
