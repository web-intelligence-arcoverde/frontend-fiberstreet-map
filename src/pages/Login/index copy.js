import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/auth";

//Componentes
import { Form, Container } from "react-bootstrap";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {}

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Insira seu e-mail"
          required
          onChange={setEmail}
        />
        <input
          type="password"
          placeholder="Insira sua senha secreta"
          required
          onChange={setPassword}
        />
        <button type="submit">Entrar</button>
        <hr />
        <Link to="/signup">Ainda não possui conta? Cadastre-se</Link>
      </Form>
    </Container>
  );
}
