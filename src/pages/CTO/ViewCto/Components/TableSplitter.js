import React from "react";

//UI-Components
import { Table, Button } from "react-bootstrap";
import { Container } from "@material-ui/core";

//Conectores
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators
import { Creators as splitterCreators } from "../../../../redux/store/ducks/splitter";
import { Creators as ctosCreators } from "../../../../redux/store/ducks/ctos";

function TableSplitter(props) {
  const { modalNewSplitter } = props.redux.splitter;

  const { data } = props.redux.ctos.viewCto;

  console.log("informações da cto {splitter(id)}");
  console.log(data.id); //pegando o id da cto selecionada.

  //   function getSplitters(id) {
  //     api
  //       .get(`/get/splitter/cto/${id}`)
  //       .then(response => {
  //         const sp = response.data;
  //         setSplitters(sp);
  //         getClientes(sp[0].id);
  //         getCabosCto(id);
  //       })
  //       .catch(e => console.warn(e));
  //   }
  //   getSplitters(all.viewCto.data.id);
  // }, [all.viewCto.data.id]);

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
      >
        Adicionar splitter
      </Button>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSplitter);
