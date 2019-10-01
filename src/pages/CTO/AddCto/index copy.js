import React, { useState, useEffect } from "react";
import { Container, Form, Button, CoordForm } from "./styles";
import api from "../../../../services/api";
import propTypes from "prop-types";
import Modal from "react-modal";
import "./styles.css";

// redux
import { canAddCoordenadas } from "../../../../redux/store/actions/all";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { obterDadosDoServidor } from "../../../../services/handleInformation";
import * as Actions from "../../../../redux/store/actions/all";

function AddCto(props) {
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState(
    JSON.stringify(props.redux.all.coordenadas)
  );
  // JSON.stringify(props.redux.coordenadas)

  const { modalCto } = props.redux.all;

  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
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
      coordenadas: coordinates,
      modelo: type,
      endereco: address
    };

    await api
      .post("/create/cto", newCto)
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
      .post("/get/cto", information)
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
      default:
        break;
    }
  }

  function handleHideModal() {
    const { hideModalCto } = props;
    hideModalCto();
  }

  return (
    <Modal
      isOpen={modalCto.visible}
      onRequestClose={handleHideModal}
      contentLabel="Adicionar nova CTO"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Form onSubmit={event => handleCto(event)}>
        <label for="ctoName">Nome Cto</label>
        <input
          id="ctoName"
          value={name}
          type="text"
          name="nome"
          placeholder="Insira o nome da CTO"
          required
          onChange={e => handleChange(e, TNAME)}
        />
        <CoordForm style={{ alignItems: "center", justifyContent: "center" }}>
          <label for="coordenadas">Coordenadas</label>
          <input
            id="coordenadas"
            value={JSON.stringify(props.redux.all.modalCto.coordinates)}
            type="text"
            name="coordenadas"
            placeholder="Coordenadas"
            required
            onChange={e => handleChange(e, TCOORDINATES)}
          />

          <div
            style={{ width: 30, height: 30, backgroundColor: "#FFF" }}
            onClick={() => {
              canAddCoordenadas(true);
              alert("Selecione um local precisamente no mapa;");
            }}
          >
            +
          </div>
        </CoordForm>
        <label for="address">Endereço</label>
        <input
          id="address"
          value={address}
          type="text"
          name="endereco"
          placeholder="Endereço"
          required
          onChange={e => handleChange(e, TADDRESS)}
        />
        <label for="modelo">Modelo</label>
        <input
          id="modelo"
          value={type}
          type="text"
          name="modelo"
          placeholder="Modelo"
          required
          onChange={e => handleChange(e, TTYPE)}
        />

        <hr />
        <Button type="submit">Adicionar</Button>
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
