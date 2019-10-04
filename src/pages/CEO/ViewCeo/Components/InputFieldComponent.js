import React from "react";

import { InputGroup, Button, FormControl } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

export default function InputField(props) {
  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text
          style={{
            backgroundColor: "white",
            borderStyle: "hidden"
          }}
        >
          {props.name}
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        value={props.atributo}
        style={{ borderStyle: "hidden" }}
        type={props.tipo}
      />
      <InputGroup.Append>
        <Button variant="white">
          <CheckIcon />
        </Button>
        <Button variant="white">
          <EditIcon />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
