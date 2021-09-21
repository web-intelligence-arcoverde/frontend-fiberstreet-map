/**
 * Usando classes(CSS) nos components
 * EX: className={classes.nomeClass} or {classes.button}
 * const classes = makeStyles();
 */

import React, { useState } from 'react';

// Componentes
import { InputGroup, Button, FormControl } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

export function InputField({ value, name, type, onChange }) {
  const [teste, setTeste] = useState(true);
  function click(e) {
    setTeste(!teste);
  }
  return (
    <div>
      <div>
        <div>
          <h4
            style={{
              backgroundColor: 'white',
              borderStyle: 'hidden',
            }}
          >
            {name}
          </h4>
        </div>
        <input
          style={{ borderStyle: 'hidden' }}
          disabled={teste}
          value={value}
          type={type}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
