import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Form, Button } from "react-bootstrap/";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AuthActions from "../../../../redux/store/ducks/auth";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  }
}));

function Provider(props) {
  const classes = useStyles();

  const [nameProvider, setNameProvider] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [key, setKey] = useState("");

  function createUser(event) {
    event.preventDefault();
    console.log("Desgraça");
  }

  function createProvider(event) {
    event.preventDefault();
    const { userProvider } = props.auth;

    const provider = {
      name: nameProvider,
      cpf,
      address,
      secret: key
    };

    const { signUpWithProviderRequest } = props;
    signUpWithProviderRequest(userProvider, provider);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={createProvider} className={classes.form}>
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            Cadastrar
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nome do provedor"
            name="Nome"
            value={nameProvider}
            onChange={e => setNameProvider(e.target.value)}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="CNPJ"
            name="CNPJ"
            value={cpf}
            type="text"
            onChange={e => setCpf(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Password"
            label="Endereço"
            name="Endereço"
            autoComplete="Endereço"
            value={address}
            type="text"
            onChange={e => setAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="key"
            label="Key"
            name="key"
            value={key}
            type="text"
            onChange={e => setKey(e.target.value)}
          />
          <Button variant="secondary" style={{ width: "100%" }} type="submit">
            Concluir
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Provider);
