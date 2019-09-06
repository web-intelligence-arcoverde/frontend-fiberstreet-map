import React from "react";

import PropTypes from "prop-types";

import { RaisedButton } from "material-ui";
import { Container } from "./styles";

const ButtonGeneric = ({ label, primary, onClickFunction }) => {
  return (
    <Container>
      <RaisedButton
        label={label}
        primary={primary}
        onTouchTap={onClickFunction}
      />
    </Container>
  );
};

const { string, bool, func } = PropTypes;

ButtonGeneric.propTypes = {
  label: string.isRequired,
  primary: bool.isRequired,
  onClickFunction: func.isRequired
};

export default ButtonGeneric;
