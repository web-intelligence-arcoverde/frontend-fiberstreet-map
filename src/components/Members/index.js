import React, { useEffect, useState, useMemo } from "react";

import { useSelector, useDispatch, useStore } from "react-redux";
import { Creators } from "../../redux/store/ducks/members";

import Modal from "react-modal";
import { Button } from "react-bootstrap";

import { MembersList } from "./styles";
import Select from "react-select";

function Members(props) {
  const [roles, setRoles] = useState(null);

  const members = useStore().getState().members;
  // const members = useSelector(state => state.members);

  const dispatch = useDispatch();

  const hideModal = useMemo(() => {
    dispatch(Creators.closeMembersModal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getMembersRequest());
  }, [dispatch]);

  const handleRolesChange = useMemo(
    (id, roles) => {
      dispatch(Creators.updateMemberRequest(id, roles));
    },
    [dispatch]
  );

  return (
    <Modal
      isOpen={members.membersModalOpen}
      contentLabel="Membros"
      onRequestClose={hideModal}
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <h1>Membros</h1>

      <form>
        <MembersList>
          {members.data.map(member => (
            <li key={member.id}>
              <strong>{member.user.name}</strong>
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
        <Button variant="danger" onClick={hideModal} className="item">
          Fechar
        </Button>
        <Button onClick={() => {}}>Cancelar</Button>
      </form>
    </Modal>
  );
}

export default Members;
