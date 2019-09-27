import React from "react";

// import Logo from "../../assets/airbnb-logo.svg";
import api from "../../../services/api";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CachedIcon from "@material-ui/icons/Cached";
import AlarmIcon from "@material-ui/icons/Alarm";
import InputAdornment from "@material-ui/core/InputAdornment";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        GzNet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();

  const [cep, setCep] = React.useState("");

  const [age, setAge] = React.useState("");
  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          style={{ backgroundColor: "#F7BE81" }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar conta
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Ultimo nome"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="nomeProvedor"
                name="nomeprovedor"
                variant="outlined"
                required
                fullWidth
                id="nomeProvedor"
                label="Nome do provedor"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="cnpj"
                name="cnpj"
                variant="outlined"
                required
                fullWidth
                id="cnpj"
                label="CNPJ"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="cep"
                name="cep"
                variant="outlined"
                required
                fullWidth
                id="cep"
                value={cep}
                label="CEP"
                onChange={event => setCep(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="cidade"
                name="cidade"
                variant="outlined"
                required
                fullWidth
                id="cidade"
                label="Cidade"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="bairro"
                name="bairro"
                variant="outlined"
                required
                fullWidth
                id="bairro"
                label="Bairro"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="rua"
                name="rua"
                variant="outlined"
                required
                fullWidth
                id="rua"
                label="Rua"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="numero"
                name="numero"
                variant="outlined"
                required
                fullWidth
                id="numero"
                label="Numero"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="pontoRef"
                name="pontoRef"
                variant="outlined"
                required
                fullWidth
                id="pontoRef"
                label="Ponto de Ref"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Você já tem uma conta? Entre aqui
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function serviceCep(cep) {
  return "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";
}
