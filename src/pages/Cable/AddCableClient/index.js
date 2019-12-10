import React, { useState } from "react";

import Modal from "react-modal";
import api from "../../../services/api";
import "./Components/modalStyles/styles.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";

function AddNewCabo(props) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [quantidade_fibras, setQuantidadeFibras] = useState(0);

  function handleSubmit(e) {
    // a
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
    ></Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CaboCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCabo);
