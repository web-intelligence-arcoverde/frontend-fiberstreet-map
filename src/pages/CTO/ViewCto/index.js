import React, { useEffect, useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Componentes importados
import { Modal, Accordion, Card } from '@material-ui/core';
// API
import api from '../../../services/api';

// Creators do redux
import { Creators as ctosActions } from '../../../redux/store/ducks/ctos';
import { Creators as SplitterActions } from '../../../redux/store/ducks/splitter';

// Componentes "criados"
import CtoInformation from './Components/CtoInformation';
import TableClients from './Components/TableUsers';
import TableSplitter from './Components/TableSplitter';
import TableCable from './Components/TableCable';

// Tamanho das box
function ViewCto(props) {
  const { ctos } = props.redux;
  const { hideViewModalCto } = props;

  const { viewCto } = ctos; // Recuperando o estado inicial da CTO
  const { data } = viewCto;

  function modalSplitter() {
    const { showModal } = props;
    showModal();
  }

  return (
    <Modal size="lg" show={viewCto.visible} onHide={hideViewModalCto}>
      <Card>
        <Card.Header
          style={{
            fontSize: '40px',
            backgroundColor: '#F7D358',
            textAlign: 'center',
          }}
        >
          Caixa Terminal Optica
        </Card.Header>
        <div variant="flush">
          <div>
            <Accordion>
              <Card>
                <div
                  as={Card.Header}
                  eventKey="0"
                  style={{ backgroundColor: '#6c757d', color: '#FFF' }}
                >
                  <h5>Informações do terminal optico</h5>
                </div>
                <div>
                  <Card
                    style={{
                      paddingTop: '10px',
                      paddingLeft: '5px',
                      paddingBottom: '0px',
                    }}
                  >
                    <CtoInformation />
                  </Card>
                </div>
              </Card>
              <Card>
                <div
                  as={Card.Header}
                  eventKey="1"
                  style={{ backgroundColor: '#6c757d', color: '#FFF' }}
                >
                  <h5>Clientes no terminal</h5>
                </div>
                <div>
                  <Card
                    style={{
                      paddingTop: '10px',
                      paddingLeft: '5px',
                      paddingBottom: '0px',
                    }}
                  >
                    <TableClients />
                  </Card>
                </div>
              </Card>
              <Card>
                <div
                  as={Card.Header}
                  eventKey="2"
                  style={{ backgroundColor: '#6c757d', color: '#FFF' }}
                >
                  <h5>Splitters</h5>
                </div>
                <div>
                  <Card.Body
                    style={{
                      paddingTop: '10px',
                      paddingLeft: '5px',
                      paddingBottom: '0px',
                    }}
                  >
                    <TableSplitter />
                  </Card.Body>
                </div>
              </Card>
              <Card>
                <div
                  as={Card.Header}
                  eventKey="3"
                  style={{ backgroundColor: '#6c757d', color: '#FFF' }}
                >
                  <h5>Cabos</h5>
                </div>
                <div>
                  <div
                    style={{
                      paddingTop: '10px',
                      paddingLeft: '5px',
                      paddingBottom: '0px',
                    }}
                  >
                    <TableCable />
                  </div>
                </div>
              </Card>
            </Accordion>
          </div>
        </div>
      </Card>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions, ...SplitterActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewCto);

/**
 * <Modal.Header
        style={{ backgroundColor: "#F7D358", justifyContent: "center" }}
      >
        <Modal.Title>
          <h3>Caixa Terminal Optico</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
            >
 */
