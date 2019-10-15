import React from "react";

//UI-Components
import { Modal, Card, ListGroup, Button } from "react-bootstrap";
import Account from "@material-ui/icons/AccountCircle";

//Reecriação de componentes
// import { Field } from "./Components/Input";
// import { InputField } from "./Components/InputFieldComponent";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as ClientActions } from "../../../redux/store/ducks/cliente";
import { Creators as MapActions } from "../../../redux/store/ducks/map";
import { Creators as CaboActions } from "../../../redux/store/ducks/cabo";

function ViewClient(props) {
  const { viewClient } = props.redux.client;

  const { data } = viewClient; //Informações do usuario.

  function handleHideModal() {
    const { hideClientViewModal } = props;
    hideClientViewModal();
  }

  return (
    <>
      <Modal size="lg" show={viewClient.visible} onHide={handleHideModal}>
        <Modal.Header
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F7D358"
          }}
        >
          <h6 style={{ fontSize: "10px" }}>Data</h6>
          <Account
            style={{
              display: "block",
              fontSize: "50px",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          />
          <Modal.Title style={{ color: "#585858" }}>Nome</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#FFFFFF" }}>
          <Card style={{ width: "100%" }}>
            <Card.Header
              style={{ backgroundColor: "#D8D8D8", textAlign: "center" }}
            >
              Informações do cliente
            </Card.Header>
            <ListGroup variant="flush"></ListGroup>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info">Salvar Alterações</Button>
          {data.status === null ? (
            <Button variant="primary">Ativar cliente</Button>
          ) : (
            <Button variant="danger">Desativar</Button>
          )}
          <Button variant="danger">Excluir</Button>
          <Button variant="secondary">Adicionar Cabo</Button>
          <Button variant="secondary">Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  redux: state
});

//Ações
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...ClientActions, ...MapActions, ...CaboActions },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewClient);
