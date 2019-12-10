import React, { useState } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";
import { Creators as MapCreators } from "../../../redux/store/ducks/map";

//Components
import { Modal, Form, Col, Button } from "react-bootstrap/";
import CloseIcon from "@material-ui/icons/Close";

function ViewAddCable(props) {
  const [cableName, setCableName] = useState("");
  const [fiberAmount, setFiberAmount] = useState("");
  const [cableType, setCableType] = useState("");
  const [obs, setObs] = useState("");

  const { objectTo } = props.redux.cabo;
  const { idFrom, idTo } = props.redux.cabo.idFromTo;
  const { subDelimitation } = props.redux.map;
  const { setDelimitation, setSubDelemitation } = props;
  const { hideModalAddCable, hideIcons } = props;
  const { visible } = props.redux.cabo.idFromTo;

  function hideModal() {
    hideModalAddCable();
    hideIcons();
    setDelimitation("default");
    setSubDelemitation("default");
  }

  /**
   * ceo e cto
   * delimitation ceo
   */

  function handleSubmit(e) {
    e.preventDefault();

    const { polyline } = props.redux.map;

    let coordinates = props.redux.map.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1]
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);

    const cable = {
      fiberAmount,
      name: cableName,
      type: cableType,
      obs: obs,
      coordinates: coordinatesStrinfigied
    };

    // subDelimitation, delimitation
    const { saveRel } = props;

    if (subDelimitation === "cto") {
      // CTO P CTO
      if (objectTo === "cto") {
        const rel_cto = {
          cto_id: idFrom,
          obs
        };
        const rel_cto2 = {
          cto_id: idTo,
          obs
        };
        saveRel("cto", "cto", rel_cto, rel_cto2, cable);
        // CTO P CEO
      } else {
        const rel_cto = {
          cto_id: idFrom,
          obs
        };
        const rel_ceo = {
          ceo_id: idTo,
          obs
        };
        saveRel("cto", "ceo", rel_cto, rel_ceo, cable);
        // save
      }
    } else {
      // CEO p CEO
      if (objectTo === "ceo") {
        const rel_ceo = {
          ceo_id: idFrom,
          obs
        };
        const rel_ceo_2 = {
          ceo_id: idTo,
          obs
        };
        saveRel("ceo", "ceo", rel_ceo, rel_ceo_2, cable);
        // save
      } else {
        // CEO p CTO
        const rel_ceo = {
          ceo_id: idFrom,
          obs
        };
        const rel_cto = {
          cto_id: idTo,
          obs
        };

        saveRel("ceo", "cto", rel_ceo, rel_cto, cable);
        // Save
      }
    }
    hideModal();
  }

  return (
    <Modal size="lg" onHide={hideModal} show={visible}>
      <Modal.Header
        style={{
          justifyContent: "center",
          fontSize: "30px",
          backgroundColor: "#F7D358",
          paddingTop: "15px",
          paddinBottom: "15px"
        }}
      >
        <Modal.Title>Adicionar Cabo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Observação</Form.Label>
              <Form.Control
                type="text"
                value={obs}
                onChange={e => setObs(e.target.value)}
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
                <Form.Label>Nome do cabo</Form.Label>
                <Form.Control
                  type="text"
                  value={cableName}
                  onChange={e => setCableName(e.target.value)}
                ></Form.Control>
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
                <Form.Label>Qt Fibras</Form.Label>
                <Form.Control
                  type="number"
                  value={fiberAmount}
                  onChange={e => setFiberAmount(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  value={cableType}
                  onChange={e => setCableType(e.target.value)}
                ></Form.Control>
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
  bindActionCreators({ ...CaboCreators, ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewAddCable);
