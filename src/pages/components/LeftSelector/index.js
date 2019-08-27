import React, { useState, useEffect } from "react";
import { Container, Button, MoreInfo } from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";

import Modal from "react-modal";
// import jssPluginPropsSort from "jss-plugin-props-sort";

// Modal.setAppElement(document.getElementById('root'))

function LeftSelector(props) {
  const [dropDownOne, setDropDownOne] = useState(false);
  const [backColor, setBackColor] = useState(["#8123"]);
  const {
    openModalCto,
    showModalCto,
    setDelimitacaoMapa,
    addCoordCabo,
    showAddNewCaboModalReserva
  } = props;
  // const { cto } = props.redux;

  return (
    <>
      {/* <Modal
      isOpen={true}
    > */}
      <Container>
        <Button onClick={() => alert("Testing")}>
          <p>None</p>
        </Button>
        <Button>
          <p onClick={() => setDropDownOne(!dropDownOne)}>ADD</p>
          {dropDownOne == false ? (
            <></>
          ) : (
            <p
              onClick={() => {
                // Aqui selecionaremos o tipo de delimitação do clique no mapa
                setDelimitacaoMapa("cto");
                setDropDownOne(!dropDownOne);
                // showModalCto();
              }}
            >
              CTO
            </p>
          )}
          {dropDownOne == false ? (
            <></>
          ) : (
            <p
              onClick={() => {
                setDelimitacaoMapa("splitter");
                setDropDownOne(!dropDownOne);
              }}
            >
              SPLITTER
            </p>
          )}
          {dropDownOne == false ? (
            <></>
          ) : (
            <p
              onClick={() => {
                setDelimitacaoMapa("ceo");
                setDropDownOne(!dropDownOne);
              }}
            >
              CEO
            </p>
          )}
          {dropDownOne == false ? (
            <></>
          ) : (
            <p
              onClick={() => {
                setDelimitacaoMapa("cliente");
                setDropDownOne(!dropDownOne);
              }}
            >
              CLIENTE
            </p>
          )}
          {dropDownOne == false ? <></> : <p />}
        </Button>
        <Button>
          <p onClick={() => setDropDownOne(!dropDownOne)}>CLIENTE</p>
          {dropDownOne == false ? (
            <></>
          ) : (
            <p
              onClick={() => {
                setDelimitacaoMapa("viabilidade");
                setDropDownOne(!dropDownOne);
              }}
            >
              Viabilidade
            </p>
          )}
          {dropDownOne == false ? (
            <></>
          ) : (
            <p
              onClick={() => {
                setDelimitacaoMapa("cliente");
                setDropDownOne(!dropDownOne);
              }}
            >
              Adicionar
            </p>
          )}
        </Button>
        <Button>
          <p
            onClick={() => {
              setDropDownOne(!dropDownOne);
            }}
          >
            Cabo
          </p>
          {dropDownOne == false ? (
            <></>
          ) : (
            <p
              onClick={() => {
                setDelimitacaoMapa("cabo");
                setDropDownOne(!dropDownOne);
                // showModalCto();
              }}
            >
              Add Cabo
            </p>
          )}
          {props.redux.all.mapa.delimitacao === "cabo" && (
            <p
              onClick={() => {
                // Aqui iremos criar o cabo para adicionarmos no banco de dados
                // Aqui iremos fazeer abrir um modal para começarmos adicionar os dados do cabo como nome,
                // tipo e quantidade de fibras inicio e final de coordenadas
                // alert(JSON.stringify(props.redux.all.mapa.polyline))
                const { showAddCaboModal } = props;
                let coordenadasFinais = props.redux.all.mapa.polyline;
                addCoordCabo(coordenadasFinais);
                showAddNewCaboModalReserva(props.redux.ctos.ctoId);
                setDelimitacaoMapa("default");
              }}
            >
              FINALIZAR ADIÇÃO
            </p>
          )}
          {props.redux.all.mapa.delimitacao === "cabo" && (
            <>
              <p
                onClick={() => {
                  // alert("Ao clicar aqui, a última linha do cabo será apagada");
                  let lastPolyline = props.redux.all.mapa.polyline;
                  if (!(lastPolyline.length === 1)) {
                    lastPolyline.pop();
                    addCoordCabo([]);
                    addCoordCabo(lastPolyline);
                    setDelimitacaoMapa("cabo");
                  }
                }}
              >
                Voltar
              </p>
            </>
          )}
        </Button>
      </Container>
      {/* </Modal> */}
    </>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...Actions, ...CaboCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSelector);
