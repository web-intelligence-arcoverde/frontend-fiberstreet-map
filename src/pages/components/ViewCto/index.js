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
import { ClientRequest } from "http";

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
  const [clientes, setClientes] = useState([]);
  const [splitters, setSplitters] = useState([]);
  const [saidasSplitter, setSaidasSplitter] = useState([]);

  /** useEffect para obter os Splitters pelo id da cto */
  useEffect(() => {
    async function getSplitters(id) {
      await api
        .get(`/get/splitter/cto/${id}`)
        .then(response => {
          const sp = response.data;
          // alert(JSON.stringify(response.data));
          setSplitters(sp);
          getClientes(sp[0].id);
        })
        .catch(e => console.warn(e));
    }
    getSplitters(all.viewCto.data.id);
  }, [all.viewCto.data.id]);

  function getClientes(splitterId) {
    console.tron.log(splitterId);
    api
      .get(`saidasplitter/splitter/${splitterId}/clientes`)
      .then(result => {
        const { data: saidas } = result;
        console.tron.log(saidas);

        setSaidasSplitter(saidas);
        console.tron.log(saidasSplitter);
      })
      .catch(err => console.tron.log(err));
  }

  useEffect(() => {
    console.tron.log({
      useEffect: saidasSplitter.saidas
    });
    console.tron.log(saidasSplitter.saidas);

    setClientes(saidasSplitter.saidas);
  }, [saidasSplitter]);

  // useEffect(() => {
  //   async function obterClientePorSplitter() {
  //     await api
  //       .get(`saidasplitter/cliente/${splitters[0]}`)
  //       .then()
  //       .catch(e => console.warn(e))
  //   }
  // }, [all.viewCto.visible]);

  /** Obtém os clientes por cada saída do splitter existente */
  // useEffect(() => {
  //   function getSaidaSpWithClientes(splitterId) {
  //     api.get(`/get/cliente/splitter/${splitterId}`).then(response => {
  //       const saidaSplitter = response.data;
  //       setSaidasSplitter(saidaSplitter);
  //     });
  //   }
  //   getSaidaSpWithClientes(all.viewCto.data.id);
  // }, [all.viewCto.data.id]);

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
          <h3>Splitter</h3>

          <table>
            <thead>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Balanceamento</th>
              <th>Fibra Aliment.</th>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">2 Span's</td>
                <td colspan="1">1 Span</td>
              </tr>

              {splitters.map((splitter, index) => (
                <>
                  <tr>
                    <td style={{ color: "rgb(20,30,40)" }}>{splitter.nome}</td>
                    <td style={{ color: "rgb(20,30,40)" }}>
                      {splitter.modelo}
                    </td>
                    <td style={{ color: "rgb(20,30,40)" }}>
                      {splitter.balanceamento}
                    </td>
                    <td style={{ color: "rgb(20,30,40)" }}>Em const.</td>
                  </tr>
                  {/* Tabela com os clientes */}
                  <table>
                    <thead>
                      <th>Nome</th>
                      <th>PPPoE</th>
                      <th>Endereço</th>
                    </thead>
                    <tbody>
                      {clientes &&
                        clientes.map(cliente => (
                          <tr>
                            <td
                              style={{
                                // color: "rgb(22,255,3)"
                                color: "#000"
                              }}
                            >
                              {cliente.Cliente.nome}
                            </td>
                            <td style={{ color: "#000" }}>
                              {cliente.Cliente.usuario_pppoe}
                            </td>
                            <td style={{ color: "#000" }}>
                              {cliente.Cliente.endereco}
                            </td>
                          </tr>
                        ))}
                      {clientes &&
                        clientes.map(cliente => {
                          api.get("");
                        })}
                    </tbody>
                  </table>
                </>
              ))}
            </tbody>
          </table>
        </SplitterContainer>

        <br />
        <ButtonContainer>
          <Button
            onClick={() => {
              if (splitters[0]) {
                alert("Esta cto já possui um módulo");
              } else {
                addSplitter(all.viewCto.data.id);
              }
            }}
          >
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
