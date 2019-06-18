import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import {
  Container,
  ButtonContainer,
  Button,
  SplitterContainer
} from "./styles";
import "./styles.css";
import api from "../../../services/api";

Modal.setAppElement(document.getElementById("root"));

function ViewCto(props) {
  const { viewCto } = props.redux;
  const coordinates = viewCto.data.coordenadas;
  const [coordenadas, setCoordenadas] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [modelo, setModelo] = useState("");
  const [splitters, setSplitters] = useState([]);

  useEffect(() => {
    function getSplitters(id) {
      api
        .get(`/get/splitter/${id}`)
        .then(response => {
          const sp = response.data;
          setSplitters(sp);
        })
        .catch(e => console.warn(e));
    }
    getSplitters(viewCto.data.id);
  }, [viewCto.data.id]);

  function handleHideModal() {
    const { hideDataInViewModal } = props;
    hideDataInViewModal();
  }

  function addSplitter(id) {
    const { hideDataInViewModal, showSplitterAddModal } = props;
    hideDataInViewModal();
    showSplitterAddModal(id);
  }

  return (
    <Modal
      isOpen={viewCto.visible}
      onRequestClose={handleHideModal}
      contentLabel="Visualização dos dados da CTO"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Container>
        <h1>Caixa Terminal Óptica</h1>
        <p>Nome: {viewCto.data.nome}</p>
        <p>Endereço: {viewCto.data.endereco}</p>
        <p>Modelo: {viewCto.data.modelo}</p>
        <br />
        <SplitterContainer>
          <h3>Splitters nesta CTO</h3>
          <table>
            <tr>
              <td>Nome</td>
              <td>Modelo</td>
              <td>Balanceamento</td>
            </tr>
            {splitters.map(splitter => (
              <tr>
                <td>{splitter.nome}</td>
                <td>{splitter.modelo}</td>
                <td>{splitter.balanceamento}</td>
              </tr>
            ))}
          </table>
        </SplitterContainer>

        <br />
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
