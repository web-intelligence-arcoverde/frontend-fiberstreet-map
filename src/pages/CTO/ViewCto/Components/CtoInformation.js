import React, { useState } from 'react';

// Components Importados
import { Col, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// Creators do redux
import { toastr } from 'react-redux-toastr';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MapCreators } from '../../../../redux/store/ducks/map';
import { Creators as CtoCreatos } from '../../../../redux/store/ducks/ctos';
import ViewPhoto from './PhotoCto';

import { Container } from './CSS/styled';
import './CSS/styled.css';

function Components(props) {
  const { showModalPhoto, hideViewModalCto } = props;
  const { ctos } = props.redux;
  const { viewCto } = ctos;
  const { data } = viewCto;

  const [name, setName] = useState(data.name);
  const [model, setModel] = useState(data.model);
  const [address, setAddress] = useState(data.address);
  const [obs, setObs] = useState(data.obs);

  const [status, setStatus] = useState(data.status);
  const [statuses, setStatuses] = useState([
    {
      value: 'active',
      label: 'Ativa',
    },
    {
      value: 'full',
      label: 'Lotada',
    },
    {
      value: 'cli_cancel',
      label: 'Cliente cancelado',
    },
  ]);

  // Atualizar CTO
  function handleSubmit(e) {
    e.preventDefault();
    let mode;
    if (status === 'Ativa') {
      mode = 'active';
    } else if (status === 'Lotada') {
      mode = 'full';
    } else {
      mode = 'cli_cancel';
    }
    const { updateCtoRequest } = props;
    const updateCto = {
      name,
      model,
      address,
      obs,
      status, // : mode
    };
    updateCtoRequest(updateCto, data.id);
    hideViewModalCto();
  }

  // Deletar CTO
  function deleteCto() {
    const { deleteCtoRequest } = props;
    const options = {
      onOk: () => {
        deleteCtoRequest(data.id);
      },
      onCancel: () => {},
    };

    toastr.confirm('Deseja deletar a cto?', options);
  }

  function openPhoto() {
    showModalPhoto();
  }

  function move() {
    const { hideViewModalCto, setDelimitation, setType } = props;
    hideViewModalCto();
    setType('cto', data.id);
    setDelimitation('mover');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-select-currency"
          select
          label="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          helperText="Selecione o status"
          margin="normal"
          required
        >
          {statuses.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Modelo:</label>

        <input
          type="text"
          value={model}
          onChange={e => setModel(e.target.value)}
        />

        <label>Endereço:</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <label>Observação:</label>
        <input
          as="textarea"
          rows="3"
          value={obs}
          onChange={e => setObs(e.target.value)}
        />

        <Container>
          <>
            {status !== null ? (
              <Button variant="info" className="item">
                Mostrar Foto
              </Button>
            ) : (
              <></>
            )}
          </>
          {false && (
            <Button variant="info" className="item" onClick={showModalPhoto}>
              Adicionar Foto
            </Button>
          )}
          <Button variant="info" className="item" onClick={move}>
            Mover
          </Button>

          <Button variant="info" className="item" type="submit">
            Atualizar dados
          </Button>
          <Button variant="danger" onClick={deleteCto} className="item">
            Excluir
          </Button>
        </Container>
      </form>
      <ViewPhoto />
    </>
  );
}

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CtoCreatos, ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Components);
