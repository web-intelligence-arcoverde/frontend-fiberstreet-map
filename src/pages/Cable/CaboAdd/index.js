import React, { useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';

// Components
import { Modal, Button, Container } from '@material-ui/core';
import { Creators as CaboCreators } from '../../../redux/store/ducks/cabo';
import { Creators as DropCreators } from '../../../redux/store/ducks/drop';
import { Creators as MapCreators } from '../../../redux/store/ducks/map';

function CaboAdd(props) {
  const { newCabo } = props.redux.cabo;

  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [fibra, setFibra] = useState(0);
  const TNAME = 'nome';
  const TMODEL = 'modelo';

  function hideModal() {
    const { hideAddCableCto, setDelimitation } = props;
    hideAddCableCto();
    setDelimitation('default');
  }

  function handleSubmit() {
    // e.preventDefault();
    /* let coordinates = props.redux.map.polyline.map(linha => {
      return {
        longitude: linha[0],
        latitude: linha[1],
      };
    });
    let coordinatesStrinfigied = JSON.stringify(coordinates);

    const cabo = {
      name: nome,
      type: modelo,
      fiberAmount: fibra,
      coordinates, //: coordinatesStrinfigied
    }; */
    const { addCoordCabo, hideIcons } = props;
    setNome('');
    setModelo('');
    addCoordCabo([]);
    hideModal();
    hideIcons();
    const { showDropAddModalRequest } = props;
    const dropNdCtoId = {
      drop: null,
      cto_id: newCabo.ctoId,
    };

    showDropAddModalRequest(dropNdCtoId);
  }

  function handleChange(event, mode) {
    const { value } = event.target;

    switch (mode) {
      case TNAME:
        setNome(value);
        break;
      case TMODEL:
        setModelo(value);
        break;
      case 'QTFIBRA':
        setFibra(value);
        break;
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Modal show={newCabo.isVisible} onHide={hideModal}>
        <form
        // onSubmit={handleSubmit}
        >
          Adicionar cabo do cliente
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
          <Button variant="secondary" onClick={handleSubmit}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CaboAdd);
