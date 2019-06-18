import React, { useState, useEffect } from "react";
import { Container, Button, MoreInfo } from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import Modal from "react-modal";

// Modal.setAppElement(document.getElementById('root'))

function LeftSelector(props) {
  const [dropDownOne, setDropDownOne] = useState(false);
  const [backColor, setBackColor] = useState(["#8123"]);
  const { openModalCto, showModalCto, setDelimitacaoMapa } = props;
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
