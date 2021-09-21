import React, { useState } from 'react';

// Conectores
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Creators
import { Modal, Button } from '@material-ui/core';
import { Creators as actionProvider } from '../../../redux/store/ducks/provider';

// Components UI

function AddProvider(props) {
  const { hideModalNewProvider } = props;

  const { viewNewProvider } = props.redux.provider;

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cnpjUnmasked, setCnpjUnmasked] = useState('');
  const [address, setAddress] = useState('');

  function handleCeo(e) {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const newProvider = {
      name,
      cnpj: cnpjUnmasked,
      address,
    };

    hideModalNewProvider();
    setName('');
    setCnpj('');
    setAddress('');
  }

  function cpfCnpj(v) {
    // Remove tudo o que não é dígito
    v = v.replace(/\D/g, '');
    // CNPJ
    // Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    // Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    // Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    // Coloca um hífen depois do bloco de quatro dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
    return v;
  }

  return (
    <Modal show={viewNewProvider.visible} onHide={hideModalNewProvider}>
      <form onSubmit={handleCeo}>
        Cadastrar Provedor
        <label>Nome</label>
        <input
          required
          minLength="15"
          maxLength="255"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label>CNPJ</label>
        <input
          required
          type="text"
          maxLength="18"
          minLength="18"
          value={cnpj}
          onChange={e => {
            setCnpjUnmasked(e.target.value);
            setCnpj(cpfCnpj(e.target.value));
          }}
        />
        <label>Endereco</label>
        <input
          required
          minLength="20"
          maxLength="255"
          type="text"
          onChange={e => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <Button variant="secondary" onClick={hideModalNewProvider}>
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
  bindActionCreators({ ...actionProvider }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddProvider);
