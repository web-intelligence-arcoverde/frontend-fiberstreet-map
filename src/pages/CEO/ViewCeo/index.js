import React, { useEffect } from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as ceoCreators } from "../../../redux/store/ducks/ceo";
import { Creators as FiberFusionActions } from "../../../redux/store/ducks/fiberfusion";

//import components
import TableCeo from "./Components/TableCeo";
import TableFusoes from "./Components/TableFusoes";
import TableCable from "./Components/TableCable";
import Spreadsheet from "./Components/Spreadsheet";

//UI-Components
import { Modal, Accordion, Card, ListGroup } from "react-bootstrap";

const ViewCeo = props => {
  const { visible } = props.redux.ceo.viewCeo;

  useEffect(() => {
    const { data } = props.redux.ceo.viewCeo;
    if (visible) {
      const { showCablesCeoRequest } = props;
      showCablesCeoRequest(data.id);
    }
  }, [props.redux.ceo.viewCeo, visible]);

  return (
    <Modal
      size="lg"
      show={props.redux.ceo.viewCeo.visible}
      onHide={props.hideViewModalCeo}
    >
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
                    <TableCable />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="3"
                  style={{ backgroundColor: "#6c757d", color: "#FFF" }}
                >
                  <h5>Plano de Emenda</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body
                    style={{
                      paddingTop: "10px",
                      paddingLeft: "5px",
                      paddingBottom: "0px"
                    }}
                  >
                    <Spreadsheet />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Modal>
  );
};

const mapStateToProps = state => ({
  redux: state
});

//Ações
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ceoCreators, ...FiberFusionActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewCeo);
