import React, { useState } from 'react';

// Conectors
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Reducers
import { Modal, Button, Select } from '@material-ui/core';
import { Creators as actionsUser } from '../../../redux/store/ducks/user';
import { Creators as InviteActions } from '../../../redux/store/ducks/invite';
import MembersActions from '~/redux/store/ducks/members';
import api from '~/services/api';

// Components UI

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
      Cadastrar Funcionario
      <form onSubmit={handleSubmit}>
        <label>Insira o e-mail do funcionario:</label>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          minLength="2"
          onChange={e => setEmail(e.target.value)}
        />

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
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  redux: state,
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...actionsUser, ...InviteActions, ...MembersActions },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
