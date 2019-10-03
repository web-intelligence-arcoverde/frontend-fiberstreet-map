import React from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators que era para ser usado.
import { Creators as clientCreators } from "../../../redux/store/ducks/cliente";

//EditComponents
import InputField from "./Components/InputFieldComponent";
import CommentDialog from "./Components/DialogComment";

//UI-Components
import { Modal, Card, ListGroup, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Account from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function ViewCliente(props) {
  const { hideClientModal } = props;
  const { viewClient } = props.redux.client;

  const classes = useStyles();
  const { data } = viewClient; //Informações do usuario.

  let {
    provider_id,
    name,
    cpf,
    speed,
    pppoe,
    obs,
    installation_date,
    created_at
  } = data;

  return (
    <>
      <CommentDialog />

      <Modal size="lg" show={viewClient.visible} onHide={hideClientModal}>
        <Modal.Header
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F7D358"
          }}
        >
          <h6 style={{ fontSize: "10px" }}>23/08/2018</h6>
          <Account
            style={{
              display: "block",
              fontSize: "50px",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          />
          <Modal.Title style={{ color: "#585858" }}>
            Lucas Henrique Paes De carvalho
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#FFFFFF" }}>
          <Card style={{ width: "100%" }}>
            <Card.Header
              style={{ backgroundColor: "#D8D8D8", textAlign: "center" }}
            >
              Informações do cliente
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <InputField name="Nome:" atributo="Lucas" tipo="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField name="CPF:" atributo="111.111.111-11" tipe="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField name="Plano:" atributo="1gb" tipo="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField
                  name="PPPOE:"
                  atributo="00000000@teste"
                  tipo="text"
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField
                  name="Data da instalação:"
                  atributo=""
                  tipo="date"
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField
                  name="Comentario:"
                  atributo="Mora lá na casa "
                  tipo="text"
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>

        <Modal.Footer>
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
  bindActionCreators({ ...clientCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCliente);
