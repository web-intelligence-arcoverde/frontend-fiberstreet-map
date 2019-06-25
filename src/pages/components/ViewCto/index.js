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
  const [saidasSplitter, setSaidasSplitter] = useState([]);

  /** useEffect para obter os Splitters pelo id da cto */
  useEffect(() => {
    function getSplitters(id) {
      api
        .get(`/get/splitter/${id}`)
        .then(response => {
          const sp = response.data;
          alert(JSON.stringify(response.data));
          setSplitters(sp);
        })
        .catch(e => console.warn(e));
    }
    getSplitters(viewCto.data.id);
  }, [viewCto.data.id]);

  /** Obtém os clientes por cada saída do splitter existente */
  useEffect(() => {
    function getSaidaSpWithClientes(splitterId) {
      api.get(`/get/cliente/splitter/${splitterId}`).then(response => {
        const saidaSplitter = response.data;
        setSaidasSplitter(saidaSplitter);
      });
    }
    getSaidaSpWithClientes(viewCto.data.id);
  }, [viewCto.data.id]);

  // useEffect(() => {
  //   function getClientesBySplitter(id){
  //     api
  //       .get(`/get/cliente/${id}`)
  //       .then(response => {
  //         const cl = response.data;
  //         set
  //       })
  //   }
  // })

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
              <th>Nome</th>
              {/* <th>Modelo</th>
              <th>Balanceamento</th> */}
            </tr>
            {saidasSplitter.map(sSplitter => (
              <>
                <tr>
                  <td>{sSplitter.nome}</td>
                  <td>{sSplitter.modelo}</td>
                  <td>{sSplitter.balanceamento}</td>
                </tr>
                <h3>Clientes</h3>
                <table>
                  <tr>
                    <th>Porta</th>
                    <th>Nome</th>
                    <th>PPPoE</th>
                    <th>Velocidade</th>
                  </tr>
                  <tr>
                    <td>{sSplitter.numero}</td>
                    <td>{sSplitter.Cliente.nome}</td>
                    <td>{sSplitter.Cliente.usuario_pppoe}</td>
                    <td>{sSplitter.Cliente.velocidade}</td>
                  </tr>
                </table>
              </>
            ))}
          </table>
          <button>Adicionar Cliente</button>
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
