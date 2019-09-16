import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
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
                label="Email Address"
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
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
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

// class SignUp extends Component {
//   state = {
//     username: "",
//     email: "",
//     password: "",
//     error: ""
//   };

//   handleSignUp = async e => {
//     e.preventDefault();
//     const { username, email, password } = this.state;
//     if (!username || !email || !password) {
//       this.setState({ error: "Preencha todos os dados para se cadastrar" });
//     } else {
//       try {
//         await api.post("/users", { username, email, password });
//         this.props.history.push("/");
//       } catch (err) {
//         console.log(err);
//         this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
//       }
//     }
//     alert("Eu vou te registrar");
//   };

//   render() {
//     return (
//       <body>
//         <section class="form-section">
//           <h1>FiberStreet</h1>

//           <div class="form-wrapper">
//             <form action="" onSubmit={this.handleSignUp}>
//               <div class="input-block">
//                 <label for="login-email">Email:</label>
//                 <input type="email" id="login-email" />
//               </div>
//               <div class="input-block">
//                 <label for="login-password">Password:</label>
//                 <input type="password" id="login-password" />
//               </div>
//               <a class="link" href="#">
//                 Recuperar senha
//               </a>
//               <button type="submit" class="btn-login">
//                 Entrar
//               </button>
//             </form>
//           </div>
//         </section>
//       </body>
//     );
//   }
// }

// export default withRouter(SignUp);
