import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { Creators as ProvidersActions } from "../ducks/provider";

export function* getProviders() {
  try {
    const response = yield call(api.get, "providers");
    yield put(ProvidersActions.getProvidersSuccess(response.data));
  } catch (err) {}
}

export function* init() {
  try {
    const response = yield call(api.get, "providers");
    // alert(JSON.stringify(response.data[0]));
    yield put(ProvidersActions.selectProvider(response.data[0]));
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
