import React, { useState } from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//API
import api, { API } from "../../../services/api";

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

  const [splitterId, setSplitterId] = useState("");

  console.log("PROSPSSSDOJFJOSJOFOJGOJGFJOGOJFGJOFGJO");
  console.log(props);
  console.log(props.redux.map.coordenadas);

  function addCabo() {
    let latitude = JSON.parse(props.redux.map.coordenadas).latitude;
    let longitude = JSON.parse(props.redux.map.coordenadas).longitude;
    let coord = [longitude, latitude];

    const {
      addCoordCabo,
      setDelemitationMap,
      hideClientViewModal,
      addCableClient
    } = props;
    setDelemitationMap("cabo");
    let arrayDeArray = new Array(coord);
    addCableClient(data.id);
    addCoordCabo(arrayDeArray);
    hideClientViewModal();
  }

  function handleCoordCabo() {
    api
      .get(`${API.GET_SAIDA_SP_BY_CLIENTE}/${data.id}`)
      .then(result => {
        const { data } = result;
        console.log(data);
        const { id, splitter_cod } = data;
        setSplitterId(splitter_cod);

        if (splitter_cod) {
          alert("Este cliente já possui um drop em sua residência");
        } else {
          addCabo();
        }
      })
      .catch(err => {
        console.warn(err);
      });
  }

  console.log("informações do cliente");
  console.log(data);
  console.log(props.hideClientViewModal);

  function handleHideModal() {
    const { hideClientViewModal } = props;
    hideClientViewModal();
  }

  return (
    <>
      <CommentDialog />

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
          <h6 style={{ fontSize: "10px" }}>{data.created_at}</h6>
          <Account
            style={{
              display: "block",
              fontSize: "50px",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          />
          <Modal.Title style={{ color: "#585858" }}>{data.name}</Modal.Title>
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
                <InputField name="Nome:" atributo={data.name} tipo="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField name="CPF:" atributo={data.cpf} tipe="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField name="Plano:" atributo={data.speed} tipo="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField name="PPPOE:" atributo={data.pppoe} tipo="text" />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField
                  name="Data da instalação:"
                  atributo={data.installation_date}
                  tipo="date"
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <InputField
                  name="Comentario:"
                  atributo={data.obs}
                  tipo="text"
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => addCabo()}>
            Adicionar Cabo
          </Button>
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
