import React, { useState, useEffect } from "react";
import moment from "moment";

//UI-Components
import {
  Modal,
  Card,
  ListGroup,
  Button,
  Row,
  Col,
  Form
} from "react-bootstrap";
import Account from "@material-ui/icons/AccountCircle";

//Reecriação de componentes
import { Field } from "./Components/InputBase";
import { InputField } from "./Components/InputFieldComponent";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Functions
import { cpfMask } from "../../util/format";
import { positionObject } from "../../Functions/get-position-object/index";

//Creators
import { Creators as ClientActions } from "../../../redux/store/ducks/cliente";
import { Creators as MapActions } from "../../../redux/store/ducks/map";
import { Creators as CaboActions } from "../../../redux/store/ducks/cabo";
import { Creators as DropActions } from "../../../redux/store/ducks/drop";
import { toastr } from "react-redux-toastr";
import api from "../../../services/api";

//Container
import { Container } from "./CSS/styled";
import "./CSS/styled.css";

function ViewClient(props) {
  function changeCpf(e) {
    setCpf(cpfMask(e.target.value));
  }

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
  const [status, setStatus] = useState("");
  const [unvisibleAddCable, setUnvisibleAddCable] = useState(false);

  useEffect(() => {
    firstLoad();
    if (viewClient.visible) {
      api
        .get(`drops/${data.id}`)
        .then(response => {
          const { data } = response;
          if (data.id) {
            setUnvisibleAddCable(true);
          } else {
            setUnvisibleAddCable(false);
          }
        })
        .catch(err => {});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewClient.visible]);

  function firstLoad() {
    setAddress(data.address);
    setId(data.id);
    setCpf(data.cpf);
    setName(data.name);
    setSpeed(data.speed);
    setPppoe(data.pppoe);

    setStatus(data.status);
    setObs(data.obs);
    if (data.installation_date === null) {
      setInstallation(moment().format("YYYY-MM-DD"));
    } else {
      setInstallation(formatDate(data.installation_date));
    }
  }

  function formatDate(data) {
    const date = moment(data).format("YYYY-MM-DD");
    return date;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { coordinates } = data.coordinates;
    const { updateClientRequest } = props;
    const updateClient = {
      id: id,
      address: address,
      cpf: cpf,
      name: name,
      coordinates: coordinates,
      speed: speed,
      pppoe: pppoe,
      obs: obs,
      status: status,
      installation_date: installation
    };
    updateClientRequest(updateClient, id);
    handleHideModal();
  }

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
    setStatus("");
    setObs("");
  }

  function addCable() {
    const {
      addCoordCabo, // setPolyline
      setDelimitation,
      addCableClientId,
      addDropClientId,
      showIcons
    } = props;

    setDelimitation("cabo"); // map - map.delimitacao

    addCoordCabo(positionObject(data)); // map - map.polyline
    addCableClientId(data.id); // cabo - cabo.id
    addDropClientId(data.id);
    showIcons();
    handleHideModal();
  }

  //Mudar status
  function changeStatus(e) {
    if (e) {
      if (status === null) {
        setStatus("active");
      } else if (status === "active") {
        setStatus(null);
        moment().format("YYYY-MM-DD");
      }
    }
  }

  //Excluir cliente
  function deleteClient() {
    const { deleteClientRequest } = props;

    const options = {
      onOk: () => {
        deleteClientRequest(data.id);
        handleHideModal();
      },
      onCancel: () => {}
    };
    toastr.confirm("Deseja mesmo apagar o cliente?", options);
  }

  function move() {
    const { setDelimitation, setType } = props;
    handleHideModal();
    setType("client", data.id);
    setDelimitation("mover");
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
                    required
                    maxLength="18"
                    minLength="14"
                    component={InputField}
                    name={"CPF:"}
                    type={"text"}
                    value={cpf}
                    onChange={changeCpf}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    required
                    minLength="5"
                    maxLength="100"
                    component={InputField}
                    name={"Nome:"}
                    type={"text"}
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    required
                    component={InputField}
                    name={"Plano:"}
                    type={"text"}
                    value={speed}
                    onChange={e => setSpeed(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    required
                    minLength="5"
                    maxLength="100"
                    component={InputField}
                    name={"PPPOE:"}
                    type={"text"}
                    value={pppoe}
                    onChange={e => setPppoe(e.target.value)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Field
                    required
                    minLength="5"
                    maxLength="100"
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
                    type={"textarea"}
                    required
                    as="textarea"
                    rows="3"
                    maxLength="300"
                    value={obs}
                    onChange={e => setObs(e.target.value)}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Modal.Body>

          <Container>
            <Button variant="info" onClick={move} className="item">
              Mover
            </Button>
            <Button variant="info" type="submit" className="item">
              Salvar alterações
            </Button>
            {status === null ? (
              <Button variant="info" onClick={changeStatus} className="item">
                Ativar
              </Button>
            ) : (
              <Button variant="danger" onClick={changeStatus} className="item">
                Desativar
              </Button>
            )}

            <Button
              hidden={unvisibleAddCable}
              variant="secondary"
              onClick={addCable}
              className="item"
            >
              Adicionar Cabo
            </Button>
            <Button variant="danger" onClick={deleteClient} className="item">
              Excluir
            </Button>
            <Button variant="danger" onClick={handleHideModal} className="item">
              Fechar
            </Button>
          </Container>
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
    { ...ClientActions, ...MapActions, ...CaboActions, ...DropActions },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewClient);
