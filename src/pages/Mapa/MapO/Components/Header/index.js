import PropTypes from "prop-types";
import React, { Component } from "react";

//UI-Components
import { Navbar, Form, FormControl, Dropdown } from "react-bootstrap";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./style.css";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle
            variant="warning"
            id="dropdown-basic"
            style={{ color: "white" }}
          >
            <i class="fa fa-user-circle" style={{ color: "white" }}></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>@User</Dropdown.Item>

            <Dropdown.Item>Perfil</Dropdown.Item>

            <Dropdown.Item>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

const { string } = PropTypes;

Header.propTypes = {
  title: string.isRequired,
  iconClassNameRight: string.isRequired
};

export default Header;
