import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch, useStore, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from '@material-ui/core';
import Select from 'react-select';
import MembersActions from '../../redux/store/ducks/members';

import { MembersList } from './styles';

import api from '~/services/api';

function Members(props) {
  const [roles, setRoles] = useState([]);
  const { members } = props;

  const { closeMembersModal, getMembersRequest, updateMemberRequest } = props;

  useEffect(() => {
    async function getMembers() {
      getMembersRequest();

      const response = await api.get('roles');

      await setRoles(response.data);
    }

    getMembers();
  }, [members.membersModalOpen]);

  function handleRolesChange(id, roles) {
    updateMemberRequest(id, roles);
  }

  return (
    <Modal
      show={members.membersModalOpen}
      contentLabel="Membros"
      onHide={closeMembersModal}
    >
      <Modal.Header
        style={{
          justifyContent: 'center',
          backgroundColor: '#F7D358',
          color: '#585858',
        }}
      >
        <Modal.Title>Membros</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <MembersList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.user.username}</strong>
                <Select
                  isMulti
                  options={roles}
                  value={member.roles}
                  getOptionLabel={role => role.name}
                  getOptionValue={role => role.id}
                  onChange={value => handleRolesChange(member.id, value)}
                />
              </li>
            ))}
          </MembersList>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeMembersModal} className="item">
          Fechar
        </Button>
        <Button onClick={() => {}}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
