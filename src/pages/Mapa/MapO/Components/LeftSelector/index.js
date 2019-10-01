//React
import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators
import { Creators as MapCreators } from "../../../../../redux/store/ducks/map";
import AuthActions from "../../../../../redux/store/ducks/auth";

//React-UI
import { Container } from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    paddingLeft: "22px",
    paddingTop: "40px"
  },
  paper: {
    position: "absolute",
    top: 36,
    right: 0,
    left: 0
  },
  btColor: {}
}));

function LeftSelector(props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);

  const classes = useStyles();

  const [dropDownOne, setDropDownOne] = useState(false);

  const { setDelemitationMap } = props;

  //Fechar um quando abrir o outro.
  const handleClick = number => {
    switch (number) {
      case 0:
        setOpen(prev => !prev);
        break;
      case 1:
        setOpen1(prev => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Container>
        <div className={classes.root}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ButtonGroup vertical>
              <Dropdown as={ButtonGroup}>
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">Opções do usuario.</Tooltip>
                  }
                >
                  <Button variant="warning" className={classes.button}>
                    <i class="fa fa-user-circle" style={{ color: "white" }}></i>
                  </Button>
                </OverlayTrigger>
                <Dropdown.Toggle
                  id="dropdown-split-basic"
                  variant="warning"
                  style={{ color: "white" }}
                />

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setDelemitationMap("perfil");
                    }}
                  >
                    perfil
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      props.signOut();
                    }}
                  >
                    logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as={ButtonGroup}>
                <Button variant="warning" className={classes.button}>
                  <i class="fa fa-plus" style={{ color: "white" }}></i>
                </Button>

                <Dropdown.Toggle
                  id="dropdown-split-basic"
                  variant="warning"
                  style={{ color: "white" }}
                />

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      //Abre o modal para adicionar um novo cliente
                      setDelemitationMap("cliente");
                    }}
                  >
                    cliente
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      // Aqui selecionaremos o tipo de delimitação do clique no mapa
                      setDelemitationMap("funcionario");
                    }}
                  >
                    funcionario
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      // Aqui selecionaremos o tipo de delimitação do clique no mapa
                      setDelemitationMap("provider");
                    }}
                  >
                    provedor
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      // Aqui selecionaremos o tipo de delimitação do clique no mapa
                      setDelemitationMap("cto");
                    }}
                  >
                    cto
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      setDelemitationMap("ceo");
                    }}
                  >
                    ceo
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as={ButtonGroup}>
                <Button variant="warning" className={classes.button}>
                  <i class="fa fa-list-alt" style={{ color: "white" }}></i>
                </Button>

                <Dropdown.Toggle
                  id="dropdown-split-basic"
                  variant="warning"
                  style={{ color: "white" }}
                />

                <Dropdown.Menu>
                  <Dropdown.Item href="#"> List</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>

            <ButtonGroup vertical style={{ marginTop: "40px" }}>
              <Dropdown as={ButtonGroup}>
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Distancia de um ponto a outro
                    </Tooltip>
                  }
                >
                  <Button variant="warning" className={classes.button}>
                    <i class="fa fa-arrows-v" style={{ color: "white" }}></i>
                  </Button>
                </OverlayTrigger>
                <Dropdown.Toggle
                  id="dropdown-split-basic"
                  variant="warning"
                  style={{ color: "white" }}
                />

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setDelemitationMap("measure");
                    }}
                  >
                    medir
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setDelemitationMap("reset");
                    }}
                  >
                    desfazer
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
          </div>
        </div>
      </Container>
    </>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...MapCreators, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSelector);
