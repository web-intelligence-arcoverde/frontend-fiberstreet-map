/**
 *  ORGANIZANDO ESSA BAGAÇA.
 */

import React from "react";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators do redux
import { Creators as ctosActions } from "../../../redux/store/ducks/ctos";

//Components
import TableUsers from "./Components/TableUsers";
import TableSplitter from "./Components/TableSplitter";
import TableCable from "./Components/TableCable";

//UI-Components
import PropTypes from "prop-types";
import { Modal, Table, Button } from "react-bootstrap";
import {
  Tab,
  AppBar,
  makeStyles,
  Tabs,
  Typography,
  Box
} from "@material-ui/core/";

//Icons
import PersonPinIcon from "@material-ui/icons/PersonPin";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

  function handleHideModal() {
    const { hideViewModal } = props;
    hideViewModal();
  }

  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Modal show={true} onHide={handleHideModal} size="lg">
      <Modal.Header
        style={{
          justifyContent: "center",
          backgroundColor: "#F7D358"
        }}
      >
        <Modal.Title>Informações da caixa terminal optica</Modal.Title>
      </Modal.Header>

      <Modal.Body></Modal.Body>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCto);
