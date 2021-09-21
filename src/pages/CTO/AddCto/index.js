import React, { useState } from 'react';

// Redux connect Actions
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button } from '@material-ui/core';

// Creators
import { Creators as ctoCreators } from '../../../redux/store/ducks/ctos';

// UI-Components

function AddNewCto(props) {
  const { HideNewViewModalCto } = props;
  const { visible } = props.redux.ctos.viewNewCto;

  const [name, setName] = useState('');
  const [observacao, setObservacao] = useState('');
  const [model, setModel] = useState('');
  const [address, setAddress] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newCto = {
      name,
      coordinates: props.redux.ctos.viewNewCto.coordinates,
      model,
      address,
      obs: observacao,
    };

    const { createCtoRequest } = props;

    createCtoRequest(newCto);

    hideModal();
  }

  function hideModal() {
    HideNewViewModalCto();
    setName('');
    setAddress('');
    setModel('');
    setObservacao('');
  }

  return (
    <Modal show={visible} onHide={hideModal}>
      <form onSubmit={handleSubmit}>
        <h1>Caixa Terminal Óptica</h1>

        <div>
          <label>Nome:</label>
          <input
            required
            minLength="5"
            maxLength="150"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Endereço:</label>
          <input
            required
            minLength="5"
            maxLength="150"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label>Modelo:</label>
          <input
            required
            minLength="5"
            maxLength="50"
            type="text"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
        </div>

        <div>
          <label>Observações:</label>
          <input
            required
            minLength="5"
            maxLength="255"
            as="textarea"
            rows="3"
            value={observacao}
            onChange={e => setObservacao(e.target.value)}
          />
        </div>

        <Button variant="danger" onClick={hideModal}>
          Fechar
        </Button>

        <Button variant="secondary" type="submit">
          Salvar
        </Button>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctoCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCto);
