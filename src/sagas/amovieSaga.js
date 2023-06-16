import { call, put, takeEvery } from "redux-saga/effects";
import { fetchaMovie } from "../api/movie";
import { setaMovie, setErrorAmovie } from "../actions/movie";
import { MOVIES } from "../constants";

function* handleMovieInfo(payload) {
  try {
    const movie = yield call(fetchaMovie, payload.value);
    yield put(setaMovie(movie));
  } catch (e) {
    yield put(setErrorAmovie(e.toString()));
  }
}

export default function* watchMovieInfoLoad() {
  yield takeEvery(MOVIES.GETAMOVIE, handleMovieInfo);
}
