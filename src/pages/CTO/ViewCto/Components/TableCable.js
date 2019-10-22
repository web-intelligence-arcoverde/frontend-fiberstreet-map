import React from "react";

import { Creators as ctosActions } from "../../../../redux/store/ducks/ctos";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//UI-Components
import { Button, Modal, Container, Table } from "react-bootstrap";
import Cable from "@material-ui/icons/SettingsInputComponent";
import { Edit } from "@material-ui/icons";
import Delete from "@material-ui/icons/HighlightOff";

function viewCable(props) {
  console.log("Informações dos props");
  console.log(props);

  const { visible } = props.redux.ctos.viewCable;
  const { hideModalCable } = props;

  return (
    <Container>
      <Modal show={visible} onHide={hideModalCable} size="lg">
        <Modal.Title
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F7D358",
            paddingTop: "15px",
            paddingBottom: "10px"
          }}
        >
          <h2>Informações dos cabos da caixa</h2>
          <Button variant="secondary">
            <Cable />
          </Button>
        </Modal.Title>
        <Modal.Body>
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
                      borderBottomWidth: "0px"
                    }}
                  >
                    <Edit style={{ color: "#6c757d" }} />
                  </Button>

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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="secondary" type="submit">
              Adicionar um novo cabo
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(viewCable);
