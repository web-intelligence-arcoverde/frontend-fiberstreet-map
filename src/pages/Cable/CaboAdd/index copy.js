import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Creators as AllCreators } from "../../../redux/store/ducks/all";
import { Creators as DropCreators } from "../../../redux/store/ducks/drop";
import Modal from "react-modal";
import { Form } from "../modalStyles/styles";
import "../modalStyles/styles.css";
import api from "../../../services/api";

Modal.setAppElement(document.getElementById("root"));

function CaboAdd(props) {
  const { modalCabo } = props.redux.all;

  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [fibra, setFibra] = useState(0);
  const TNAME = "nome";
  const TMODEL = "modelo";

  function handleHideModal() {
    const { hideAddCaboModal } = props;
    hideAddCaboModal();
  }

  async function handleSubmit() {
    let coordinates = props.redux.all.mapa.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1]
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);

    const cabo = {
      nome: nome,
      tipo: modelo,
      quantidade_fibras: fibra,
      coordenadas: coordinatesStrinfigied
    };
    const { addCoordCabo, hideAddCaboModal } = props;
    // addCoordCabo(null);
    // Irá para próxima etapa
    // await api
    //   .post("/cabo/add", cabo)
    //   .then(response => {
    //     console.tron.log(`API => Cabo/ADD: ${JSON.stringify(response)}`);
    //     alert("Cabo armazenado com suceso");
    //     setNome("");
    //     setModelo("");
    //     addCoordCabo([]);
    //     hideAddCaboModal();
    //   })
    //   .catch(err => console.tron.warn(`err -> API => Cabo/ADD: ${err}`));
    setNome("");
    setModelo("");
    addCoordCabo([]);
    hideAddCaboModal();
    const { showDropAddModalRequest } = props;
    const dropNdCtoId = {
      drop: cabo,
      cto_id: modalCabo.cto_id
    };
    showDropAddModalRequest(dropNdCtoId);
  }

  function handleChange(event, mode) {
    const { value } = event.target;

    switch (mode) {
      case TNAME:
        setNome(value);
        break;
      case TMODEL:
        setModelo(value);
        break;
      case "QTFIBRA":
        setFibra(value);
        break;
    }
  }

  return (
    <Modal
      isOpen={modalCabo.visible}
      contentLabel="Cabo"
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
            onChange={e => handleChange(e, TNAME)}
            required
          />
          <label for="modelo">Modelo</label>
          <input
            id="modelo"
            name="tipo"
            placeholder="Modelo do cabo"
            value={modelo}
            onChange={e => handleChange(e, TMODEL)}
            required
          />
          <label for="qtfibra">Número de fibras</label>
          <input
            id="qtfibra"
            name="quantidade_fibras"
            placeholder="1, 6, 24, 36, 72..."
            max="172"
            type="number"
            onChange={e => handleChange(e, "QTFIBRA")}
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
        >
          {/*  */}
        </div>
      </>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

// const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...AllCreators, ...DropCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaboAdd);
