import React, { useEffect, useState, useMemo, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Creators as CableActions } from "../../../redux/store/ducks/cabo";

//UI-Components
import { Modal, Accordion, Card, ListGroup } from "react-bootstrap";
import Information from "./components/Information";

export default function ViewCable(props) {
  const view = useSelector(state => state.cabo.view);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = view.data;
    if (view.visible) {
    }
  }, [view.data, view.visible]);

  const handleHideModal = useCallback(() => {
    dispatch(CableActions.hideViewCableModal());
  }, [dispatch]);

  return (
    <Modal size="lg" show={false} onHide={handleHideModal}>
      <Card>
        <Card.Header
          style={{
            fontSize: "30px",
            backgroundColor: "#F7D358",
            textAlign: "center"
          }}
        >
          Cabo
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Accordion>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Informações do cabo</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    <Information />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="2"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Lista de cabos</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    {/* <TableCable /> */}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Modal>
  );
}
