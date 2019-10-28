import React from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//UI-Components
import { Button, Container, Table } from "react-bootstrap";
import Delete from "@material-ui/icons/HighlightOff";

function viewCable(props) {
  console.log("Informações cable");
  console.log(props);

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Obs</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Exemplo</td>
            <td>Exemplo</td>
            <td>eofwpoefkweokf</td>
            <td>8</td>
            <td>
              <Button
                variant="link"
                style={{
                  borderTopWidth: "0px",
                  paddingTop: "0px",
                  borderLeftWidth: "0px",
                  paddingLeft: "0px",
                  paddingBottom: "0px",
                  paddingRight: "0px",
                  borderRightWidth: "0px",
                  borderBottomWidth: "0px",
                  marginLeft: "5px",
                  marginRight: "5px"
                }}
              >
                <Delete style={{ color: "#6c757d" }} />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
          marginBottom: "10px"
        }}
      >
        <Button variant="secondary" type="submit">
          Adicionar um novo cabo
        </Button>
      </div>
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
)(viewCable);
