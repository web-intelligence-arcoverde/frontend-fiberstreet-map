import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Creators as ClienteCreators } from "../../../redux/store/ducks/all";
import { Creators as CliCreators } from "../../../redux/store/ducks/cliente";
import { Container, ButtonContainer, Button } from "./styles";
import "../modalStyles/styles.css";

import api from "../../../services/api";

Modal.setAppElement(document.getElementById("root"));

function ViewCliente(props) {
  const { viewClient } = props.redux.all;

  let {
    nome,
    usuario_pppoe,
    cpf,
    velocidade,
    data_instalacao,
    id
  } = viewClient.data;

  const [splitterId, setSplitterId] = useState("");
  const [existsWire, setExistsWire] = useState(true);

  const [editar, setEditar] = useState(false);

  function handleHideModal() {
    const { hideClientViewModal } = props;
    hideClientViewModal();
  }

  function addCabo() {
    let latitude = JSON.parse(props.redux.all.viewClient.data.coordenadas)
      .latitude;
    let longitude = JSON.parse(props.redux.all.viewClient.data.coordenadas)
      .longitude;
    let coord = [longitude, latitude];
    // alert(coord);

    const {
      addCoordCabo,
      setDelimitacaoMapa,
      hideClientViewModal,
      addClienteId
    } = props;
    setDelimitacaoMapa("cabo");
    let arrayDeArray = new Array(coord);
    // addCoordCabo(coord);
    addClienteId(id);
    addCoordCabo(arrayDeArray);

    // alert(props.redux.mapa.polyline);
    // console.tron.log(props.redux);

    hideClientViewModal();
  }

  function handleCoordCabo() {
    api
      .get(`saidasplitter/cliente/${id}`)
      .then(result => {
        const { data } = result;
        console.log(data);
        const { id, splitter_cod } = data;
        setSplitterId(splitter_cod);

        if (splitter_cod) {
          alert("Este cliente já possui um drop em sua residência");
        } else {
          addCabo();
        }
      })
      .catch(err => {
        console.warn(err);
      });
  }

  const { changeClienteData } = props;
  return (
    <Modal
      isOpen={viewClient.visible}
      onRequestClose={handleHideModal}
      contentLabel="Adicionar Cliente"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Container>
        <h1>Cliente</h1>
        <div>
          {editar == false ? (
            <p>Nome: {nome}</p>
          ) : (
            <>
              <p>Nome: </p>
              <input
                type="text"
                value={nome}
                onchange={e => {
                  nome = e.target.value;
                  changeClienteData({
                    nome: e.target.value,
                    ...viewClient.data
                  });
                }}
              />
            </>
          )}

          <p>PPPoE: {usuario_pppoe}</p>
          <p>Cpf: {cpf}</p>
          <p>Velocidade: {velocidade}</p>
          <p>Data de Instalação: {data_instalacao}</p>
          <p>Identificador único: {id}</p>
        </div>
        <ButtonContainer>
          <Button onClick={() => setEditar(!editar)}>
            {editar == false ? <>Editar</> : <>Salvar</>}
          </Button>
          <Button onClick={handleCoordCabo}>Adicionar cabo</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

// const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ClienteCreators, ...CliCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCliente);
