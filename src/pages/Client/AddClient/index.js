import React, { useState } from 'react';

// Conectores dos Creators
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Creators {reducers}
import { Modal, Button } from '@material-ui/core';
import { Creators as ClientActions } from '../../../redux/store/ducks/cliente';

// Components;

import { cpfMask } from '../../../util/format';

function ClienteAddModal(props) {
  function changeCpf(e) {
    setCpf(cpfMask(e.target.value));
  }

  const { viewNewClient } = props.redux.client;

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const [plano, setPlano] = useState('');
  const [address, setAddress] = useState('');
  const [PPPOE, setPPPOE] = useState('');
  const [obs, setObs] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const { coordinates } = props.redux.client.viewNewClient;
    const { createClientRequest } = props;
    const newClient = {
      name,
      coordinates,
      cpf,
      speed: plano,
      pppoe: PPPOE,
      address,
      obs,
      status: null,
    };
    createClientRequest(newClient);

    handleHideModal();
  }

  function handleHideModal() {
    const { hideNewModalClient } = props;
    hideNewModalClient();
    setName('');
    setCpf('');
    setPlano('');
    setAddress('');
    setPPPOE('');
    setObs('');
  }

  return (
    <>
      <Modal show={viewNewClient.visible} onHide={handleHideModal}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              justifyContent: 'center',
              backgroundColor: '#F7D358',
              color: '#585858',
            }}
          >
            <h1>Cadastrar Cliente</h1>
          </div>

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
            <label>CPF:</label>
            <input
              required
              type="text"
              maxLength="18"
              minLength="14"
              value={cpf}
              onChange={changeCpf}
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
            <label>Planos:</label>
            <input
              required
              type="text"
              as="select"
              value={plano}
              onChange={e => setPlano(e.target.value)}
            >
              <option />
              <option>60</option>
              <option>100</option>
              <option>250</option>
              <option>300</option>
              <option>400</option>
              <option>500</option>
              <option>1</option>
            </input>
          </div>

          <div>
            <label>PPPOE:</label>
            <input
              required
              type="text"
              minLength="5"
              maxLength="100"
              value={PPPOE}
              onChange={e => setPPPOE(e.target.value)}
            />
          </div>

          <div>
            <label>Observações:</label>
            <input
              required
              as="textarea"
              rows="3"
              minLength="10"
              maxLength="255"
              value={obs}
              onChange={e => setObs(e.target.value)}
            />
          </div>

          <Button variant="danger" onClick={handleHideModal}>
            Fechar
          </Button>

          <Button variant="secondary" type="submit">
            Salvar
          </Button>
        </form>
      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ClientActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClienteAddModal);
