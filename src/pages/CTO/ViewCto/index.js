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
import "./styles.css";

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
    <Modal show={ctos.viewCto.visible} onHide={handleHideModal}>
      <Modal.Body className={classes.modalBody}>
        <h2 style={{ color: "#FFBF00", textAlign: "center" }}>
          Informações da CTO
        </h2>
        <Table responsive>
          <thead>
            <tr style={{ backgroundColor: "#fff", color: "#6E6E6E" }}>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Modelo</th>
              <th>ID</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "#BDBDBD", backgroundColor: "#fff" }}>
              <td>{ctos.nome}</td>
              <td>{ctos.endereco}</td>
              <td>{ctos.modelo}</td>
              <td>{ctos.id}</td>
              <td>
                <Button variant="link" className={classes.buttonsActions}>
                  <EditIcon></EditIcon>
                </Button>

                <Button variant="link" className={classes.buttonsActions}>
                  <DeleteIcon></DeleteIcon>
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>

        <div className={classes.root}>
          <AppBar position="static" className={classes.pallet}>
            <Tabs
              value={value}
              onChange={handleChange}
              classes={{ indicator: classes.bigIndicator }}
              variant="fullWidth"
            >
              <Tab icon={<PersonPinIcon />} {...a11yProps(0)} />
              <Tab icon={<PersonPinIcon />} {...a11yProps(1)} />
              <Tab icon={<PersonPinIcon />} {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <TableUsers></TableUsers>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <TableSplitter></TableSplitter>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <TableCable></TableCable>
          </TabPanel>
        </div>
      </Modal.Body>
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
