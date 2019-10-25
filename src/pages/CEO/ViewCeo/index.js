import React from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//import components
import TableCeo from "./Components/TableCeo";
import TableSplitter from "./Components/TableSplitter";
import TableCable from "./Components/TableCable";

//UI-Components
import { Modal, Accordion, Card, ListGroup } from "react-bootstrap";

function ViewCeo(props) {
  return (
    <Modal size="lg" show={true}>
      <Card>
        <Card.Header
          style={{
            fontSize: "30px",
            backgroundColor: "#F7D358",
            textAlign: "center"
          }}
        >
          Caixa de Emenda Optica
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
                  <h5>Informações da caixa de emenda</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    <TableCeo />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="1"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Splitter</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
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
                  eventKey="1"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Cabos</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
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

//Ações
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCeo);
