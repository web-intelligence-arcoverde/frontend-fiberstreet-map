import React from 'react';

import { Button } from '@material-ui/core';

// Componentes criados
import { Container } from './styles';

function Index() {
  return (
    <Container>
      <div
        style={{
          position: 'relative',
          paddingLeft: '22px',
          paddingTop: '40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div id="tooltip-disabled">Opções do usuario.</div>

          <Button />

          <Button>
            <i className="fa fa-plus" style={{ color: 'white' }} />
          </Button>

          <Button>
            <i
              className="fa fa-cog"
              aria-hidden="true"
              style={{ color: 'white' }}
            />
          </Button>

          <input
            label="cabo"
            aria-label="option 1"
            style={{ marginTop: '5px' }}
          />

          <input label="clientes" style={{ marginTop: '10px' }} />

          <input label="ceo" style={{ marginTop: '10px' }} />
        </div>
      </div>
    </Container>
  );
}

export default Index;
