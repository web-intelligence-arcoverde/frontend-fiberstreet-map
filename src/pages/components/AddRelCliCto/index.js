import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as DropCreators } from "../../../redux/store/ducks/drop";

import api from "../../../services/api";

import { Container, ConnectionView, IconOutSp, OutView } from "./styles";
import "./styles.css";

Modal.setAppElement(document.getElementById("root"));

function AddRelCliCto(props) {
  const [saidas, setSaidas] = useState("");
  const [splitters, setSplitters] = useState("");

  const [saidaSelecionada, setSaidaSelecionada] = useState("");
  const [params, setParams] = useState({});

  const { drop } = props.redux;
  const { cto_id } = drop;

  function handleHideModal() {
    const { hideDropAddModal } = props;
    hideDropAddModal();
  }

  function getCliById() {}
  async function getSpByCtoId() {
    api
      .get(`/get/splitter/cto/${cto_id}`)
      .then(response => {
        const { data: Splitters } = response;
        setSplitters(Splitters);
        getSaidasDoSplitter();
      })
      .catch(err => console.warn(err));
  }
  async function getSaidasDoSplitter() {
    //
    splitters.map((splitter, index) => {
      api.get(`saidasplittersplitter/${splitter.id}`).then(response => {
        const { data } = response;
        setSaidas([...saidas, JSON.parse(data)]);
      });
    });
  }

  useEffect(() => {
    getSpByCtoId();
  }, []);

  function selectOutToAddCliente(number, isUsing) {
    if (isUsing) {
      alert("Não é possível usar uma saída já em uso");
    } else {
      setSaidaSelecionada(number);
      setParams({
        selected: true
      });
      alert("Splitter selecionado");
    }
  }

  return (
    <Modal
      isOpen={props.redux.drop.isVisible}
      onRequestClose={handleHideModal}
      contentLabel="Fibra + Splitter"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <Container>
        <h3>Clique onde o drop irá ficar</h3>
        <ConnectionView>
          <div>DROP</div>
          <div>
            <OutView>
              <span>1</span>
              <IconOutSp active onClick={() => alert("Fica verde")} />
            </OutView>
            <OutView>
              <span>2</span>
              <IconOutSp inactive />
            </OutView>
            <OutView onClick={() => selectOutToAddCliente(3, false)}>
              <span>3</span>
              <IconOutSp iactive {...params} />
            </OutView>
            <OutView>
              <span>4</span>
              <IconOutSp inactive />
            </OutView>
            {/* {
              saidas.map((saida, index) => {
                let isActive = saida.
              return <OutView>
                        <span>saida.numero</span>
                        <IconOutSp active={} />
                      </OutView>
              })
            } */}
          </div>
        </ConnectionView>
        <OutView>
          <p>Legenda</p>
          <span>Já está ativa</span>
          <IconOutSp active />
          <span>Não está em uso</span>
          <IconOutSp active={false} />
          <span>Selecionada</span>
          <IconOutSp selected />
        </OutView>
      </Container>
    </Modal>
  );
}

const mapStateToProps = state => ({
  // drop: state.drop
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(DropCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRelCliCto);

/** Ações necessárias */

// - Recuperar o id da Cto
// - Listas o Splitter e as saídas dele
