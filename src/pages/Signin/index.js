import React, { Component } from "react";

export default class Signin extends Component {
  render() {
    return (
      <>
        <div className="auth-wrapper">
          <form action="/dashboard" method="POST">
            <label for="email">
              <input
                id="email"
                name="password"
                type="text"
                placeholder="Insert your login here"
              />
            </label>
            <label for="password">
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Insert your login here"
              />
            </label>
            <button type="submit">Entrar</button>
          </form>
        </div>
      </>
    );
  }
}
