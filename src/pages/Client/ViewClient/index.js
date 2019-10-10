import React, { useState } from "react";
import moment from "moment";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//API
import api, { API } from "../../../services/api";

//Creators
import { Creators as ClientActions } from "../../../redux/store/ducks/cliente";
import { Creators as MapActions } from "../../../redux/store/ducks/map";
import { Creators as CaboActions } from "../../../redux/store/ducks/cabo";

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
  const classes = useStyles();

  const { viewClient } = props.redux.client;

  const { data } = viewClient; //Informações do usuario.

  const [splitterId, setSplitterId] = useState("");

  function handleHideModal() {
    const { hideClientViewModal } = props;
    hideClientViewModal();
  }

  function addCabo() {
    let latitude = JSON.parse(data.coordinates).latitude;
    let longitude = JSON.parse(data.coordinates).longitude;
    let coord = [longitude, latitude];

    const {
      addCoordCabo, // setPolyline
      setDelemitationMap,
      addCableClientId
    } = props;

    setDelemitationMap("cabo"); // map - map.delimitacao
    let arrayDeArray = new Array(coord);
    addCoordCabo(arrayDeArray); // map - map.polyline
    addCableClientId(data.id); // cabo - cabo.id
    handleHideModal();
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

  function deleteClient() {
    const { id } = data;
    const { deleteClientRequest } = props;
    deleteClientRequest(id);
    handleHideModal();
  }

  function formatDate(data) {
    const date = moment(data).format("DD/MM/YYYY");
    return date;
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
          <h6 style={{ fontSize: "10px" }}>{formatDate(data.created_at)}</h6>
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
          {data.status === null ? (
            <Button variant="primary" onClick={deleteClient}>
              Ativar cliente
            </Button>
          ) : (
            <Button variant="danger" onClick={deleteClient}>
              Desativar
            </Button>
          )}
          <Button variant="danger" onClick={deleteClient}>
            Excluir
          </Button>
          <Button variant="secondary" onClick={addCabo}>
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
  bindActionCreators(
    { ...ClientActions, ...MapActions, ...CaboActions },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCliente);
