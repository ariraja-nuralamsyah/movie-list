import { select, call, put, takeEvery } from "redux-saga/effects";
import { fetchSearchTv } from "../api/tv";
import { setSearchTv } from "../actions/tv";
import { TV } from "../constants";

const getquery = (state) => state.searchquery;
const getpage = (state) => state.searchpage;

function* handleSearchQueryTv() {
  try {
    const query = yield select(getquery);
    const page = yield select(getpage);
    const tv = yield call(fetchSearchTv, query, page);

    yield put(setSearchTv(tv));
  } catch (e) {
    //yield put(setError(e.toString()));
  }
}

export default function* watchSearchQueryTv() {
  yield takeEvery(TV.SEARCH_LOAD, handleSearchQueryTv);
}
