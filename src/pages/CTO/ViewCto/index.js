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
import { makeStyles, Typography, Box, Container } from "@material-ui/core/";
import { Table, Modal } from "react-bootstrap";

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
    backgroundColor: "#F2F2F2"
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

  console.log("informações da cto");
  console.log(data);

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

      <Modal.Body>
        <Container>
          <h2 style={{ color: "#F5DA81", textAlign: "center" }}>
            Informações dos cabos
          </h2>

          <Table responsive>
            <thead>
              <tr style={{ backgroundColor: "#fff", color: "#6E6E6E" }}>
                <th>Nome</th>
                <th>Modelo</th>
                <th>Endereço</th>
                <th>Observação</th>
              </tr>
            </thead>

            <tbody>
              <td>{data.name}</td>
              <td>{data.model}</td>
              <td>{data.address}</td>
              <td>{data.obs}</td>
            </tbody>
          </Table>
        </Container>

        <Tabs />
      </Modal.Body>
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
