import React, { useState, useEffect } from "react";

//UI-Components
import { Table, Button } from "react-bootstrap";
import { Container } from "@material-ui/core";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import api from "../../../../services/api";

//Creators
import { Creators as SplitterActions } from "../../../../redux/store/ducks/splitter";
import { Creators as CtoActions } from "../../../../redux/store/ducks/ctos";

function TableSplitter(props) {
  const { modalNewSplitter } = props.redux.splitter;

  const { data, visible } = props.redux.ctos.viewCto;

  const [splitters, setSplitters] = useState([]);
  const { hideViewModalCto } = props;

  console.log("informações da cto {splitter(id)}");
  console.log(data.id); //pegando o id da cto selecionada.

  useEffect(() => {
    function getSplitters(id) {
      api
        .get(`/splittercto/${id}`)
        .then(response => {
          const sp = response.data;
          setSplitters(sp);
          // getClientes(sp[0].id);
          // getCabosCto(id);
        })
        .catch(e => console.warn(e));
    }
    if (visible) getSplitters(data.id);
  }, [data.id, visible]);

  function handleAddSplitter() {
    const { showSplitterAddModal } = props;
    showSplitterAddModal(data.id);
  }

  return (
    <Container>
      <h2 style={{ color: "#F5DA81", textAlign: "center" }}>
        Informações do splitter
      </h2>

      <Table responsive>
        <thead>
          <tr style={{ backgroundColor: "#fff", color: "#6E6E6E" }}>
            <th>Nome</th>
            <th>Modelo</th>
            <th>Balanc.</th>
            <th>Fibra Aliment.</th>
          </tr>
        </thead>

        <tbody>
          {splitters.map(splitter => (
            <tr>
              <td>{splitter.name}</td>
              <td>{splitter.model}</td>
              <td>{splitter.balancing}</td>
              <td>Not have yet</td>
            </tr>
          ))}

          {/* {props.data.map((splitter, index) => (
            <tr>
              <td>{splitter.nome}</td>
              <td>{splitter.modelo}</td>
              <td>{splitter.balanceamento}</td>
              <td>Em const.</td>
            </tr>
          ))} */}
        </tbody>
      </Table>

      {splitters < 1 && (
        <Button
          style={{ color: "#fff", marginTop: "20px" }}
          variant="warning"
          size="lg"
          block
          onClick={() => {
            handleAddSplitter();
            hideViewModalCto();
          }}
        >
          Adicionar splitter
        </Button>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...SplitterActions,
      ...CtoActions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSplitter);
