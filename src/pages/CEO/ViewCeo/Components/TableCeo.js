import React, { useState, useEffect } from 'react';

import { Col, Form, Button } from 'react-bootstrap/';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Creators redux
import { Creators as CeoCreators } from '../../../../redux/store/ducks/ceo';
import { Creators as MapCreators } from '../../../../redux/store/ducks/map';
import { toastr } from 'react-redux-toastr';

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

  //Atualizar CEO
  function handleSubmit(e) {
    e.preventDefault();
    const { updateCeoRequest } = props;
    const updateCeo = {
      name: name,
      type: type,
      model: model,
      address: address,
      obs: obs,
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
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Tipo:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              value={type}
              onChange={e => setType(e.target.value)}
              type="text"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Modelo:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Endereço:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="100"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Observação:</Form.Label>
            <Form.Control
              required
              minLength="5"
              maxLength="200"
              as="textarea"
              rows="3"
              value={obs}
              onChange={e => setObs(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

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
      </Form>
    </>
  );
};

const mapStateToProps = state => ({
  redux: state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...CeoCreators, ...MapCreators }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableCeo);
