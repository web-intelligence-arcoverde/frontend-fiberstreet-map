import PropTypes from "prop-types";
import React from "react";

//UI-Components
import { Navbar, Form, FormControl, Dropdown } from "react-bootstrap";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// const Header = ({ title, iconClassNameRight }) => {
//   return <AppBar title={title} />;
// };

function Header(props) {
  return (
    <Grid container spacing={3}>
      <Navbar fixed="top" variant="light">
        <Grid item xs={2}></Grid>

        <Grid item xs={1}>
          <ThemeProvider theme={theme}>
            <Typography variant="h5">Fibertreet</Typography>
          </ThemeProvider>
        </Grid>

        <Grid item xs={2}></Grid>

        <Grid item xs={2}>
          <Form inline>
            <FormControl type="text" placeholder="Procurar..." />
          </Form>
        </Grid>

        <Grid item xs={3}></Grid>

        <Grid item xs={1}>
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
        </Grid>
      </Navbar>
    </Grid>
  );
}

const { string } = PropTypes;

Header.propTypes = {
  title: string.isRequired,
  iconClassNameRight: string.isRequired
};

export default Header;
