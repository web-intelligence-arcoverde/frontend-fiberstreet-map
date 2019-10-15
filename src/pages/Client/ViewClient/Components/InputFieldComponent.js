/**
 * Usando classes(CSS) nos components
 * EX: className={classes.nomeClass} or {classes.button}
 * const classes = makeStyles();
 */

import React, { useState } from "react";

//Componentes
import { InputGroup, Button, FormControl } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

export function InputField({ value, name, type, onChange }) {
  const [teste, setTeste] = useState(true);
  function click(e) {
    setTeste(!teste);
  }
  return (
    <div>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text
            style={{
              backgroundColor: "white",
              borderStyle: "hidden"
            }}
          >
            {name}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          style={{ borderStyle: "hidden" }}
          disabled={teste}
          value={value}
          type={type}
          onChange={onChange}
        />
        <InputGroup.Append>
          {teste === true ? (
            <Button variant="white" onClick={click}>
              <EditIcon />
            </Button>
          ) : (
            <Button variant="white" onClick={click}>
              <CheckIcon />
            </Button>
          )}
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
