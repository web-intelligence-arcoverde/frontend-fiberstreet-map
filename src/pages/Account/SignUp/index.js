import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Form, Button } from "react-bootstrap/";
import Typography from "@material-ui/core/Typography";

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

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Admin");

  const [nameProvider, setNameProvider] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [key, setKey] = useState("");

  function createUser(e) {
    e.preventDefault();
    console.log("Desgraça");
  }

  function createProvider(e) {
    e.preventDefault();
    alert("Esfolar uma buceta, desgraaaaça");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={e => {
            if (type === "Admin") createProvider(e);
            else createUser(e);
            // type === "Admin" ? createProvider() : createUser()
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            Cadastrar Usuario
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nome"
            name="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Password"
            label="Password"
            name="Password"
            autoComplete="Password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Form.Group>
            <Form.Control
              as="select"
              value={type}
              onChange={e => setType(e.target.value)}
              style={{
                height: "54px",
                marginTop: "16px"
              }}
            >
              <option>Admin</option>
              <option>Funcionario</option>
            </Form.Control>
          </Form.Group>
          <Button variant="secondary" style={{ width: "100%" }} type="submit">
            Prosseguir
          </Button>
        </form>
      </div>
    </Container>
  );
}
