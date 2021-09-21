import React, { useState, useEffect } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Creators redux

// UI-Components
import { Button, Container, Table } from '@material-ui/core';
import Delete from '@material-ui/icons/HighlightOff';
import Load from '@material-ui/icons/RotateLeft';
import { Creators as ceoCreators } from '../../../../redux/store/ducks/ceo';
import ModalFusao from './ModalFusao';

function ViewFusoes(props) {
  const [open, setOpen] = useState(false);
  const [openFiber, setOpenFiber] = useState(false);
  const [cable, setCable] = useState('');
  const [fib, setFib] = useState('');

  const { showNewViewModalFusao } = props;
  const { hideViewModalCeo } = props;

  function openChange() {
    // hideViewModalCeo();
    showNewViewModalFusao();
  }

  useEffect(() => {
    if (open === true) {
      console.log('fudeu');
    }
  }, [open]);

  return (
    <Container>
      <ModalFusao />
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Bandeja</th>
            <th>Cabo</th>
            <th>Fibra</th>
            <th style={{ textAlign: 'center' }}>x</th>
            <th>Fibra</th>
            <th>Cabo</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>b01</td>
            <td>40gf</td>
            <td>1</td>
            <td>8</td>
            <td>dfv</td>
            <td>33sd</td>

            <td>
              <Button
                variant="link"
                style={{
                  borderTopWidth: '0px',
                  paddingTop: '0px',
                  borderLeftWidth: '0px',
                  paddingLeft: '0px',
                  paddingBottom: '0px',
                  paddingRight: '0px',
                  borderRightWidth: '0px',
                  borderBottomWidth: '0px',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <Delete style={{ color: '#6c757d' }} />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <Button
          variant="secondary"
          type="submit"
          style={{ width: '100%' }}
          onClick={openChange}
        >
          Adicionar uma nova fusão
        </Button>
      </div>
      <ModalFusao />
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ceoCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewFusoes);
