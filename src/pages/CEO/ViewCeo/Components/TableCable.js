import React from "react";

// redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//Creators redux
import { Creators as ceoCreators } from "../../../../redux/store/ducks/ceo";

//UI-Components
import { Button, Container, Table } from "react-bootstrap";
import Delete from "@material-ui/icons/HighlightOff";

function ViewFusoes(props) {
  console.log("Informações cable");
  console.log(props);

  const { cables } = props.fiberfusion;

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            {/* <th>Bandeja</th> */}
            <th>Cabo</th>
            {/* <th>Fibra</th> */}
            {/* <th style={{ textAlign: "center" }}>x</th> */}
            <th>Quantidade de Fibras</th>
            {/* <th>Cabo</th> */}
            <th>Observação</th>
            {/* <th>Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {cables.map((cable, index) => (
            <tr>
              <td>{cable.cable.name}</td>
              <td>{cable.cable.fiberAmount}</td>
              <td>{cable.cable.obs}</td>

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
          ))}
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
        <Button variant="secondary" type="submit" style={{ width: "100%" }}>
          Adicionar um novo cabo
        </Button>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state,
  fiberfusion: state.fiberfusion
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ceoCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewFusoes);
