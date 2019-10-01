import React, { useState, useEffect } from "react";

//API
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as DropCreators } from "../../../redux/store/ducks/drop";

import api, { API } from "../../../services/api";

//Components
import { Modal, Container, Button } from "react-bootstrap";
import { OutView, IconOutSp } from "./styles";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CachedIcon from "@material-ui/icons/Cached";
import AlarmIcon from "@material-ui/icons/Alarm";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

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
      .get(
        `${API.GET_SPLITTER_BY_CTO}/${cto_id}`
        // `/get/splitter/cto/${cto_id}`
        )
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
          // Teste para adicionar saída caso não seja um número a mais do que a posição no array

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

          // CORRIGIR QUANDO ESTE PRÓXIMO ARRAY SERÁ USADO
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
      alert("Não é possível usar uma saída já em uso");
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
    //Adicionar o cliente na saída do splitter selecionada

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
      //   `Poderá ser usada a saída de número ${findedSelected.numero}`
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
      //   `A saída de número ${
      //     findedSelected.numero
      //   }, pois ela encontra-se ocupada`
      // );
      alert(
        `A saída ${findedSelected.numero}, encontra-se ocupada, escolha outra por favor!`
      );
    }
    console.tron.log(findedSelected);
    // Add fibra drop cliente no cabo
  }

  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Container>
      <Modal show={props.redux.drop.isVisible} onHide={handleHideModal}>
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title style={{ color: "#FF8000" }}>
            Mostrar as portas -
            <CachedIcon
              onClick={obterSaidasDoSplitter}
              style={{ marginLeft: "5px", color: "#FF8000" }}
              aria-label="add an alarm"
            >
              <AlarmIcon />
            </CachedIcon>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <List dense className={classes.root} style={{ maxWidth: "100%" }}>
            {saidas.map((saida, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              return (
                <ListItem key={index} button>
                  <ListItemText
                    style={{ color: "#FF8000" }}
                    id={labelId}
                    primary={`Porta ${index + 1}`}
                  />

                  <ListItemSecondaryAction>
                    <OutView>
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

                          setSaidaSelecionada(newArrayFull);
                        }}
                        selected={saida.selected}
                      />
                    </OutView>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" onClick={handleHideModal}>
            Fechar
          </Button>
          <Button variant="warning" onClick={salvarDrop}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
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
//<span>{saida.numero}</span>