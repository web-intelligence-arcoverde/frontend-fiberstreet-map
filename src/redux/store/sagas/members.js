import { call, put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import api from '../../../services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call([api, 'get'], 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) });
    yield toastr.success(
      'Membro atualizado',
      'O membro foi atualizado com sucesso'
    );
  } catch (err) {
    yield toastr.error('Membro não atualizado', 'O membro não foi atualizado');
  }
}
