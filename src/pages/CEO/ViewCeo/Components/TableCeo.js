import React, { useState } from 'react';

import { Button } from '@material-ui/core';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Creators redux
import { toastr } from 'react-redux-toastr';
import { Creators as CeoCreators } from '../../../../redux/store/ducks/ceo';
import { Creators as MapCreators } from '../../../../redux/store/ducks/map';

import { Container } from './CSS/styled';
import './CSS/styled.css';

const TableCeo = props => {
  const { data } = props.redux.ceo.viewCeo;

  const [name, setName] = useState(data.name);
  const [type, setType] = useState(data.type);
  const [model, setModel] = useState(data.model);
  const [address, setAddress] = useState(data.address);
  const [obs, setObs] = useState(data.obs);

  function deleteCeo() {
    const { deleteCeoRequest } = props;
    const options = {
      onOk: () => {
        deleteCeoRequest(data.id);
      },
      onCancel: () => {},
    };
    toastr.confirm('Deseja deletar mesmo?', options);
  }

  // Atualizar CEO
  function handleSubmit(e) {
    e.preventDefault();
    const { updateCeoRequest } = props;
    const updateCeo = {
      name,
      type,
      model,
      address,
      obs,
    };
    updateCeoRequest(updateCeo, data.id);
  }

  function move() {
    const { hideViewModalCeo, setDelimitation, setType } = props;
    hideViewModalCeo();
    setType('ceo', data.id);
    setDelimitation('mover');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            required
            minLength="5"
            maxLength="100"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
        </div>

        <div>
          <label>Tipo:</label>
          <input
            required
            minLength="5"
            maxLength="100"
            value={type}
            onChange={e => setType(e.target.value)}
            type="text"
          />
        </div>

        <div>
          <label>Modelo:</label>
          <input
            required
            minLength="5"
            maxLength="100"
            type="text"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
        </div>

        <div>
          <label>Endereço:</label>
          <input
            required
            minLength="5"
            maxLength="100"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label>Observação:</label>
          <input
            required
            minLength="5"
            maxLength="200"
            as="textarea"
            rows="3"
            value={obs}
            onChange={e => setObs(e.target.value)}
          />
        </div>

        <Container>
          <Button variant="danger" className="item" onClick={deleteCeo}>
            Excluir
          </Button>
          <Button variant="info" className="item" onClick={move}>
            Mover Caixa
          </Button>
          <Button variant="info" className="item" type="submit">
            Atualizar informações
          </Button>
        </Container>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CeoCreators, ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableCeo);
