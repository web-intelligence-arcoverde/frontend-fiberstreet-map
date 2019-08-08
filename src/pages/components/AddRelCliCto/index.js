import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as DropCreators } from "../../../redux/store/ducks/drop";

import api from "../../../services/api";

import { Container, ConnectionView, IconOutSp, OutView } from "./styles";
import "./styles.css";
import { AST_True } from "terser";

Modal.setAppElement(document.getElementById("root"));

function AddRelCliCto(props) {
  const [saidas, setSaidas] = useState([]);
  const [splitters, setSplitters] = useState([]);

  const [saidaSelecionada, setSaidaSelecionada] = useState([]);
  const [params, setParams] = useState({});
  const [selected, setSelected] = useState(1000);

  const { drop, cliente } = props.redux;
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
        console.tron.log(Splitters);
      })
      .catch(err => console.warn(err));
  }
  async function getSaidasDoSplitter() {
    await splitters.map((splitter, index) => {
      alert(JSON.stringify(splitter));
      api
        .get(`saidasplitter/splitter/${splitter.id}`)
        .then(response => {
          const { data: saidasAndId } = response;

          criarArrayDeAcordoComOBalanceamento(
            saidasAndId.saidas,
            splitter.balanceamento
          );
          console.tron.log(saidasAndId.saidas);
          // setSaidas(saidasAndId.saidas);

          // alert(saidas);
          // alert(JSON.stringify(saidas))
          // console.tron.log({ sss: { saidas: saidasAndId } });
        })
        .catch(err => console.tron.log(err));
    });
  }

  function criarArrayDeAcordoComOBalanceamento(saidas, balanceamento) {
    let newArray = new Array(balanceamento);
    console.tron.log(newArray);
    // preencher tudo com null

    for (let count = 0; count < balanceamento; count++) {
      console.tron.log(saidas);
      if (saidas[count]) {
        if (count + 1 === saidas[count].numero) {
          // console.tron.log("FUNCIONOU");
          // console.tron.log(saidas[count]);

          //newArray[count] = saidas[count]; // FUNCIONA ESSA PORRA
          newArray[count] = {
            ...saidas[count],
            isActive: true
          };
        }
        // newArray[count] =
        console.tron.log(saidas[count]);
      } else {
        newArray[count] = {
          id: 0,
          numero: count + 1,
          isActive: false,
          selected: false
        };
      }
    }
    console.tron.log(newArray);
    // T
    setSaidas(newArray);
  }

  async function obterSaidasDoSplitter() {
    await setSplitters(drop.data.splitters);
    alert(JSON.stringify(drop.data.splitters));
    await getSaidasDoSplitter();
    // drop.data.splitters.forEach(element => {
    // alert(JSON.stringify(element));
    // getSaidasDoSplitter(element);
    // });
    // splitters.map((sp, index) => {
    //   alert(JSON.stringify(sp));
    // });
    // api
    //   .get(`saidasplitter/splitter/${1}`)
    //   .then(response => {
    //     const { data } = response;
    //     setSaidas([...saidas, JSON.parse(data)]);
    //     console.tron.log(data);
    //   })
    //   .catch(err => console.tron.log(err));
  }

  function selectOutToAddCliente(number, isUsing) {
    if (isUsing) {
      alert("Não é possível usar uma saída já em uso");
    } else {
      setSaidaSelecionada(number);
      // setParams({
      //   selected: true
      // });

      setParams(
        params.map((select, index) => (number === index ? true : false))
      );
      alert("Splitter selecionado");
    }
  }

  useEffect(() => {
    function* carregarSaidasSplitter() {
      const { splitters, cto_id, drop } = props.drop.data;
      alert(JSON.stringify({ splitters, cto_id, drop }));
    }

    carregarSaidasSplitter();
  });

  function salvarDrop() {
    //Adicionar o cliente na saída do splitter selecionada

    // api.post()
    // Procurando em um array
    console.tron.log(saidaSelecionada);
    let index = saidaSelecionada.indexOf(true);
    console.tron.log(index);
    let saida = index++;

    // Procurando em um array de objetos
    let findedSelected = saidaSelecionada.find(
      saida => saida.selected === true
    );
    if (findedSelected.isActive === false) {
      console.tron.log(
        `Poderá ser usada a saída de número ${findedSelected.numero}`
      );
      alert(`Aguarde enquanto salvamos os dados no banco de dados`);
      // drop
      const { addDropRequest } = props.redux;
      const { data } = drop;

      const { cliente_id } = cliente;
      addDropRequest({ ...drop, cliente_id });
      // api.post(`saidasplitter/cliente/create`, );
    } else {
      console.tron.log(
        `A saída de número ${
          findedSelected.numero
        }, pois ela encontra-se ocupada`
      );
      alert(
        `A saída ${
          findedSelected.numero
        }, encontra-se ocupada, escolha outra por favor!`
      );
    }
    console.tron.log(findedSelected);
    // Add fibra drop cliente no cabo
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
        <button onClick={obterSaidasDoSplitter}>Carregar Saidas</button>
        <h3>Clique onde o drop irá ficar</h3>
        <ConnectionView>
          <div>DROP</div>
          <div>
            {saidas.map((saida, index) => {
              console.tron.log(saida);
              return (
                <OutView>
                  <span>{saida.numero}</span>
                  <IconOutSp
                    active={saida.isActive}
                    onClick={() => {
                      let newAr = saidas.map((output, indice) =>
                        index === indice
                          ? (output.selected = true)
                          : (output.selected = false)
                      );

                      let newArrayFull = saidas.map((output, indx) =>
                        index === indx
                          ? { ...output, selected: true }
                          : { ...output, selected: false }
                      );
                      console.tron.log(newArrayFull);

                      // setSaidaSelecionada(newAr);
                      setSaidaSelecionada(newArrayFull);
                    }}
                    selected={saida.selected}
                    // {...params[index]}
                    // selected={true}
                  />
                </OutView>
              );
            })}
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
        <span>
          <button onClick={salvarDrop}>Salvar</button>
        </span>
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
