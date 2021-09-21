import React, { useState } from 'react';

// Conectores
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Creators
import { Modal, Container, Button } from '@material-ui/core';
import { Creators as splitterCreators } from '../../../redux/store/ducks/splitter';
import { Creators as ctosActions } from '../../../redux/store/ducks/ctos';

// Componentes

function AddNewSplitter(props) {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [balancing, setBalancing] = useState('');

  const { splitter } = props.redux; // Dados do splitter
  const { data } = props.redux.ctos.viewCto; // Dados da cto
  const { hideViewModalCto } = props;
  const { hideSplitterAddModal } = props;

  async function handleSplitter(e) {
    e.preventDefault();
    const { createSplitterRequest } = props;
    const newSplitter = {
      name,
      balancing,
      model,
      cto_id: data.id,
    };
    createSplitterRequest(newSplitter);
    hideSplitterAddModal();
    hideViewModalCto();
  }

  function closeModal() {
    hideSplitterAddModal();
  }

  return (
    <Container>
      <Modal
        show={splitter.modalNewSplitter.visible}
        onHide={closeModal}
        size="lg"
      >
        Adicionar splitter
        <form onSubmit={handleSplitter}>
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

          <Button variant="secondary" onClick={closeModal}>
            Fechar
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
  bindActionCreators({ ...ctosActions, ...splitterCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSplitter);
