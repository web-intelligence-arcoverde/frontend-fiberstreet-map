import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Container, ButtonContainer, Button } from "./styles";
import "./styles.css";

Modal.setAppElement(document.getElementById("root"));

function ViewCto(props) {
  const { viewCto } = props.redux;
  const coordinates = viewCto.data.coordenadas;
  const [coordenadas, setCoordenadas] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [modelo, setModelo] = useState("");

  function handleHideModal() {
    const { hideDataInViewModal } = props;
    hideDataInViewModal();
  }

  function addSplitter(id) {
    alert(id);
    const { hideDataInViewModal, showSplitterAddModal } = props;
    hideDataInViewModal();
    showSplitterAddModal(id);
  }

  //useEffect(() => {});

  return (
    <Modal
      // isOpen={false}
      isOpen={viewCto.visible}
      onRequestClose={handleHideModal}
      contentLabel="Visualização dos dados da CTO"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Container>
        <div
          style={{
            position: "relative",
            right: 10,
            top: 5
          }}
        >
          X
        </div>
        <h1>Caixa Terminal Óptica</h1>
        <p>Nome: {viewCto.data.nome}</p>
        <p>Endereço: {viewCto.data.endereco}</p>
        <p>Modelo: {viewCto.data.modelo}</p>
        <ButtonContainer>
          <Button onClick={() => addSplitter(viewCto.data.id)}>
            Adicionar Splitter
          </Button>
          <Button>Editar</Button>
          <Button>Salvar</Button>
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
)(ViewCto);
