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
  // const { viewCto } = props.redux;
  const { all } = props.redux;
  const { data } = props.redux.all.viewCto;
  const coordinates = all.viewCto.data.coordenadas;
  const [coordenadas, setCoordenadas] = useState("");
  const [nome, setNome] = useState(props.redux.all.viewCto.data.nome);
  const [endereco, setEndereco] = useState("");
  const [modelo, setModelo] = useState("");
  const [splitters, setSplitters] = useState([]);
  const [saidasSplitter, setSaidasSplitter] = useState([]);

  /** useEffect para obter os Splitters pelo id da cto */
  useEffect(() => {
    function getSplitters(id) {
      api
        .get(`/get/splitter/cto/${id}`)
        .then(response => {
          const sp = response.data;
          alert(JSON.stringify(response.data));
          setSplitters(sp);
        })
        .catch(e => console.warn(e));
    }
    getSplitters(all.viewCto.data.id);
  }, [all.viewCto.data.id]);

  /** Obtém os clientes por cada saída do splitter existente */
  useEffect(() => {
    function getSaidaSpWithClientes(splitterId) {
      api.get(`/get/cliente/splitter/${splitterId}`).then(response => {
        const saidaSplitter = response.data;
        setSaidasSplitter(saidaSplitter);
      });
    }
    getSaidaSpWithClientes(all.viewCto.data.id);
  }, [all.viewCto.data.id]);

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

  var dados = {};

  return (
    <Modal
      isOpen={all.viewCto.visible}
      onRequestClose={handleHideModal}
      contentLabel="Visualização dos dados da CTO"
      // className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Container>
        <h1>Caixa Terminal Óptica</h1>
        <p>Nome: {data.nome}</p>
        <p>Endereço: {data.endereco}</p>
        <p>Modelo: {data.modelo}</p>
        <p>Id: {data.id}</p>
        <br />

        <SplitterContainer>
          <h3>Splitters nesta CTO</h3>
          <table>
            <thead>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Balanceamento</th>
              <th>Fibra Aliment.</th>
            </thead>
            <tbody>
              {splitters.map((splitter, index) => (
                <>
                  <tr>
                    <td>{splitter.nome}</td>
                    <td>{splitter.modelo}</td>
                    <td>{splitter.balanceamento}</td>
                    <td>Em const.</td>
                  </tr>
                  {/* Tabela com os clientes */}
                  <table>
                    <thead>
                      <th>Nome</th>
                      <th>PPPoE</th>
                      <th>Endereço</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>TesteNome</td>
                        <td>Eu já não me...</td>
                        <td>Rua da curva</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ))}
            </tbody>
          </table>
          {/* <table>
            <thead>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Balanceamento</th>
            </thead>
            <tbody>
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
            </tbody>
          </table> */}
          <button>Adicionar Cliente</button>
        </SplitterContainer>

        <br />
        <ButtonContainer>
          <Button onClick={() => addSplitter(all.viewCto.data.id)}>
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
