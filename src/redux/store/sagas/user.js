import { call, put } from "redux-saga/effects";
import api from "../../../services/api";
import { Creators as UserCreators } from "../ducks/user";

export function* inviteNewUser(action) {
  try {
    const response = yield call([api, "post"], "", action.payload.email);

    yield put(UserCreators.inviteNewUserProvider(response.data));
  } catch (err) {}
}
