import { call, put } from "redux-saga/effects";
import api from "../../../services/api";

import { Creators as DropCreators } from "../ducks/drop";

function* getSaidaSplitterForSplitter(splitterId) {
  const response = yield call(api.get, `/saidasplitter/splitter/${splitterId}`);
  return response.data;
}

export function* loadSplitters(action) {
  const { data: Data } = action.payload;
  const { cto_id, drop } = Data;

  let count = 0;
  let ssp = [];

  try {
    const response = yield call(api.get, `/get/splitter/cto/${cto_id}`);

    if (response.status >= 200 && response.status < 300) {
      console.tron.log(response);
      const { data } = response;
      alert(JSON.stringify(data));
      if (process.env.NODE_ENV === "development") {
        console.tron.log(data);
      }
      yield put(
        DropCreators.showDropAddModal({ splitters: data, cto_id, drop })
      );
    } else {
      throw response;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.tron.log(error);
    }
  }
}
