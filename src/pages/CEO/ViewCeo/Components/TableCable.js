import React, { useEffect, useState } from 'react';

// API
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Table } from '@material-ui/core';
import Delete from '@material-ui/icons/HighlightOff';
import api from '../../../../services/api';

// redux

// Creators redux
import { Creators as ceoCreators } from '../../../../redux/store/ducks/ceo';
import { Creators as mapCreators } from '../../../../redux/store/ducks/map';
import { Creators as cableCreators } from '../../../../redux/store/ducks/cabo';

import { positionObject } from '../../../Functions/get-position-object/index';

// UI-Components

function ViewFusoes(props) {
  const { data, visible } = props.redux.ceo.viewCeo;

  const { hideViewModalCeo } = props;

  const [cables, setCables] = useState([]);

  function addCable() {
    const {
      showIcons,
      addCoordCabo,
      setSubDelemitation,
      setIdFrom,
      setDelimitation,
      setTypeAndId,
    } = props;

    setDelimitation('cabo');
    setSubDelemitation('ceo');
    addCoordCabo(positionObject(data));
    setIdFrom(data.id);
    setTypeAndId('CEO', data.id);
    showIcons();
    hideViewModalCeo();
  }

  useEffect(() => {
    if (visible) {
      api.get(`cables/ceo/${data.id}`).then(response => {
        const { data } = response;
        setCables(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function deleteCableRelationship(index) {
    const response = window.prompt(
      'Deseja mesmo deletar? Digite SIM para deletar'
    );
    const { deleteCableRelationshipRequest } = props;

    if (response === 'SIM') {
      deleteCableRelationshipRequest(index, data.id, 'CEO');
      hideViewModalCeo();
    }
  }

  return (
    <Container>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Cabo</th>
            <th>Quantidade de Fibras</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cables.map((relationship, index) => (
            <tr key={index}>
              <td>{relationship.cable.name}</td>
              <td>{relationship.cable.fiberAmount}</td>
              <td>{relationship.cable.obs}</td>

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
                  <Delete
                    style={{ color: '#6c757d' }}
                    onClick={() => deleteCableRelationship(relationship.id)}
                  />
                </Button>
              </td>
            </tr>
          ))}
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
          style={{ width: '100%' }}
          onClick={addCable}
        >
          Adicionar um novo cabo
        </Button>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state,
  fiberfusion: state.fiberfusion,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...ceoCreators, ...mapCreators, ...cableCreators },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewFusoes);
