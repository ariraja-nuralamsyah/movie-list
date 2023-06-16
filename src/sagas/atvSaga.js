import { call, put, takeEvery } from "redux-saga/effects";
import { fetchaTv } from "../api/tv";
import { setaTv, setErrorAtv } from "../actions/tv";
import { TV } from "../constants";

function* handleTVInfo(payload) {
  try {
    const tv = yield call(fetchaTv, payload.value);
    yield put(setaTv(tv));
  } catch (e) {
    yield put(setErrorAtv(e.toString()));
  }
}

export default function* watchTvInfoLoad() {
  yield takeEvery(TV.GETATV, handleTVInfo);
}
