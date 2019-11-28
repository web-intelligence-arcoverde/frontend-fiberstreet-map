import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Creators as CableActions } from "../../../../../redux/store/ducks/cabo";

import { Container, Col, Form, Button } from "react-bootstrap/";

export default function Information(props) {
  const cable = useSelector(state => state.cabo.view.data);
  const dispatch = useDispatch();

  const [updatedCable, setUpdatedCable] = useState(cable);

  const handleUpdate = useCallback(() => {
    dispatch(CableActions.updateCableRequest(updatedCable));
  }, [dispatch, updatedCable]);

  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              value={updatedCable.name}
              onChange={e =>
                setUpdatedCable({ ...updatedCable, name: e.target.value })
              }
              type="text"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Tipo:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              value={updatedCable.type}
              onChange={e =>
                setUpdatedCable({ ...updatedCable, type: e.target.value })
              }
              type="text"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Qt Fibras:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              type="text"
              value={updatedCable.fiberAmount}
              onChange={e =>
                setUpdatedCable({
                  ...updatedCable,
                  fiberAmount: e.target.value
                })
              }
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Observação:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              type="text"
              value={updatedCable.obs}
              onChange={e =>
                setUpdatedCable({ ...updatedCable, obs: e.target.value })
              }
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
          <Button
            variant="info"
            style={{ marginRight: "10px" }}
            onClick={handleUpdate}
          >
            Atualizar informações
          </Button>
        </div>
      </Form>
    </Container>
  );
}
