import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import api from "../../../services/api";
import { Form } from "../modalStyles/styles";
import "../modalStyles/styles.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";

Modal.setAppElement(document.getElementById("root"));

function AddNewCabo(props) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [quantidade_fibras, setQuantidadeFibras] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    let coordinates = props.redux.all.mapa.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1]
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);
    let cabo = {
      coordenadas: coordinatesStrinfigied,
      nome,
      tipo,
      quantidade_fibras
    };
    const idOfCtoToRelationship = props.redux.ctos.ctoId;
    // const data = {
    //   cabo,
    //   idOfCtoToRelationship
    // };
    cabo = { ...cabo, cto_id: idOfCtoToRelationship };

    const { addCoordCabo } = props;
    api
      .post("cabo/add/rel", cabo)
      .then(response => {
        alert(response.data);
        setNome("");
        setTipo("");
        addCoordCabo([[0, 0]]);
        setQuantidadeFibras(0);
        handleHideModal();
      })
      .catch(err => console.warn(`err -> API => Cabo/ADD: ${err}`));
  }

  function handleHideModal() {
    const { hideAddNewCaboModalReserva } = props;
    hideAddNewCaboModalReserva();
  }

  return (
    <Modal
      isOpen={props.redux.cabo.newCabo.isVisible}
      contentLabel="Cabo Novo"
      onRequestClose={handleHideModal}
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <>
        <h3 style={{ color: "orange" }}>Cabo</h3>
        <Form
          style={{ marginTop: 1.2 + "em" }}
          action=""
          onSubmit={handleSubmit}
        >
          <label for="nome">Nome (Trecho):</label>
          <input
            id="nome"
            name="nome"
            placeholder="Nome do cabo"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <label for="tipo">Tipo</label>
          <input
            id="tipo"
            name="tipo"
            placeholder="Modelo do cabo"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            required
          />
          <label for="qtfibra">Número de fibras</label>
          <input
            id="qtfibra"
            name="quantidade_fibras"
            placeholder="1, 6, 24, 36, 72..."
            max="172"
            type="number"
            value={quantidade_fibras}
            onChange={e => setQuantidadeFibras(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{ height: 3 + "em", backgroundColor: "#429911" }}
          >
            Salvar
          </button>
          <button
            style={{ marginTop: 5, height: 3 + "em", backgroundColor: "red" }}
          >
            Sair
          </button>
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            padding: 5 + "px"
          }}
        />
      </>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CaboCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewCabo);
