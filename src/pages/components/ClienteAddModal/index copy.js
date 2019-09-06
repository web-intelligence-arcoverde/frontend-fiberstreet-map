import React, { useState, useEffect } from "react";
import { Container, Form, Button, CoordForm } from "./styles";
import api from "../../../services/api";
// import propTypes from "prop-types";
import Modal from "react-modal";
import "./styles.css";

// redux
// import { canAddCoordenadas } from "../../../redux/store/actions/all";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Creators as ClienteCreators } from "../../../redux/store/ducks/all";
// import { obterDadosDoServidor } from "../../../services/handleInformation";
import * as Actions from "../../../redux/store/actions/all";

Modal.setAppElement(document.getElementById("root"));

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
      .post("/create/cliente", cliente)
      .then(response => {
        handleHideModal();
        obterClientes();
      })
      .catch(err => console.warn(err));
  }

  async function obterClientes() {
    const { setClientFromServer } = props;
    await api
      .post("/get/cliente")
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

  return (
    <Modal
      isOpen={all.modalCliente.visible}
      onRequestClose={handleHideModal}
      contentLabel="Adicionar novo cliente"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      {/* <Container> */}
      <Form onSubmit={event => handleCliente(event)}>
        <label for="sName">Nome Cliente</label>
        <input
          id="sName"
          value={nome}
          type="text"
          name={nome}
          placeholder="Insira o nome do Cliente"
          required
          onChange={e => handleChange(e, NAME)}
        />
        <label for="spCpf">CPF</label>
        <input
          id="spCpf"
          value={cpf}
          type="text"
          name={CPF}
          placeholder="Insira o número de cpf"
          minlength="11"
          maxlength="11"
          required
          onChange={e => handleChange(e, CPF)}
        />
        <label for="coord">Coordenadas</label>
        <input
          id="coord"
          value={JSON.stringify(props.redux.all.modalCliente.coordinates)}
          type="text"
          name={COORD}
          placeholder="Coordenadas"
          required
          onChange={e => handleChange(e, COORD)}
        />
        <label for="v">Velocidade</label>
        <input
          id="v"
          value={velocidade}
          type="text"
          name={VELOCIDADE}
          placeholder="Velocidade"
          required
          onChange={e => handleChange(e, VELOCIDADE)}
        />
        <label for="pp">Pppoe</label>
        <input
          id="pp"
          value={pppoe}
          type="text"
          name={PPPOE}
          placeholder="PPPOE"
          required
          onChange={e => handleChange(e, PPPOE)}
        />

        <hr />
        <Button type="submit">Adicionar</Button>
      </Form>
      {/* </Container> */}
    </Modal>
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
