import React, { useState, useEffect } from "react";
import { Container, Button, MoreInfo } from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";

function LeftSelector(props) {
  const [dropDownOne, setDropDownOne] = useState(false);
  const [backColor, setBackColor] = useState(['#8123']);
  const { openModalCto } = props;
  // const { cto } = props.redux;


  return (
    <>
      <Container>
        <Button onClick={() => alert("Testing")}>
          <p>None</p>
        </Button>
        <Button>
          <p onClick={() => setDropDownOne(!dropDownOne)}>ADD</p>
          {dropDownOne == false ? (
            <></>
          ) : (
            <p onClick={() => openModalCto('true')}>CTO</p>
          )}
          {dropDownOne == false ? (
            <></>
          ) : (
            <p onClick={() => alert("Adicionar SPLITTER")}>SPLITTER</p>
          )}
          {dropDownOne == false ? (
            <></>
          ) : (
            <p onClick={() => alert("Adicionar CEO")}>CEO</p>
          )}
          {dropDownOne == false ? (
            <></>
          ) : (
            <p onClick={() => alert("Adicionar CLIENTE")}>CLIENTE</p>
          )}
          {dropDownOne == false ? <></> : <p />}
        </Button>
        <Button>
          <p>CLIENTE</p>
        </Button>
      </Container>      
    </>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeftSelector);
