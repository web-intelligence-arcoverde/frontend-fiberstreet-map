import React from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators do redux
import { Creators as ctosActions } from "../../../redux/store/ducks/ctos";

//Componentes "criados"
import Tabs from "./Components/Tabs";

//Componentes importados
import { makeStyles, Typography, Box } from "@material-ui/core/";
import { Card, Modal, ListGroup, Accordion } from "react-bootstrap";

//Tamanho das box
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box
        style={{
          paddingTop: "0px",
          paddingRight: "0px",
          paddingBottom: "10px",
          paddingLeft: "0px"
        }}
        p={3}
      >
        {children}
      </Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  pallet: {
    backgroundColor: "#FFBF00"
  },
  bigIndicator: {
    height: 5,
    backgroundColor: "#000"
  },
  buttonsActions: {
    paddingTop: "0px",
    paddingRight: "0px",
    paddingLeft: "0px",
    borderBottomWidth: "0px",
    paddingBottom: "0px",
    borderTopWidth: "0px",
    marginBottom: "15px",
    color: "#D8D8D8"
  },
  modalBody: {
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingBottom: "0px",
    paddingTop: "10px"
  }
}));

function ViewCto(props) {
  const { ctos } = props.redux;
  const { hideViewModalCto } = props;

  const { viewCto } = ctos; //Recuperando o estado inicial da CTO
  const { data } = viewCto; //Recuperando os dados da CTO

  return (
    <Modal size="lg" show={viewCto.visible} onHide={hideViewModalCto}>
      <Modal.Header
        style={{
          justifyContent: "center",
          backgroundColor: "#F7D358"
        }}
      >
        <Modal.Title>Informações da caixa terminal optica</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          paddingLeft: "0px",
          paddingTop: "0px",
          paddingRight: "0px",
          paddingBottom: "0px"
        }}
      >
        <Tabs />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ctosActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCto);
