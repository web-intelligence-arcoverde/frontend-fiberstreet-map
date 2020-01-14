import React, { useState, useEffect } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Modal, Button, Form } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import { Creators as CablesCreators } from '../../../redux/store/ducks/cabo';
import { Creators as MapCreators } from '../../../redux/store/ducks/map';

import { Container } from './CSS/styled';
import './CSS/styled.css';

function ViewCable(props) {
  const { data } = props.redux.cabo.viewCable;
  const { visible } = props.redux.cabo.viewCable;
  const { hideViewCable } = props;

  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [fibra, setFibra] = useState('');
  const [obs, setObs] = useState('');

  const { showIcons, setSubDelemitation } = props;

  useEffect(() => {
    if (visible) {
      setNome(data.name);
      setModelo(data.type);
      setFibra(data.fiberAmount);
      setObs(data.obs);
      // alert(data.)
    }

    return () => {
      setNome('');
      setModelo('');
      setFibra('');
      setObs('');
    };
  }, [visible]);

  function updateCable() {
    const { updateCableRequest } = props;
    const cabo = {
      name: nome,
      type: modelo,
      fiberAmount: fibra,
    };
    updateCableRequest(data.id, cabo);
    hideView();
  }

  function hideView() {
    setNome('');
    setModelo('');
    setFibra('');
    setObs('');

    hideViewCable();
  }

  function addCable() {
    const { setDelimitation, setDrawType } = props;
    setSubDelemitation('cabo');
    setDelimitation('cabo');
    setDrawType('REDRAW');
    showIcons();
    hideViewCable();
  }

  function drawnCable() {
    const { addCoordCabo, setDelimitation, setDrawType } = props;
    const coordinates = JSON.parse(data.coordinates);
    const coord = [
      coordinates[coordinates.length - 1].longitude,
      coordinates[coordinates.length - 1].latitude,
    ]; // pegar posição do objeto que saiu o cabo

    setDelimitation('cabo');
    setSubDelemitation('cabo');
    setDrawType('DRAW');
    addCoordCabo([coord]);
    showIcons();
    hideViewCable();
  }

  function deleteCable() {
    const { deleteCableRequest } = props;
    const options = {
      onOk: () => {
        deleteCableRequest(data.id);
        hideViewCable();
      },
      onCancel: () => {},
    };

    toastr.confirm('Deseja mesmo deletar este cabo?', options);
  }

  return (
    <Modal show={visible} onHide={hideView} size="lg">
      <Modal.Header
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#F7D358',
        }}
      >
        <Modal.Title>Informações do cabo</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nome do cabo:</Form.Label>
            <Form.Control
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Modelo do cabo:</Form.Label>
            <Form.Control
              required
              value={modelo}
              onChange={e => setModelo(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantidade de fibras:</Form.Label>
            <Form.Control
              required
              value={fibra}
              onChange={e => setFibra(e.target.value)}
              type="number"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Observação:</Form.Label>
            <Form.Control
              required
              value={obs}
              onChange={e => setObs(e.target.value)}
              type="area"
            />
          </Form.Group>
        </Modal.Body>
        <Container>
          <Button
            variant="info"
            onClick={() => {
              drawnCable();
              setSubDelemitation('anywhere');
            }}
            className="item"
          >
            Adicionar cto
          </Button>
          <Button
            variant="info"
            onClick={() => {
              drawnCable();
              setSubDelemitation('anywhere');
            }}
            className="item"
          >
            Adicionar ceo
          </Button>
          <Button variant="info" className="item" onClick={updateCable}>
            Atualizar informações
          </Button>
          <Button variant="info" onClick={drawnCable} className="item">
            Desenhar
          </Button>

          <Button variant="info" onClick={addCable} className="item">
            Re-desenhar
          </Button>
          <Button variant="danger" onClick={deleteCable} className="item">
            Excluir
          </Button>
          <Button variant="danger" onClick={hideView} className="item">
            Sair
          </Button>
        </Container>
      </Form>
    </Modal>
  );
}
const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CablesCreators, ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewCable);
