import React, { useState, useEffect } from "react";
import { Container, Button, MoreInfo } from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import Modal from "react-modal";
import jssPluginPropsSort from "jss-plugin-props-sort";

// Modal.setAppElement(document.getElementById('root'))

function LeftSelector(props) {
  const [dropDownOne, setDropDownOne] = useState(false);
  const [backColor, setBackColor] = useState(["#8123"]);
  const {
    openModalCto,
    showModalCto,
    setDelimitacaoMapa,
    addCoordCabo
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
          {props.redux.all.mapa.delimitacao === "cabo" && (
            <>
              <p
                onClick={() => {
                  alert("Ao clicar aqui, a última linha do cabo será apagada");
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

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSelector);
