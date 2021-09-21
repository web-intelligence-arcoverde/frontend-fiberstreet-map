import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Container } from '@material-ui/core';
import { Creators as DropCreators } from '../../../redux/store/ducks/drop';
import { Creators as CaboCreators } from '../../../redux/store/ducks/cabo';
import { Creators as MapCreators } from '../../../redux/store/ducks/map';

// Components

function AddCable(props) {
  const { newCable } = props.redux.cabo;

  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [fibra, setFibra] = useState(0);
  const [obs, setObs] = useState('');

  function hideModal() {
    const { hideNewCable, setDelimitation } = props;
    hideNewCable();
    setDelimitation('default');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      createCableRequest,
      createCableWithRelationshipRequest,
      addCoordCabo,
    } = props;
    const coordinates = props.redux.map.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1],
      };
    });
    const coordinatesStrinfigied = JSON.stringify(coordinates);
    const { cableId } = props.redux.cabo;
    const cabo = {
      name: nome,
      type: modelo,
      coordinates: coordinatesStrinfigied,
      fiberAmount: fibra,
      obs,
    };
    createCableRequest(cabo);
    hideModal();
    addCoordCabo([]);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Modal show={newCable.visible} onHide={hideModal}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              justifyContent: 'center',
              backgroundColor: '#F7D358',
              color: '#6c757d',
            }}
          >
            Adicionar cabo solto
          </div>

          <label>Nome do cabo:</label>
          <input
            required
            value={nome}
            onChange={e => setNome(e.target.value)}
            type="text"
          />

          <label>Modelo do cabo:</label>
          <input
            required
            value={modelo}
            onChange={e => setModelo(e.target.value)}
            type="text"
          />

          <label>Observação:</label>
          <input
            required
            value={obs}
            onChange={e => setObs(e.target.value)}
            type="text"
          />

          <label>Quantidade de fibras:</label>
          <input
            required
            value={fibra}
            onChange={e => setFibra(e.target.value)}
            type="number"
          />

          <Button variant="danger" onClick={hideModal}>
            Sair
          </Button>
          <Button variant="secondary" type="submit">
            Salvar
          </Button>
        </form>
      </Modal>
    </Container>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...CaboCreators, ...DropCreators, ...MapCreators },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddCable);
