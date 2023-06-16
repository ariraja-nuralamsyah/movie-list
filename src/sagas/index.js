import watchMovieLoad from "./movieSaga";
import watchGenreLoad from "./genreSaga";
import watchSearchQueryMovie from "./searchMovieSaga";
import watchSearchQueryTv from "./searchTvSaga";
import watchMovieInfoLoad from "./amovieSaga";
import watchTvInfoLoad from "./atvSaga";
import watchTvLoad from "./tvSaga";
import { all, fork } from "redux-saga/effects";
function* rootSaga() {
  yield all([
    fork(watchMovieLoad),
    fork(watchTvLoad),
    fork(watchGenreLoad),
    fork(watchMovieInfoLoad),
    fork(watchTvInfoLoad),
    fork(watchSearchQueryMovie),
    fork(watchSearchQueryTv),
  ]);
}

export default rootSaga;
