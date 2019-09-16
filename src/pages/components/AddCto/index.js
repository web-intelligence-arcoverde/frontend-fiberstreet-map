import React, { useState, useEffect } from "react";
import { CoordForm } from "./styles";
import api, { API } from "../../../services/api";
import propTypes from "prop-types";
import "./styles.css";

// redux
import { canAddCoordenadas } from "../../../redux/store/actions/all";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { obterDadosDoServidor } from "../../../services/handleInformation";
import * as Actions from "../../../redux/store/actions/all";

//UI-Components
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// Vamos fazer aqui uma renderização condicional para ADIÇÃO/AMOSTRAGEM de imagens

function AddCto(props) {
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState(
    JSON.stringify(props.redux.all.coordenadas)
  );
  // JSON.stringify(props.redux.coordenadas)
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const { modalCto } = props.redux.all;
  const TNAME = "name";
  const TCOORDINATES = "coordinates";
  const TTYPE = "type";
  const TADDRESS = "address";

  useEffect(() => {
    function set() {
      setCoordinates(JSON.stringify(props.redux.all.coordenadas));
    }
    set();
  }, [props.redux.all.coordenadas]);

  async function handleCto(e) {
    e.preventDefault();
    const { setCtoFromServer } = props;

    const newCto = {
      nome: name,
      coordenadas: JSON.stringify(props.redux.all.modalCto.coordinates),
      modelo: type,
      endereco: address
    };

    await api
      .post(
        API.CREATE_CTO,
        // "/create/cto"
        newCto
      )
      .then(response => {
        handleHideModal();
        obterDadosDoServidor();
      })
      .catch(err => {
        console.warn(err);
      });
  }
  async function obterDadosDoServidor() {
    const { setCtoFromServer } = props;
    let information = {
      type: "cto"
    };
    await api
      .get(
        API.GET_CTO_GEOJSON,
        // "/get/cto"
        information
      )
      .then(result => {
        let data = result.data;
        setCtoFromServer(data);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  function handleChange(event, mode) {
    const { value } = event.target;

    switch (mode) {
      case "name":
        setName(value);
        break;
      case "coordinates":
        setCoordinates(value);
        break;
      case "type":
        setType(value);
        break;
      case "address":
        setAddress(value);
        break;
    }
  }

  function handleHideModal() {
    const { hideModalCto } = props;
    hideModalCto();
  }

  return (
    <Modal show={modalCto.visible} onHide={handleHideModal} animation={false}>
      <Form onSubmit={handleCto}>
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title>Cadastrar do CTO</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome CTO:</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control
              value={address}
              onChange={e => setAddress(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              value={type}
              onChange={e => setType(e.target.value)}
              type="text"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            Fechar
          </Button>

          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCto);
