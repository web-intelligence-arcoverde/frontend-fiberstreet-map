import React from "react";
import PropTypes from "prop-types";
import { AppBar } from "material-ui";

// Por enquanto não conecta com o Redux

const Header = ({ title }) => {
  return <AppBar title={title} />;
};

const { string } = PropTypes;

Header.propTypes = {
  title: string.isRequired
};

export default Header;
