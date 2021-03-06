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
          // console.tron.log(saidasAndId.saidas);
          criarArrayDeAcordoComOBalanceamento(
            saidasAndId.saidas,
            splitter.balanceamento,
            splitter.id
          );
          // console.tron.log(saidasAndId.saidas);
          // setSaidas(saidasAndId.saidas);

          // alert(saidas);
          // alert(JSON.stringify(saidas))
          // console.tron.log({ sss: { saidas: saidasAndId } });
        })
        .catch(err => console.warn.log(err));
    });
  }

  function criarArrayDeAcordoComOBalanceamento(
    saidas,
    balanceamento,
    splitter_id
  ) {
    let newArray = new Array(balanceamento);
    // console.tron.log(newArray);
    // preencher tudo com null

    for (let count = 0; count < balanceamento; count++) {
      if (saidas[count]) {
        if (count + 1 === saidas[count].numero) {
          newArray[count] = {
            ...saidas[count],
            isActive: true,
            splitter_id
          };
        } else {
          // Teste para adicionar sa??da caso n??o seja um n??mero a mais do que a posi????o no array

          let posicaoDaSaidaNoArray = saidas[count].numero - 1;
          // console.tron.log({ POSICAO: posicaoDaSaidaNoArray });
          // console.tron.log({
          //   ...saidas[count],
          //   isActive: true,
          //   selected: false,
          //   obter: true
          // });
          newArray[posicaoDaSaidaNoArray] = {
            ...saidas[count],
            isActive: true,
            selected: false,
            obter: true
          };
          //newArray[posicaoDaSaidaNoArray] = saidas[count];

          // newArray[posicaoDaSaidaNoArray].isActive = true;
          // newArray[posicaoDaSaidaNoArray].selected = false;
          // newArray[posicaoDaSaidaNoArray].splitter_id = splitter_id;

          // CORRIGIR QUANDO ESTE PR??XIMO ARRAY SER?? USADO
          if (!(count + 1 === balanceamento)) {
            newArray[count] = {
              id: 0,
              numero: count + 1,
              isActive: false,
              select: false,
              splitter_id
            };
          }
        }
      } else {
        if (!newArray[count]) {
          newArray[count] = {
            id: 0,
            numero: count + 1,
            isActive: false,
            selected: false,
            splitter_id
          };
        }
      }
    }
    setSaidas(newArray);
  }

  async function obterSaidasDoSplitter() {
    await setSplitters(drop.data.splitters);

    await getSaidasDoSplitter();
    // drop.data.splitters.forEach(element => { // BRANCH FEATURE
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
      alert("N??o ?? poss??vel usar uma sa??da j?? em uso");
    } else {
      setSaidaSelecionada(number);

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

  useEffect(() => {
    obterSaidasDoSplitter();
    obterSaidasDoSplitter();
  }, [props.redux.drop.isVisible]);

  function salvarDrop() {
    //Adicionar o cliente na sa??da do splitter selecionada

    // api.post()
    // Procurando em um array
    // console.tron.log(saidaSelecionada);
    // let index = saidaSelecionada.indexOf(true);
    // console.tron.log(index);
    // let saida = index++;

    // Procurando em um array de objetos
    let findedSelected = saidaSelecionada.find(
      saida => saida.selected === true
    );
    if (findedSelected.isActive === false) {
      // console.tron.log(
      //   `Poder?? ser usada a sa??da de n??mero ${findedSelected.numero}`
      // );
      alert(`Aguarde enquanto salvamos os dados no banco de dados`);

      const { addDropRequest } = props;
      const cabo = drop.data.drop;
      const { cto_id } = drop.data;

      const { cliente_id } = cliente;
      addDropRequest({ cabo, cliente_id, cto_id, saida: findedSelected });
      // api.post(`saidasplitter/cliente/create`, );
    } else {
      // console.tron.log(
      //   `A sa??da de n??mero ${
      //     findedSelected.numero
      //   }, pois ela encontra-se ocupada`
      // );
      alert(
        `A sa??da ${findedSelected.numero}, encontra-se ocupada, escolha outra por favor!`
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
        <h3>Clique onde o drop ir?? ficar</h3>
        <ConnectionView>
          <div>DROP</div>
          <div>
            {saidas.map((saida, index) => {
              // console.tron.log(saida);
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
                      // console.tron.log(newArrayFull);

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
          <span>J?? est?? ativa</span>
          <IconOutSp active />
          <span>N??o est?? em uso</span>
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

/** A????es necess??rias */

// - Recuperar o id da Cto
// - Listas o Splitter e as sa??das dele
