import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Creators as CtoCreators } from "../../../redux/store/ducks/ctos";
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
  const [cabos, setCabos] = useState([]);

  const { setDelimitacaoMapa, addCoordCabo, addCtoId } = props;

  /** useEffect para obter os Splitters pelo id da cto */
  useEffect(() => {
    async function getSplitters(id) {
      await api
        .get(`/get/splitter/cto/${id}`)
        .then(response => {
          const sp = response.data;
          setSplitters(sp);
          getClientes(sp[0].id);
          getCabosCto(id);
        })
        .catch(e => console.warn(e));
    }
    getSplitters(all.viewCto.data.id);
  }, [all.viewCto.data.id]);

  function getClientes(splitterId) {
    api
      .get(`saidasplitter/splitter/${splitterId}/clientes`)
      .then(result => {
        const { data: saidas } = result;
        setSaidasSplitter(saidas);
      })
      .catch(err => console.log(err));
  }

  function getCabosCto(ctoId) {
    api
      .get(`cabo/get/cto/${ctoId}`)
      .then(response => {
        const { data } = response;
        setCabos(data);
      })
      .catch(err => console.warn(err));
  }

  useEffect(() => {
    setClientes(saidasSplitter.saidas);
  }, [saidasSplitter]);

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
              {splitters.map((splitter, index) => (
                <>
                  <tr>
                    <td style={{ color: "rgb(20,30,40)" }}>{splitter.nome}</td>
                    <td style={{ color: "rgb(20,30,40)", textAlign: "center" }}>
                      {splitter.modelo}
                    </td>
                    <td style={{ color: "rgb(20,30,40)", textAlign: "center" }}>
                      {splitter.balanceamento}
                    </td>
                    <td style={{ color: "rgb(20,30,40)" }}>Em const.</td>
                  </tr>
                  {/* Tabela com os clientes */}
                  <h3 style={{ paddingTop: "5px" }}>Clientes</h3>
                  <tr>
                    <th>Nome</th>
                    <th>PPPoE</th>
                    <th>Endereço</th>
                    <th>Saída</th>
                  </tr>
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
                        <td style={{ textAlign: "center" }}>
                          {cliente.numero}
                        </td>
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          </table>
        </SplitterContainer>

        <SplitterContainer>
          <h3>Cabos</h3>
          <table>
            <thead>
              <th>Nome</th>
              <th>Modelo</th>
              <th>N° Fibras</th>
              <th>Fibra Aliment.</th>
            </thead>
            <tbody>
              {cabos.map(cabo => (
                <tr>
                  <td>{cabo.Cabo.nome}</td>
                  <td>{cabo.Cabo.tipo}</td>
                  <td>{cabo.Cabo.quantidade_fibras}</td>
                  <td>Des..</td>
                </tr>
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
          <Button
            onClick={() => {
              handleHideModal();
              setDelimitacaoMapa("cabo");
              let coordenadasObjs = JSON.parse(data.coordenadas);
              let arrayCoordenadas = [];
              arrayCoordenadas[0] = coordenadasObjs.longitude;
              arrayCoordenadas[1] = coordenadasObjs.latitude;
              // console.tron.log(arrayCoordenadas);
              addCoordCabo([arrayCoordenadas]);
              addCtoId(data.id);
            }}
          >
            Adicionar Cabo
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...Actions, ...CtoCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCto);
