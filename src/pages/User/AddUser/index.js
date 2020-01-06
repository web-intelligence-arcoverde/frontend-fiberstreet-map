import React, { useState } from 'react';

//Conectors
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//Reducers
import { Creators as actionsUser } from '../../../redux/store/ducks/user';
import { Creators as InviteActions } from '../../../redux/store/ducks/invite';
import MembersActions from '~/redux/store/ducks/members'
import api from '~/services/api'

//Components UI
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

function AddUser(props) {
  const { hideModalNewUser } = props;
  const { viewNewUser } = props.redux.user;

  const [email, setEmail] = useState('');

  const [validated, setValidated] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { sendInviteRequest } = props;
    sendInviteRequest(email);
    hideModalNewUser();
    // const { inviteNewUserProvider } = props;
    // inviteNewUserProvider(email);
  }

  return (
    <Modal
      show={viewNewUser.visible}
      onHide={hideModalNewUser}
      animation={false}
    >
      <Modal.Header style={{ justifyContent: 'center', color: '#ffc107' }}>
        <Modal.Title>Cadastrar Funcionario</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Insira o e-mail do funcionario:</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              minLength="2"
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalNewUser}>
            Fechar
          </Button>
          {email.length > 5 ? (
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          ) : (
            console.log('')
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
  members: state.members
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionsUser, ...InviteActions, ...MembersActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
