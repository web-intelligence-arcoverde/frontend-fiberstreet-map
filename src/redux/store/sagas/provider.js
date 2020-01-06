import { call, put, select } from 'redux-saga/effects';

import api from '../../../services/api';

import { Creators as ProvidersActions } from '../ducks/provider';
import { getPermissions } from './auth';

export function* getProviders() {
  try {
    const response = yield call(api.get, 'providers');
    yield put(ProvidersActions.getProvidersSuccess(response.data));
  } catch (err) {}
}

export function* init() {
  try {
    const signedIn = yield select(state => state.auth.signedIn);
    // Se o método acima não der certo, tenta obter o token do localStorage para fazer a verificação
    if (signedIn) {
      const response = yield call(api.get, 'providers');
      yield getPermissions();
      yield put(ProvidersActions.getProvidersSuccess(response.data));
      yield put(ProvidersActions.selectProvider(response.data[0]));
    }

    //alert(JSON.stringify(response.data[0]));
  } catch (err) {
    // {
    //   "id":1,"name":"GZ Net Provider",
    //   "address":"ISP Arcoverde",
    //   "cnpj":"00000000000010003",
    //   "active":false,
    //   "slug":"gz-net-provider",
    //   "user_id":1,
    //   "created_at":"2019-10-01 06:53:35",
    //   "updated_at":"2019-10-01 06:53:35",
    //   "pivot":{"provider_id":1,"user_id":1}}
  }
}
