import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch, useStore, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '../../redux/store/ducks/members';

import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

import { MembersList } from './styles';
import Select from 'react-select';

function Members(props) {
  const [roles, setRoles] = useState(null);
  const { members } = props;

  const { closeMembersModal, getMembersRequest, updateMemberRequest } = props;

  useEffect(() => {
    getMembersRequest();
  }, [members.membersModalOpen]);

  function handleRolesChange(id, roles) {
    updateMemberRequest(id, roles);
  }

  return (
    <Modal
      isOpen={members.membersModalOpen}
      contentLabel="Membros"
      onRequestClose={closeMembersModal}
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <h1>Membros</h1>

      <form>
        <MembersList>
          {members.data.length > 0 &&
            members.data.map(member => (
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
        <Button variant="danger" onClick={closeMembersModal} className="item">
          Fechar
        </Button>
        <Button onClick={() => {}}>Cancelar</Button>
      </form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
