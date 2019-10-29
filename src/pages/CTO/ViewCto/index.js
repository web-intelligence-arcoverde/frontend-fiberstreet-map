import React, { useEffect, useState } from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//API
import api from "../../../services/api";

//Creators do redux
import { Creators as ctosActions } from "../../../redux/store/ducks/ctos";
import { Creators as SplitterActions } from "../../../redux/store/ducks/splitter";

//Componentes "criados"
import CtoInformation from "./Components/CtoInformation";
import TableClients from "./Components/TableUsers";
import TableSplitter from "./Components/TableSplitter";
import TableCable from "./Components/TableCable";

//Componentes importados
import { Modal, Accordion, Card, ListGroup } from "react-bootstrap";

//Tamanho das box
function ViewCto(props) {
  const { ctos } = props.redux;
  const { hideViewModalCto } = props;

  const { viewCto } = ctos; //Recuperando o estado inicial da CTO
  const { data } = viewCto;

  return (
    <Modal size="lg" show={viewCto.visible} onHide={hideViewModalCto}>
      <Card>
        <Card.Header
          style={{
            fontSize: "40px",
            backgroundColor: "#F7D358",
            textAlign: "center"
          }}
        >
          Caixa Terminal Optica
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
                  <h5>Informações do terminal optico</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    <CtoInformation />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="1"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Clientes no terminal</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    <TableClients />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="2"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Splitters</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    <TableSplitter />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="3"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Cabos</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    <TableCable />
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

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions, ...SplitterActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCto);

/**
 * <Modal.Header
        style={{ backgroundColor: "#F7D358", justifyContent: "center" }}
      >
        <Modal.Title>
          <h3>Caixa Terminal Optico</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
 */
