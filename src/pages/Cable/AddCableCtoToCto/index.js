import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Creators as CaboCreators } from '../../../redux/store/ducks/cabo';
import { Creators as MapCreators } from '../../../redux/store/ducks/map';

// Components

function ViewAddCable(props) {
  const [cableName, setCableName] = useState('');
  const [fiberAmount, setFiberAmount] = useState('');
  const [cableType, setCableType] = useState('');
  const [obs, setObs] = useState('');

  const { objectTo } = props.redux.cabo;
  const { idFrom, idTo } = props.redux.cabo.idFromTo;
  const { subDelimitation } = props.redux.map;
  const { setDelimitation, setSubDelemitation } = props;
  const { hideModalAddCable, hideIcons } = props;
  const { visible } = props.redux.cabo.idFromTo;

  function hideModal() {
    hideModalAddCable();
    hideIcons();
    setDelimitation('default');
    setSubDelemitation('default');
  }

  /**
   * ceo e cto
   * delimitation ceo
   */

  function handleSubmit(e) {
    e.preventDefault();

    const { polyline } = props.redux.map;

    const coordinates = props.redux.map.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1],
      };
    });
    const coordinatesStrinfigied = JSON.stringify(coordinates);

    const cable = {
      fiberAmount,
      name: cableName,
      type: cableType,
      obs,
      coordinates: coordinatesStrinfigied,
    };

    // subDelimitation, delimitation
    const { saveRel } = props;

    if (subDelimitation === 'cto') {
      // CTO P CTO
      if (objectTo === 'cto') {
        const rel_cto = {
          cto_id: idFrom,
          obs,
        };
        const rel_cto2 = {
          cto_id: idTo,
          obs,
        };
        saveRel('cto', 'cto', rel_cto, rel_cto2, cable);
        // CTO P CEO
      } else {
        const rel_cto = {
          cto_id: idFrom,
          obs,
        };
        const rel_ceo = {
          ceo_id: idTo,
          obs,
        };
        saveRel('cto', 'ceo', rel_cto, rel_ceo, cable);
        // save
      }
    } else {
      // CEO p CEO
      if (objectTo === 'ceo') {
        const rel_ceo = {
          ceo_id: idFrom,
          obs,
        };
        const rel_ceo_2 = {
          ceo_id: idTo,
          obs,
        };
        saveRel('ceo', 'ceo', rel_ceo, rel_ceo_2, cable);
        // save
      } else {
        // CEO p CTO
        const rel_ceo = {
          ceo_id: idFrom,
          obs,
        };
        const rel_cto = {
          cto_id: idTo,
          obs,
        };

        saveRel('ceo', 'cto', rel_ceo, rel_cto, cable);
        // Save
      }
    }
    hideModal();
  }

  return (
    <Modal size="lg" onHide={hideModal} show={visible}>
      <div
        style={{
          justifyContent: 'center',
          fontSize: '30px',
          backgroundColor: '#F7D358',
          paddingTop: '15px',
          paddinBottom: '15px',
        }}
      >
        <h1>Adicionar Cabo</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Observação</label>
        <input type="text" value={obs} onChange={e => setObs(e.target.value)} />

        <div
          style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}
        >
          <label>Nome do cabo</label>
          <input
            type="text"
            value={cableName}
            onChange={e => setCableName(e.target.value)}
          />

          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              width: '50px',
            }}
          >
            <Button variant="secondary">
              <CloseIcon />
            </Button>
          </div>

          <label>Qt Fibras</label>
          <input
            type="number"
            value={fiberAmount}
            onChange={e => setFiberAmount(e.target.value)}
          />

          <label>Tipo</label>
          <input
            type="text"
            value={cableType}
            onChange={e => setCableType(e.target.value)}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <Button variant="secondary" type="submit" style={{ width: '100%' }}>
            Adicionar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CaboCreators, ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewAddCable);
