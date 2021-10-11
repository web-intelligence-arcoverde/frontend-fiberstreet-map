// React
import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Creators
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { Modal, Button } from '@material-ui/core';
import { Creators as MapCreators } from '../../../../../redux/store/ducks/map';
import { Creators as CableActions } from '../../../../../redux/store/ducks/cabo';
import { Creators as ImportActions } from '../../../../../redux/store/ducks/imports';
import AuthActions from '../../../../../redux/store/ducks/auth';

// Componentes @material-ui / react-bootstrap

// Componentes criados
import { Container } from './styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingLeft: '22px',
    paddingTop: '40px',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
}));

function ImportData(props) {
  const [geojson, setGeojson] = useState('');
  const [layerType, setLayerType] = useState('');
  const [reqType, setReqType] = useState('');
  const {
    loading,
    modal: { visible },
  } = props.imports;

  const { importGeojsonRequest, closeImportGeojsonModal } = props;

  function hideModal() {
    closeImportGeojsonModal();
  }

  function handleSubmit(e) {
    e.preventDefault();
    importGeojsonRequest(geojson, layerType, reqType);
    setGeojson('');
    setLayerType('');
    setReqType('');
  }

  return (
    <Modal show={visible} onHide={hideModal}>
      <form onSubmit={handleSubmit}>
        Importar via GEOJSON
        <div>
          <label>GeoJSON or XML:</label>
          <input
            required
            as="textarea"
            value={geojson}
            onChange={e => setGeojson(e.target.value)}
            // onChange={e => setGeojson(JSON.parse(e.target.value))}
          />
        </div>
        <div>
          <label>is GeoJSON or XML?</label>
          <input
            required
            type="text"
            value={reqType}
            onChange={e => setReqType(e.target.value)}
            // onChange={e => setGeojson(JSON.parse(e.target.value))}
          />
        </div>
        <div>
          <label>Tipo: (CLIENTS, CTOS, CEOS)</label>
          <input
            required
            minLength="3"
            type="text"
            value={layerType}
            onChange={e => setLayerType(e.target.value)}
          />
        </div>
        <Button onClick={hideModal}>Fechar</Button>
        <Button type="submit">Salvar</Button>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  imports: state.imports,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ImportActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImportData);
