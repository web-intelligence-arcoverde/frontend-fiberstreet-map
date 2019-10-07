import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//Redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Creators que era para ser usado.
import { Creators as clientCreators } from "../../../../redux/store/ducks/cliente";

function AlertDialog(props) {
  const { hideClientComment } = props;
  const { viewDialogComment } = props.redux.client;

  const { hideClientModal } = props;

  console.log("desgraça");
  console.log(props);
  console.log(hideClientComment);

  const handleClickOpen = () => {
    hideClientModal();
  };

  return (
    <Dialog
      open={viewDialogComment.visible}
      onClose={props.desgraca}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.desgraca} color="primary">
          Disagree
        </Button>
        <Button onClick={props.desgraca} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  redux: state
});

//Ações
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...clientCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertDialog);
