//React
import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";

//React-UI
import { Container } from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import grey from "@material-ui/core/colors/red";
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

  const [backColor, setBackColor] = useState(["#8123"]);
  const colorButton = grey[500];

  const {
    openModalCto,
    showModalCto,
    setDelimitacaoMapa,
    addCoordCabo,
    showAddNewCaboModalReserva
  } = props;

  // const { cto } = props.redux;

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
                      setDelimitacaoMapa("cliente");
                    }}
                  >
                    CLIENTE
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      // Aqui selecionaremos o tipo de delimitação do clique no mapa
                      setDelimitacaoMapa("cto");
                    }}
                  >
                    CTO
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      setDelimitacaoMapa("ceo");
                    }}
                  >
                    CEO
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
                  <Dropdown.Item href="#/action-1"> </Dropdown.Item>

                  <Dropdown.Item href="#/action-1">Cabo</Dropdown.Item>

                  <Dropdown.Item href="#/action-1">CTO</Dropdown.Item>
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
  bindActionCreators({ ...Actions, ...CaboCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSelector);
