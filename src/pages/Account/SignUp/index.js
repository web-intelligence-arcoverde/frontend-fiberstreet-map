import React, { useState } from "react";

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

import { makeStyles } from "@material-ui/core/styles";

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

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameProvider, setNameProvider] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");

  const [key, setKey] = useState("");

  function newFunction() {
    var user = {
      name: name,
      lastName: lastName,
      email: email,
      password: password
    };

    var provider = {
      name: nameProvider,
      cnpj: cpf,
      address: address
    };
  }

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
        <form className={classes.form} noValidate onSubmit={newFunction}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                onChange={e => setName(e.target.value)}
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
                value={lastName}
                onChange={e => setLastName(e.target.value)}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
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
                value={nameProvider}
                onChange={e => setNameProvider(e.target.value)}
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
                value={cpf}
                onChange={e => setCpf(e.target.value)}
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
                value={address}
                onChange={e => setAddress(e.target.value)}
                autoComplete="cep"
                name="cep"
                variant="outlined"
                required
                fullWidth
                id="cep"
                label="CEP"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                value={key}
                onChange={e => setKey(e.target.value)}
                name="secret"
                variant="outlined"
                required
                fullWidth
                id="secret"
                label="Secret key"
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
