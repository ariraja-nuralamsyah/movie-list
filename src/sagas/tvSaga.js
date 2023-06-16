import { call, put, takeEvery } from "redux-saga/effects";
import { fetchTv } from "../api/tv";
import { setTv, setErrorAtv } from "../actions/tv";
import { TV } from "../constants";

function* handleTvLoad(payload) {
  try {
    const tvs = yield call(fetchTv, payload.value);
    yield put(setTv(tvs));
  } catch (e) {
    yield put(setErrorAtv(e.toString()));
  }
}

export default function* watchTvLoad() {
  yield takeEvery(TV.LOAD, handleTvLoad);
}
