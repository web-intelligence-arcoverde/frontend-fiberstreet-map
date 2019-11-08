import { call, put } from "redux-saga/effects";

import api from "../../../services/api";

import { Creators as InviteActions } from "../ducks/invite";
import { toastr } from "react-redux-toastr";

export function* sendInvitationEmail({ payload }) {
  const { email } = payload;
  const emails = {
    invites: [email]
  };
  try {
    const response = yield call(api.post, "invites", emails);
    yield toastr.success(
      "Convite",
      "Peça para que seu colaborador verifique o e-mail"
    );
  } catch (err) {
    yield toastr.error("Convite", "Erro ao enviar convite");
  }
}
