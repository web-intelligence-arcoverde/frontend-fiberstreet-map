import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Container, ButtonContainer, Button } from "./styles";
import "../modalStyles/styles.css";

Modal.setAppElement(document.getElementById("root"));

function ViewCliente(props) {
  const { viewClient } = props.redux;

  let {
    nome,
    usuario_pppoe,
    cpf,
    velocidade,
    data_instalacao
  } = viewClient.data;

  const [editar, setEditar] = useState(false);

  function handleHideModal() {
    const { hideClientViewModal } = props;
    hideClientViewModal();
  }

  function handleCoordCabo() {
    let latitude = JSON.parse(props.redux.viewClient.data.coordenadas).latitude;
    let longitude = JSON.parse(props.redux.viewClient.data.coordenadas)
      .longitude;
    let coord = [longitude, latitude];
    // alert(coord);
    const { addCoordCabo, setDelimitacaoMapa, hideClientViewModal } = props;
    setDelimitacaoMapa("cabo");
    let arrayDeArray = new Array(coord);
    // addCoordCabo(coord);
    addCoordCabo(arrayDeArray);
    // alert(props.redux.mapa.polyline);
    console.tron.log(props.redux);

    hideClientViewModal();
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

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCliente);
