import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import Modal from "react-modal";
import { Form } from "../modalStyles/styles";
import "../modalStyles/styles.css";
import api from "../../../services/api";

Modal.setAppElement(document.getElementById("root"));

function CaboAdd(props) {
  const { modalCabo } = props.redux;

  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [fibra, setFibra] = useState(0);
  const TNAME = "nome";
  const TMODEL = "modelo";

  // useEffect(() => {
  //   async function limparCampos() {
  //     setNome("");
  //     setModelo("");
  //   }
  //   limparCampos();
  // });

  function handleHideModal() {
    const { hideAddCaboModal } = props;
    hideAddCaboModal();
  }

  async function handleSubmit() {
    let coordinates = props.redux.mapa.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1]
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);

    console.tron.log({ coord: JSON.stringify(coordinates) });

    const cabo = {
      nome: nome,
      tipo: modelo,
      quantidade_fibras: 6,
      coordenadas: coordinatesStrinfigied //props.redux.mapa.polyline
    };
    const { addCoordCabo, hideAddCaboModal } = props;
    await api
      .post("/cabo/add", cabo)
      .then(response => {
        console.tron.log(`API => Cabo/ADD: ${response}`);
        alert("Cabo armazenado <com></com> suceso");
        setNome("");
        setModelo("");
        hideAddCaboModal();
        addCoordCabo([]);
      })
      .catch(err => console.tron.warn(`API => Cabo/ADD: ${err}`));
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
          onSubmit={() => alert("E")}
        >
          <label for="nome">Nome (Trecho):</label>
          <input
            id="nome"
            name="nome"
            placeholder="Nome da CTO"
            value={nome}
            onChange={e => handleChange(e, TNAME)}
            required
          />
          <label for="modelo">Modelo</label>
          <input
            id="modelo"
            name="tipo"
            placeholder="Modelo da CTO"
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
        </Form>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            padding: 5 + "px"
          }}
        >
          <button
            style={{ height: 3 + "em", backgroundColor: "#429911" }}
            onClick={() => {
              console.tron.log({ redux: props.redux.modalCabo });
              handleSubmit();
            }}
          >
            Salvar
          </button>
          <button style={{ height: 3 + "em", backgroundColor: "red" }}>
            Sair
          </button>
        </div>
      </>
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
)(CaboAdd);
