import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';

// Conectores
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Creators
import { Creators as splitterCreators } from '../../../redux/store/ducks/splitter';
import { Creators as ctosActions } from '../../../redux/store/ducks/ctos';

function Splitter(props) {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [balancing, setBalancing] = useState('');

  const { modalEdition } = props.redux.splitter;

  function hide() {
    const { hideSpEditionModal } = props;
    hideSpEditionModal();
  }

  function handleSubmit(e) {}
  return (
    <Modal show={modalEdition.visible} size="lg">
      Informações
      <form onSubmit={handleSubmit}>
        <label>Nome Splitter:</label>
        <input
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Modelo:</label>
        <input
          required
          type="text"
          value={model}
          onChange={e => setModel(e.target.value)}
        />

        <label>Balanceamento:</label>
        <input
          required
          type="number"
          placeholder="Quantidade de saidas do splitter"
          value={balancing}
          onChange={e => setBalancing(e.target.value)}
        />

        <Button variant="danger">Fechar</Button>
        <Button variant="secondary" type="submit ">
          Atualizar
        </Button>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ctosActions, ...splitterCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splitter);
