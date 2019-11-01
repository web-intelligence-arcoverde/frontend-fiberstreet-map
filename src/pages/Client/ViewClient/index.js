import React, { useState, useEffect } from "react";
import moment from "moment";

//UI-Components
import { Modal, Card, ListGroup, Button } from "react-bootstrap";
import Account from "@material-ui/icons/AccountCircle";

//Reecriação de componentes
import { Field } from "./Components/InputBase";
import { InputField } from "./Components/InputFieldComponent";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as ClientActions } from "../../../redux/store/ducks/cliente";
import { Creators as MapActions } from "../../../redux/store/ducks/map";
import { Creators as CaboActions } from "../../../redux/store/ducks/cabo";
import { Creators as DropActions } from "../../../redux/store/ducks/drop";
import { toastr } from "react-redux-toastr";
import api from "../../../services/api";

function ViewClient(props) {
  const { viewClient } = props.redux.client;
  const { data } = viewClient; //Informações do usuario.

  const [id, setId] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfUnmasked, setCpfUnmasked] = useState("");
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
      cpf: cpfUnmasked,
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

  function addCabo() {
    let latitude;
    let longitude;
    try {
      latitude = JSON.parse(data.coordinates).latitude;
      longitude = JSON.parse(data.coordinates).longitude;
    } catch (err) {
      latitude = data.coordinates.latitude;
      longitude = data.coordinates.longitude;
    }

    let coord = [longitude, latitude];

    const {
      addCoordCabo, // setPolyline
      setDelemitationMap,
      addCableClientId,
      addDropClientId
    } = props;

    setDelemitationMap("cabo"); // map - map.delimitacao
    let arrayDeArray = new Array(coord);
    addCoordCabo(arrayDeArray); // map - map.polyline
    addCableClientId(data.id); // cabo - cabo.id
    addDropClientId(data.id);
    handleHideModal();
  }

  //Mudar status
  function changeStatus(e) {
    if (e) {
      if (status === null) {
        setStatus("active");
        console.log("Estava Null");
      } else if (status === "active") {
        console.log("Estava active");
        setStatus(null);
        console.log(moment().format("YYYY-MM-DD"));
      }
    }
  }

  function cpfCnpj(v) {
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");
    if (v.length <= 11) {
      //CPF
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (v.length <= 14) {
      //CNPJ
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return v;
  }

  //Excluir cliente
  function deleteClient() {
    const { deleteClientRequest } = props;
    deleteClientRequest(data.id);
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
                    required
                    minLength="5"
                    maxLength="100"
                    component={InputField}
                    name={"CPF:"}
                    type={"text"}
                    value={cpf}
                    onChange={e => {
                      setCpfUnmasked(e.target.value);
                      setCpf(cpfCnpj(e.target.value));
                    }}
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

          <Modal.Footer>
            <Button variant="info" type="submit">
              Salvar Alterações
            </Button>
            {status === null ? (
              <Button variant="primary" onClick={changeStatus}>
                Ativar cliente
              </Button>
            ) : (
              <Button variant="danger" onClick={changeStatus}>
                Desativar
              </Button>
            )}
            <Button variant="danger" onClick={deleteClient}>
              Excluir
            </Button>
            <Button
              hidden={unvisibleAddCable}
              variant="secondary"
              onClick={addCabo}
            >
              Adicionar Cabo
            </Button>
            <Button variant="secondary" onClick={handleHideModal}>
              Fechar
            </Button>
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
    { ...ClientActions, ...MapActions, ...CaboActions, ...DropActions },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewClient);
