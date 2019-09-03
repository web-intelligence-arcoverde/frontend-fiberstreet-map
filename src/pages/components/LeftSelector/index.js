//React
import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../redux/store/actions/all";
import { Creators as CaboCreators } from "../../../redux/store/ducks/cabo";

//React-UI
import { Container } from "./styles";
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { grey } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  fake: {
    backgroundColor: grey[200],
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing(3),
    },
  },
}));

function LeftSelector(props) {

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  
  const classes = useStyles();

  const [dropDownOne, setDropDownOne] = useState(false);
  
  const [backColor, setBackColor] = useState(["#8123"]);
  
  const {
    openModalCto,
    showModalCto,
    setDelimitacaoMapa,
    addCoordCabo,
    showAddNewCaboModalReserva
  } = props;
  
  // const { cto } = props.redux;

  //Fechar um quando abrir o outro.
  const handleClick = (number) => {
    switch(number) {
      case 0:
        setOpen(prev => !prev);
        break;
      case 1:
        setOpen1(prev => !prev);
        break;
      default: break;
    }
    
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const fake = <div className={classes.fake} />;

  return (
    <>
      <Container>
        
        <div className={classes.root} >
            <ClickAwayListener onClickAway={handleClickAway}>
              <div style={{display:'flex', flexDirection: "column"}} >
                <Button onClick={() => handleClick(0)}>Adicionar</Button>
                {open ? (
                  <Paper className={classes.paper}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                      Delete
                      <DeleteIcon className={classes.rightIcon} />
                    </Button>
                  </Paper>
                ) : null}   

              <Button onClick={() => handleClick(1)}>Open menu</Button>
                {open1 ? (
                  <Button variant="contained" color="secondary" className={classes.button}>
                    Delete1
                    <DeleteIcon className={classes.rightIcon} />
                  </Button>
                ) : null}        

              </div>
            </ClickAwayListener>
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

//
