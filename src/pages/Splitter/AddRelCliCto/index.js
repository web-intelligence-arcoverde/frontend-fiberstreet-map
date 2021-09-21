import React, { useState, useEffect } from 'react';

// API
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';

// Components
import { Modal, Container, Button } from '@material-ui/core';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CachedIcon from '@material-ui/icons/Cached';
import AlarmIcon from '@material-ui/icons/Alarm';
import { OutView, IconOutSp } from './styles';
import api from '../../../services/api';
import { Creators as MapCreators } from '../../../redux/store/ducks/map';
import { Creators as DropCreators } from '../../../redux/store/ducks/drop';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
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
    const { hideDropAddModal, hideIcons } = props;
    setDelimitation('default');
    hideIcons();
    hideDropAddModal();
  }

  function getCliById() {}
  async function getSpByCtoId() {
    api
      .get(
        `splittercto/${cto_id}`
        // `${API.GET_SPLITTER_BY_CTO}/${cto_id}`
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
      // alert(JSON.stringify(splitter));
      console.log(splitter);
      api
        // axios
        // .get(`http://192.168.0.143:3334/saidasplitter/splitter/13`)
        .get(`splitteroutcto/${splitter.id}`)
        .then(response => {
          const { data: saidasAndId } = response;
          // console.tron.log(saidasAndId.saidas);
          criarArrayDeAcordoComOBalanceamento(
            // saidasAndId.saidas,
            saidasAndId, // .saidas,
            splitter.balancing,
            // splitter.balanceamento,
            splitter.id
          );
          // console.tron.log(saidasAndId.saidas);
          // setSaidas(saidasAndId.saidas);

          // alert(saidas);
          // alert(JSON.stringify(saidas))
          // console.tron.log({ sss: { saidas: saidasAndId } });
        })
        .catch(err => console.warn(err));
    });
  }

  function criarArrayDeAcordoComOBalanceamento(
    saidas,
    balanceamento,
    splitter_id
  ) {
    const newArray = new Array(balanceamento);
    // console.tron.log(newArray);
    // preencher tudo com null

    for (let count = 0; count < balanceamento; count++) {
      if (saidas[count]) {
        if (count + 1 === saidas[count].number /* numero */) {
          newArray[count] = {
            ...saidas[count],
            isActive: true,
            splitter_id,
          };
        } else {
          // Teste para adicionar saída caso não seja um número a mais do que a posição no array

          const posicaoDaSaidaNoArray = saidas[count].number /* numero */ - 1;

          newArray[posicaoDaSaidaNoArray] = {
            ...saidas[count],
            isActive: true,
            selected: false,
            obter: true,
          };
          // newArray[posicaoDaSaidaNoArray] = saidas[count];

          // newArray[posicaoDaSaidaNoArray].isActive = true;
          // newArray[posicaoDaSaidaNoArray].selected = false;
          // newArray[posicaoDaSaidaNoArray].splitter_id = splitter_id;

          // CORRIGIR QUANDO ESTE PRÓXIMO ARRAY SERÁ USADO
          if (!(count + 1 === balanceamento)) {
            newArray[count] = {
              id: 0,
              // numero: count + 1,
              number: count + 1,
              isActive: false,
              select: false,
              splitter_id,
            };
          }
        }
      } else if (!newArray[count]) {
        newArray[count] = {
          id: 0,
          // numero: count + 1,
          number: count + 1,
          isActive: false,
          selected: false,
          splitter_id,
        };
      }
    }

    setSaidas(newArray);
  }

  async function obterSaidasDoSplitter() {
    await setSplitters(drop.data.splitters);

    await getSaidasDoSplitter();
  }

  function selectOutToAddCliente(number, isUsing) {
    if (isUsing) {
      alert('Não é possível usar uma saída já em uso');
    } else {
      setSaidaSelecionada(number);

      setParams(params.map((select, index) => number === index));
      alert('Splitter selecionado');
    }
  }

  useEffect(() => {
    // obterSaidasDoSplitter();
    if (props.redux.drop.isVisible) obterSaidasDoSplitter();
  }, [props.redux.drop.isVisible]); // obterSaidasDoSplitter,

  function salvarDrop() {
    // Procurando em um array de objetos
    const findedSelected = saidaSelecionada.find(
      saida => saida.selected === true
    );
    if (findedSelected) {
      if (findedSelected.isActive === false) {
        alert(`Aguarde enquanto salvamos os dados no banco de dados`);

        const { addDropRequest } = props;
        const cabo = drop.data.drop;
        const { cto_id, client_id } = drop.data;

        addDropRequest({ cabo, client_id, cto_id, saida: findedSelected });
      } else {
        alert(
          `A saída ${findedSelected.numero}, encontra-se ocupada, escolha outra por favor!`
        );
      }
    } else {
      toastr.warning('Inválido', 'Por favor, selecione uma saída');
    }

    setDelimitation('default');
  }

  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const { setDelimitation } = props;

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
        Mostrar as portas -
        <CachedIcon
          onClick={obterSaidasDoSplitter}
          style={{ marginLeft: '5px', color: '#FF8000' }}
          aria-label="add an alarm"
        >
          <AlarmIcon />
        </CachedIcon>
        <List dense className={classes.root} style={{ maxWidth: '100%' }}>
          {saidas.map((saida, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return (
              <ListItem key={index} button>
                <ListItemText
                  style={{ color: '#FF8000' }}
                  id={labelId}
                  primary={`Porta ${index + 1}`}
                />

                <ListItemSecondaryAction>
                  <OutView>
                    <IconOutSp
                      active={saida.isActive}
                      onClick={() => {
                        const newAr = saidas.map((output, indice) =>
                          index === indice
                            ? (output.selected = true)
                            : (output.selected = false)
                        );

                        const newArrayFull = saidas.map((output, indx) =>
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
        <Button variant="danger" onClick={handleHideModal}>
          Fechar
        </Button>
        <Button variant="secondary" onClick={salvarDrop}>
          Salvar
        </Button>
      </Modal>
    </Container>
  );
}

const mapStateToProps = state => ({
  // drop: state.drop
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...DropCreators, ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddRelCliCto);

/** Ações necessárias */
// - Recuperar o id da Cto
// - Listas o Splitter e as saídas dele
// <span>{saida.numero}</span>
