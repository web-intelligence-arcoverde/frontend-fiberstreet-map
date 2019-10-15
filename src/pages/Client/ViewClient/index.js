import React, { useState, useEffect } from "react";
import moment from "moment";

//UI-Components
import { Modal, Card, ListGroup, Button } from "react-bootstrap";
import Account from "@material-ui/icons/AccountCircle";

//Reecriação de componentes
import { Field } from "./Components/InputBase";
import { InputField } from "./Components/InputFieldComponent";
// import { InputField } from "./Components/Input";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as ClientActions } from "../../../redux/store/ducks/cliente";
import { Creators as MapActions } from "../../../redux/store/ducks/map";
import { Creators as CaboActions } from "../../../redux/store/ducks/cabo";

function formatDate(data) {
  const date = moment(data).format("YYYY-MM-DD");
  return date;
}

function ViewClient(props) {
  const { viewClient } = props.redux.client;

  const { data } = viewClient; //Informações do usuario.

  const [id, setId] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [pppoe, setPppoe] = useState("");
  const [address, setAddress] = useState("");
  const [installation, setInstallation] = useState("");
  const [obs, setObs] = useState("");
  const [teste, setTeste] = useState(true);

  function handleHideModal() {
    const { hideClientViewModal } = props;
    hideClientViewModal();
    setId("");
    setCpf("");
    setName("");
    setSpeed("");
    setPppoe("");
    setAddress("");
    setInstallation("");
    setObs("");
  }

  useEffect(() => {
    firstLoad();
  }, [viewClient.visible]);

  function click(e) {
    setTeste(!teste);
  }

  function firstLoad() {
    setAddress(data.address);
    setId(data.id);
    setCpf(data.cpf);
    setName(data.name);
    setSpeed(data.speed);
    setPppoe(data.pppoe);
    setInstallation(formatDate(data.installation_date));
    setTeste(data.status);
    setObs(data.obs);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { coordinates } = data.coordinates;

    const { updateClientRequest } = props;
    const updateClient = {
      id: data.id,
      address: address,
      cpf: cpf,
      name: name,
      coordinates: coordinates,
      speed: speed,
      pppoe: pppoe,
      obs: obs,
      installation_date: formatDate(installation)
    };
    updateClientRequest(updateClient, data.id);
    handleHideModal();
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
        <form onSubmit={handleSubmit}>
          <Modal.Body style={{ backgroundColor: "#FFFFFF" }}>
            <Card style={{ width: "100%" }}>
              <Card.Header
                style={{ backgroundColor: "#D8D8D8", textAlign: "center" }}
              >
                Informações do cliente
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Field
                    component={InputField}
                    name={"CPF:"}
                    type={"text"}
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    component={InputField}
                    name={"Nome:"}
                    type={"text"}
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    component={InputField}
                    name={"Plano:"}
                    type={"text"}
                    value={speed}
                    onChange={e => setSpeed(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    component={InputField}
                    name={"PPPOE:"}
                    type={"text"}
                    value={pppoe}
                    onChange={e => setPppoe(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    component={InputField}
                    name={"Endereço:"}
                    type={"text"}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    component={InputField}
                    name={"Data de instalação:"}
                    type={"date"}
                    value={installation}
                    onChange={e => setInstallation(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    component={InputField}
                    name={"Observação:"}
                    type={"text"}
                    value={obs}
                    onChange={e => setObs(e.target.value)}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="info" type="submit">
              Salvar Alterações
            </Button>
            {teste === null ? (
              <Button variant="primary" onClick={click}>
                Ativar cliente
              </Button>
            ) : (
              <Button variant="danger" onClick={click}>
                Desativar
              </Button>
            )}
            <Button variant="danger">Excluir</Button>
            <Button variant="secondary">Adicionar Cabo</Button>
            <Button variant="secondary">Fechar</Button>
          </Modal.Footer>
        </form>
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
