import React from "react";
import PropTypes from "prop-types";
import { AppBar } from "material-ui";

// Por enquanto não conecta com o Redux

const Header = ({ title }) => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
      }}
    >
      <AppBar title={title} />
    </div>
  );
};

const { string } = PropTypes;

Header.propTypes = {
  title: string.isRequired
};

export default Header;
