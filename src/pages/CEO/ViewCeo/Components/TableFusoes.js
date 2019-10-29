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

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Bandeja</th>
            <th>Cabo</th>
            <th>Fibra</th>
            <th style={{ textAlign: "center" }}>x</th>
            <th>Fibra</th>
            <th>Cabo</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>b01</td>
            <td>40gf</td>
            <td>1</td>
            <td>8</td>
            <td>dfv</td>
            <td>33sd</td>

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
        <Button variant="secondary" type="submit" style={{ width: "100%" }}>
          Adicionar uma nova fusão
        </Button>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ceoCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewFusoes);
