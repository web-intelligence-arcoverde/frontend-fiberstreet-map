import PropTypes from "prop-types";
import React, { Component } from "react";

//UI-Components
import { Navbar, Form, FormControl, Dropdown } from "react-bootstrap";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "../LeftSelector/styles";

import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    paddingLeft: "22px",
    paddingTop: "0px"
  },
  paper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <>
      <div style={{ height: "70px" }}>
        <Dropdown
          as={ButtonGroup}
          style={{
            marginRight: "20px",
            marginLeft: "30px",
            marginTop: "20px"
          }}
        >
          <Badge badgeContent={4} color="primary">
            <Button variant="warning">
              <i
                class="fa fa-exclamation-circle"
                style={{ color: "white" }}
              ></i>
            </Button>
          </Badge>
        </Dropdown>

        <Dropdown as={ButtonGroup} style={{ marginTop: "20px" }}>
          <Badge badgeContent={4} color="primary">
            <Button variant="warning">
              <i class="fa fa-envelope" style={{ color: "white" }}></i>
            </Button>
          </Badge>
        </Dropdown>
      </div>
    </>
  );
}
