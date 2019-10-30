import React, { useState, useEffect } from "react";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as ceoCreators } from "../../../../redux/store/ducks/ceo";

//Ui
import { Modal, Form, Button, Col } from "react-bootstrap/";
import CloseIcon from "@material-ui/icons/Close";

function ModalFusao(props) {
  var cables = [];
  var fibers = [];

  const [bandeja, setBandeja] = useState("");
  const [cableTo, setCableTo] = useState("");
  const [cableFrom, setCableFrom] = useState("");
  const [fiberTo, setFiberTo] = useState("");
  const [fiberFrom, setFiberFrom] = useState("");
  const [obs, setObs] = useState("");

  const { hideNewViewModalFusao } = props;

  return (
    <Modal
      show={props.redux.ceo.viewNewFusao.visible}
      onHide={hideNewViewModalFusao}
      size="lg"
    >
      <Modal.Header
        style={{
          justifyContent: "center",
          fontSize: "30px",
          backgroundColor: "#F7D358",
          paddingTop: "15px",
          paddinBottom: "15px"
        }}
      >
        <Modal.Title>Adicionar fusão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Bandeja</Form.Label>
              <Form.Control
                type="text"
                value={bandeja}
                onChange={e => setBandeja(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <div
            style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}
          >
            <Form.Row
              style={{
                display: "block",
                width: "50%",
                marginRight: "15px",
                padding: "15px"
              }}
            >
              <Form.Group as={Col}>
                <Form.Label>Cabo</Form.Label>
                <Form.Control
                  as="select"
                  value={cableTo}
                  onChange={e => setCableTo(e.target.value)}
                >
                  {cables.map(cable => (
                    <option>{cable}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fibra</Form.Label>
                <Form.Control
                  as="select"
                  value={fiberTo}
                  onChange={e => setFiberTo(e.target.value)}
                >
                  {fibers.map(fiber => (
                    <option>{fiber}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <div
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                width: "50px"
              }}
            >
              <Button variant="secondary">
                <CloseIcon />
              </Button>
            </div>

            <Form.Row
              style={{
                display: "block",
                width: "50%",
                marginLeft: "15px",
                padding: "15px"
              }}
            >
              <Form.Group as={Col}>
                <Form.Label>Cabo</Form.Label>
                <Form.Control
                  as="select"
                  value={cableFrom}
                  onChange={e => setCableFrom(e.target.value)}
                >
                  {cables.map(cable => (
                    <option>{cable}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fibra</Form.Label>
                <Form.Control
                  as="select"
                  value={fiberFrom}
                  onChange={e => setFiberFrom(e.target.value)}
                >
                  {fibers.map(fiber => (
                    <option>{fiber}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          >
            <Button variant="secondary" type="submit" style={{ width: "100%" }}>
              Adicionar
            </Button>
          </div>
        </Form>
      </Modal.Body>
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
)(ModalFusao);
