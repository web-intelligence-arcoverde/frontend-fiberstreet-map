import React from "react";

//UI-Components
import { Table, Button } from "react-bootstrap";
import { Container } from "@material-ui/core";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as splitterCreators } from "../../../redux/store/ducks/splitter";

function TableSplitter(props) {
  const { modalNewSplitter } = props.redux.splitter;

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

      <Button
        style={{ color: "#fff", marginTop: "20px" }}
        variant="warning"
        size="lg"
        block
        onClick={modalNewSplitter.visible}
      >
        Adicionar splitter
      </Button>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...splitterCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSplitter);
