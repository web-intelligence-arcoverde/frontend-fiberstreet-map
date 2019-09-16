import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";

import "./style.css";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/users", { username, email, password });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
    alert("Eu vou te registrar");
  };

  render() {
    return (
      <body>
        <section class="form-section">
          <h1>FiberStreet</h1>

          <div class="form-wrapper">
            <form action="" onSubmit={this.handleSignUp}>
              <div class="input-block">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" />
              </div>
              <div class="input-block">
                <label for="login-password">Password:</label>
                <input type="password" id="login-password" />
              </div>
              <a class="link" href="#">
                Recuperar senha
              </a>
              <button type="submit" class="btn-login">
                Entrar
              </button>
            </form>
          </div>
        </section>
      </body>
    );
  }
}

export default withRouter(SignUp);
