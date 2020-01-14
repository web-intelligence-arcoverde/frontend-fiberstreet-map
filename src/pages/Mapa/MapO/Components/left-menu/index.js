/* eslint-disable react/self-closing-comp */
//React
import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Creators
import { Creators as MapCreators } from '../../../../../redux/store/ducks/map';
import { Creators as CableActions } from '../../../../../redux/store/ducks/cabo';
import { Creators as ImportsActions } from '../../../../../redux/store/ducks/imports';
import { Creators as UserActions } from '~/redux/store/ducks/user';
import AuthActions from '../../../../../redux/store/ducks/auth';
import MembersActions from '../../../../../redux/store/ducks/members';

//Componentes @material-ui / react-bootstrap
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Button,
  Form,
  Dropdown,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap/';

//Componentes criados
import { Container } from './styles';
import Can from '~/components/Can';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingLeft: '22px',
    paddingTop: '40px',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
}));

function LeftMenu(props) {
  const classes = useStyles();

  const {
    setDelimitation,
    showIcons,
    setDrawType,
    openImportGeojsonModal,
    signOut,
    openMembersModal,
  } = props;

  const [visible, setVisible] = useState(false);

  function isVisible(type) {
    if (visible === false) {
      props.map.setLayoutProperty(type, 'visibility', 'none');
      setVisible(true);
    } else {
      setVisible(false);
      props.map.setLayoutProperty(type, 'visibility', 'visible');
    }
  }

  return (
    <Container>
      <div className={classes.root}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Menssagens */}
          {/* Next Realese
            <ButtonGroup vertical>
              
              <Dropdown as={ButtonGroup}>
                <Badge
                  badgeContent={4}
                  color="primary"
                  style={{ width: "100%" }}
                >
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">Log de alterações</Tooltip>
                    }
                  >
                    <Button variant="warning" style={{ width: "100%" }}>
                      <i
                        className="fa fa-exclamation-circle"
                        style={{ color: "white" }}
                      ></i>
                    </Button>
                  </OverlayTrigger>
                </Badge>
              </Dropdown>

              

              <Dropdown as={ButtonGroup} style={{ marginTop: "10px" }}>
                <OverlayTrigger
                  overlay={<Tooltip id="tooltip-disabled">Mensagens</Tooltip>}
                >
                  <Button variant="warning" className={classes.button}>
                    <i
                      className="fa fa-envelope"
                      style={{ color: "white" }}
                    ></i>
                  </Button>
                </OverlayTrigger>
                <Dropdown.Toggle
                  id="dropdown-split-basic"
                  variant="warning"
                  style={{ color: "white" }}
                />

                <Dropdown.Menu>
                  <Dropdown.Item>Caixa de mensagens</Dropdown.Item>
                  <Dropdown.Item>Enviar Mensagem</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
            */}

          {/* Adicão/Listar */}
          <ButtonGroup vertical style={{ marginTop: '20px' }}>
            <Dropdown as={ButtonGroup}>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Opções do usuario.</Tooltip>
                }
              >
                <Button variant="warning" className={classes.button}>
                  <i
                    className="fa fa-user-circle"
                    style={{ color: 'white' }}
                  ></i>
                </Button>
              </OverlayTrigger>
              <Dropdown.Toggle
                id="dropdown-split-basic"
                variant="warning"
                style={{ color: 'white' }}
              />

              <Dropdown.Menu>
                <Can checkRole="administrator">
                  <Dropdown.Item
                    onClick={() => {
                      openMembersModal();
                    }}
                  >
                    Membros
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      // Aqui selecionaremos o tipo de delimitação do clique no mapa
                      setDelimitation('default');
                      const { showModalNewUser } = props;
                      showModalNewUser();
                    }}
                  >
                    Add Funcionario
                  </Dropdown.Item>

                  {/* <Dropdown.Item
                  onClick={() => {
                    // Aqui selecionaremos o tipo de delimitação do clique no mapa
                    setDelimitation('provider');
                  }}
                >
                  Add provedor
                </Dropdown.Item> */}
                </Can>

                <Dropdown.Item
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup}>
              <Button variant="warning" className={classes.button}>
                <i className="fa fa-plus" style={{ color: 'white' }}></i>
              </Button>

              <Dropdown.Toggle
                id="dropdown-split-basic"
                variant="warning"
                style={{ color: 'white' }}
              />

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    //Abre o modal para adicionar um novo cliente
                    setDelimitation('client');
                  }}
                >
                  cliente
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    // Aqui selecionaremos o tipo de delimitação do clique no mapa
                    setDelimitation('cto');
                  }}
                >
                  cto
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    setDelimitation('ceo');
                  }}
                >
                  ceo
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setDelimitation('cabo');
                    setDrawType('NONE');
                    showIcons();
                  }}
                >
                  cabo
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    const { openSearchModal } = props;
                    openSearchModal();
                  }}
                >
                  pesquisar
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    openImportGeojsonModal();
                  }}
                >
                  importar geojson
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup}>
              <Button variant="warning" className={classes.button}>
                <SettingsIcon style={{ color: '#fff' }} />
              </Button>

              <Dropdown.Toggle
                id="dropdown-split-basic"
                variant="warning"
                style={{ color: 'white' }}
              />

              <Dropdown.Menu>
                <Form.Group
                  style={{ marginBottom: '0px', marginLeft: '15px' }}
                  id="formGridCheckbox"
                >
                  <Form.Check
                    label="ctos"
                    aria-label="option 1"
                    style={{ marginTop: '5px' }}
                    onClick={() => isVisible('cto')}
                  />

                  <Form.Check
                    label="cabo"
                    aria-label="option 1"
                    style={{ marginTop: '5px' }}
                    onClick={() => isVisible('wires')}
                  />

                  <Form.Check
                    label="clientes"
                    style={{ marginTop: '10px' }}
                    onClick={() => isVisible('cliente')}
                  />

                  <Form.Check
                    label="ceo"
                    style={{ marginTop: '10px' }}
                    onClick={() => isVisible('ceo')}
                  />
                </Form.Group>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...MapCreators,
      ...AuthActions,
      ...CableActions,
      ...ImportsActions,
      ...MembersActions,
      ...UserActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);

/*
<Dropdown.Item href="#">
                      <Form.Check label="ctos" aria-label="option 1" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <Form.Check label="clientes" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <Form.Check label="ceo" />
                    </Dropdown.Item>
*/
