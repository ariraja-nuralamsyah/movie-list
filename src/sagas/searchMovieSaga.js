import { select, call, put, takeEvery } from "redux-saga/effects";
import { fetchSearchMovies } from "../api/movie";
import { setSearchMovies } from "../actions/movie";
import { MOVIES } from "../constants";

const getquery = state => state.searchquery;
const getpage = state => state.searchpage;

function* handleSearchQueryMovie() {
  try {
    const query = yield select(getquery);
    const page = yield select(getpage);
    const movies = yield call(fetchSearchMovies, query, page);

    yield put(setSearchMovies(movies));
  } catch (e) {
    //yield put(setError(e.toString()));
  }
}

export default function* watchSearchQueryMovie() {
  yield takeEvery(MOVIES.SEARCH_LOAD, handleSearchQueryMovie);
}
