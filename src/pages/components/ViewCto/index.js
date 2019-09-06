import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Creators as CtoCreators } from "../../../redux/store/ducks/ctos";
import "./styles.css";
import api from "../../../services/api";
import { ClientRequest } from "http";
import TableUsers from './Components/TableUsers'

//UI-Components
import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap'
import {deepOrange} from '@material-ui/core/colors/';
import {Tab, Paper,AppBar,makeStyles,Tabs,Typography,Box, Container} from '@material-ui/core/';


//Icons
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';

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
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  pallet:{
    backgroundColor: '#FFBF00',
  },
  bigIndicator: {
    height: 5,
    backgroundColor: '#FFF',
  },
}));




function ViewCto(props) {
  const { all } = props.redux;
  const { data } = props.redux.all.viewCto;
  const coordinates = all.viewCto.data.coordenadas;
  const [coordenadas, setCoordenadas] = useState("");
  const [nome, setNome] = useState(props.redux.all.viewCto.data.nome);
  const [endereco, setEndereco] = useState("");
  const [modelo, setModelo] = useState("");
  const [clientes, setClientes] = useState([]);
  const [splitters, setSplitters] = useState([]);
  const [saidasSplitter, setSaidasSplitter] = useState([]);
  const [cabos, setCabos] = useState([]);

  const { setDelimitacaoMapa, addCoordCabo, addCtoId } = props;

  /** useEffect para obter os Splitters pelo id da cto */
  useEffect(() => {
    async function getSplitters(id) {
      await api
        .get(`/get/splitter/cto/${id}`)
        .then(response => {
          const sp = response.data;
          setSplitters(sp);
          getClientes(sp[0].id);
          getCabosCto(id);
        })
        .catch(e => console.warn(e));
    }
    getSplitters(all.viewCto.data.id);
  }, [all.viewCto.data.id]);

  function getClientes(splitterId) {
    api
      .get(`saidasplitter/splitter/${splitterId}/clientes`)
      .then(result => {
        const { data: saidas } = result;
        setSaidasSplitter(saidas);
      })
      .catch(err => console.log(err));
  }

  function getCabosCto(ctoId) {
    api
      .get(`cabo/get/cto/${ctoId}`)
      .then(response => {
        const { data } = response;
        setCabos(data);
      })
      .catch(err => console.warn(err));
  }

  useEffect(() => {
    setClientes(saidasSplitter.saidas);
  }, [saidasSplitter]);

  function handleHideModal() {
    const { hideDataInViewModal } = props;
    hideDataInViewModal();
  }

  function addSplitter(id) {
    const { hideDataInViewModal, showSplitterAddModal } = props;
    hideDataInViewModal();
    showSplitterAddModal(id);
  }

  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
         
      <Modal show={all.viewCto.visible} onHide={handleHideModal}>
        
        <div className={classes.root}>
      
          <AppBar position="static" className={classes.pallet} >
            
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
     
        <TabPanel value={value} index={0} >
          <TableUsers></TableUsers>
        </TabPanel>
        <TabPanel value={value} index={1} >
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} >
          Item Three
        </TabPanel>
      
    </div>
      
    </Modal>
     
  );

}

const mapStateToProps = state => ({
  redux: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...Actions, ...CtoCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCto);
