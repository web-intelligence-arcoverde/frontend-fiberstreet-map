import React, { useState } from "react";
import api, { API } from "../../../services/api";
// import propTypes from "prop-types";

import "./styles.css";

// redux
// import { canAddCoordenadas } from "../../../redux/store/actions/all";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as ClienteCreators } from "../../../redux/store/ducks/all";
// import { obterDadosDoServidor } from "../../../services/handleInformation";
import * as Actions from "../../../redux/store/actions/all";

//UI-Components
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// Vamos fazer aqui uma renderização condicional para ADIÇÃO/AMOSTRAGEM de imagens

function ClienteAddModal(props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [pppoe, setPppoe] = useState("");
  const [data_instalacao, setDtInstall] = useState("");

  const NAME = "nome";
  const COORD = "coordenadas";
  const CPF = "cpf";
  const VELOCIDADE = "velocidade";
  const PPPOE = "pppoe";
  const DTINSTALL = "data_instalacao";
  const { all } = props.redux;

  function handleChange(event, mode) {
    const { value } = event.target;

    switch (mode) {
      case NAME:
        setNome(value);
        break;
      case COORD:
        setCoordenadas(value);
        break;
      case CPF:
        setCpf(value);
        break;
      case VELOCIDADE:
        setVelocidade(value);
        break;
      case PPPOE:
        setPppoe(value);
        break;
      case DTINSTALL:
        setDtInstall(value);
        break;
    }
  }

  // useEffect(() => {
  //   function set() {
  //     setCoordinates(JSON.stringify(props.redux.coordenadas));
  //   }
  //   set();
  // }, [props.redux.coordenadas]);

  function handleHideModal() {
    const { hideAddClienteModal } = props;
    hideAddClienteModal();
    setNome("");
    setCpf("");
    setCoordenadas("");
    setVelocidade("");
    setPppoe("");
    setDtInstall("");
  }

  async function handleCliente(e) {
    e.preventDefault();
    const { coordinates } = props.redux.all.modalCliente;
    const cliente = {
      nome: nome,
      cpf: cpf,
      coordenadas: JSON.stringify(coordinates),
      velocidade,
      usuario_pppoe: pppoe,
      data_instalacao
    };

    await api
      .post(API.CREATE_CLIENTE, cliente)
      .then(response => {
        handleHideModal();
        obterClientes();
      })
      .catch(err => console.warn(err));
  }

  async function obterClientes() {
    const { setClientFromServer } = props;
    await api
      .get(API.GET_CLIENTE)
      .then(result => {
        let data = result.data;
        setClientFromServer(data);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  // async function obterDadosDoServidor() {
  //   const { setClientFromServer } = props
  //   await api
  //     .get("/get/cliente")
  //     .then(result => {
  //       let data = result.data;
  //       setClientFromServer(data)
  //     })
  // }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={all.modalCliente.visible}
        onHide={handleHideModal}
        animation={false}
      >
        <Form onSubmit={event => handleCliente(event)}>
          <Modal.Header>
            <Row>
              <Col md={{ offset: 2 }}>
                <Modal.Title>Cadastro de Cliente</Modal.Title>
              </Col>
            </Row>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>CPF:</Form.Label>
              <Form.Control
                type="number"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Planos:</Form.Label>
              <Form.Control
                type="text"
                as="select"
                value={velocidade}
                onChange={e => setVelocidade(e.target.value)}
                required
              >
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>PPPOE:</Form.Label>
              <Form.Control
                type="text"
                value={pppoe}
                onChange={e => setPppoe(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Fechar
            </Button>

            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  redux: state
});

// const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
const mapDispatchToProps = dispatch =>
  bindActionCreators(ClienteCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteAddModal);

// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import api from "../../../services/api";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as Actions from "../../../redux/store/actions/all";
// import { Container, Form, Button } from "../modalStyles/styles";

// Modal.setAppElement(document.getElementById("root"));

// function ClienteAddModal(props) {
//   const [nome, setNome] = useState("");
//   const [cpf, setCpf] = useState("");
//   const [coordenadas, setCoordenadas] = useState("");
//   const [velocidade, setVelocidade] = useState("");
//   const [pppoe, setPppoe] = useState("");
//   const [data_instalacao, setDtInstall] = useState("");
//   const { modalCliente } = props.redux;

//   const NAME = "nome";
//   const COORD = "coordenadas";
//   const CPF = "cpf";
//   const VELOCIDADE = "velocidade";
//   const PPPOE = "pppoe";
//   const DTINSTALL = "data_instalacao";

//   function handleHideModal() {
//     const { hideClienteAddModal } = props;
//     hideClienteAddModal();
//   }

//   function handleChange(event, mode) {
//     const { value } = event.target;

//     switch (mode) {
//       case NAME:
//         setNome(value);
//         break;
//       case COORD:
//         setCoordenadas(value);
//         break;
//       case CPF:
//         setCpf(value);
//         break;
//       case VELOCIDADE:
//         setVelocidade(value);
//         break;
//       case PPPOE:
//         setPppoe(value);
//         break;
//       case DTINSTALL:
//         setDtInstall(value);
//         break;
//     }
//   }

//   function handleCliente() {
//     const { hideClienteAddModal } = props;
//     hideClienteAddModal();
//   }

//   return (
//     <Modal
//       isOpen={modalCliente.visible}
//       onRequestClose={handleHideModal}
//       contentLabel="Adicionar novo cliente"
//       className="modal-container"
//       overlayClassName="modal-overlay"
//     >
//       <Container>
//         <Form>
//           <label for="sName">Nome Cliente</label>
//           <input
//             id="sName"
//             value={nome}
//             type="text"
//             name={nome}
//             placeholder="Insira o nome do Cliente"
//             required
//             onChange={e => handleChange(e, NAME)}
//           />
//           <label for="spCpf">CPF</label>
//           <input
//             id="spCpf"
//             value={cpf}
//             type="text"
//             name={CPF}
//             placeholder="Insira o número de cpf"
//             required
//             onChange={e => handleChange(e, CPF)}
//           />
//           <label for="coord">Coordenadas</label>
//           <input
//             id="coord"
//             value={JSON.stringify(props.redux.modalCliente.coordinates)}
//             type="text"
//             name={COORD}
//             placeholder="Coordenadas"
//             required
//             onChange={e => handleChange(e, COORD)}
//           />
//           <label for="v">Velocidade</label>
//           <input
//             id="v"
//             value={velocidade}
//             type="text"
//             name={VELOCIDADE}
//             placeholder="Coordenadas"
//             required
//             onChange={e => handleChange(e, VELOCIDADE)}
//           />

//           <hr />
//           <Button onClick={handleCliente}>Adicionar</Button>
//         </Form>
//       </Container>
//     </Modal>
//   );
// }

// const mapStateToProps = state => ({
//   redux: state
// });

// const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

// export default connect(
//   mapDispatchToProps,
//   mapStateToProps
// )(ClienteAddModal);
