import PropTypes from "prop-types";
import React from "react";

//UI-Components
import {Navbar, Col, Form, FormControl, Container, Row, Dropdown} from 'react-bootstrap';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// const Header = ({ title, iconClassNameRight }) => {
//   return <AppBar title={title} />;
// };


function Header(props) {
  return (
    
    <Container>
       
       <Row>

        <Navbar fixed='top' variant='light'>    

            

            <Col md={{offset:1}}>
            <ThemeProvider theme={theme}>
              <Typography variant="h5">GZNET</Typography>
            </ThemeProvider>
            </Col>

            <Col></Col>

            <Col>     
              <Form inline>
                <FormControl type="text" placeholder="Search"/>
              </Form>
            </Col>

            <Col></Col>
            
            <Col>
              
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic" style={{color:'white'}}>
                  <i class="fa fa-user-circle" style={{color:'white'}}></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>@User</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Perfil</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Col>

        </Navbar>

      </Row>
    </Container>
  );
}

const { string } = PropTypes;

Header.propTypes = {
  title: string.isRequired,
  iconClassNameRight: string.isRequired
};

export default Header;
