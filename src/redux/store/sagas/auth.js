import { call, put, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import api from "../../../services/api";
import { actions as toastrActions } from "react-redux-toastr";

import AuthActions from "../ducks/auth";
import { Creators as ProvidersActions } from "../ducks/provider";

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, "sessions", { email, password });

    localStorage.setItem("@Omni:token", response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));

    const res = yield call(api.get, "providers");
    yield put(ProvidersActions.getProvidersSuccess(res.data));
    yield put(ProvidersActions.selectProvider(res.data[0]));

    yield put(push("/map"));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Falha no login",
        message: "Verifique seu e-mail/senha!"
      })
    );
  }
}

export function* signUpWithProvider({ user, provider }) {
  try {
    const response = yield call(api.post, "users/provider", { user, provider });
    localStorage.setItem("@Omni:token", response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push("/"));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Erro",
        message: "Falha ao cadastrar usuário"
      })
    );
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, "users", { name, email, password });

    localStorage.setItem("@Omni:token", response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push("/"));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Falha no cadastro",
        message: "Você foi convidado para algum time?"
      })
    );
  }
}

export function* signOut() {
  localStorage.removeItem("@Omni:token");
  localStorage.removeItem("@Omni:team");

  yield put(push("/"));
}

export function* getPermissions() {
  const team = yield select(state => state.teams.active);
  const signedIn = yield select(state => state.auth.signedIn);

  if (!signedIn || !team) {
    return;
  }

  const response = yield call(api.get, "permissions");

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
