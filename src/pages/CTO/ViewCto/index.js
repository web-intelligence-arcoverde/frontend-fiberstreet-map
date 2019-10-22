import React, { useEffect, useState } from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//API
import api from "../../../services/api";

//Creators do redux
import { Creators as ctosActions } from "../../../redux/store/ducks/ctos";
import { Creators as SplitterActions } from "../../../redux/store/ducks/splitter";

//Componentes "criados"
import CtoInformation from "./Components/CtoInformation";
import TableClients from "./Components/TableUsers";
import TableSplitter from "./Components/TableSplitter";
import TableCable from "./Components/TableCable";

//Componentes importados
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import StorageIcon from "@material-ui/icons/Storage";
import Cable from "@material-ui/icons/SettingsInputComponent";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

//Tamanho das box
function ViewCto(props) {
  const classes = useStyles();
  const { ctos } = props.redux;
  const { hideViewModalCto } = props;

  const { showModalClients } = props;
  const { showModalSplitter } = props;
  const { showModalCable } = props;

  const { viewCto } = ctos; //Recuperando o estado inicial da CTO
  const { data } = viewCto;

  const [splitters, setSplitters] = useState([]);

  useEffect(() => {
    function getSplitters(id) {
      api
        .get(`/splittercto/${id}`)
        .then(response => {
          const sp = response.data;
          setSplitters(sp);
        })
        .catch(e => console.warn(e));
    }
    if (viewCto.visible) getSplitters(data.id);
  }, [data.id, viewCto.visible]);

  function handleAddSplitter() {
    const { showSplitterAddModal } = props;
    showSplitterAddModal(data.id);
  }

  function openModalClients() {
    showModalClients();
  }

  function openModalSplitter() {
    if (splitters < 1) {
      handleAddSplitter();
    } else {
      showModalSplitter();
    }
  }

  function openModalCable() {
    showModalCable();
  }

  return (
    <Modal size="lg" show={viewCto.visible} onHide={hideViewModalCto}>
      <Modal.Title
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F7D358",
          paddingTop: "15px",
          paddingBottom: "10px"
        }}
      >
        <h3>Caixa terminal optico</h3>
        <div>
          <Tooltip title="Clientes">
            <Button
              variant="secondary"
              className={classes.fab}
              onClick={openModalClients}
            >
              <PeopleIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Splitter">
            <Button
              variant="secondary"
              className={classes.fab}
              onClick={openModalSplitter}
            >
              <StorageIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Cabos">
            <Button
              variant="secondary"
              className={classes.fab}
              onClick={openModalCable}
            >
              <Cable />
            </Button>
          </Tooltip>
        </div>
      </Modal.Title>
      <Modal.Body>
        <CtoInformation info={props} />
        <TableSplitter />
        <TableCable />
        <TableClients />
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions, ...SplitterActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCto);
