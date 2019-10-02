import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { Creators as ProvidersActions } from "../ducks/provider";

export function* getProviders() {
  try {
    const response = yield call(api.get, "providers");
    yield put(ProvidersActions.getProvidersSuccess(response.data));
  } catch (err) {}
}
