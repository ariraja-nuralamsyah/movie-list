import watchMovieLoad from "./movieSaga";
import watchSearchQueryMovie from "./searchMovieSaga";
import watchSearchQueryTv from "./searchTvSaga";
import watchMovieInfoLoad from "./amovieSaga";
import watchTvInfoLoad from "./atvSaga";
import watchTvLoad from "./tvSaga";
import { all, fork } from "redux-saga/effects";
import { watchLogin } from "./loginSaga";
import { watchLogout } from "./logoutSaga";
function* rootSaga() {
  yield all([
    fork(watchMovieLoad),
    fork(watchTvLoad),
    fork(watchMovieInfoLoad),
    fork(watchTvInfoLoad),
    fork(watchSearchQueryMovie),
    fork(watchSearchQueryTv),
    fork(watchLogin),
    fork(watchLogout),
  ]);
}

export default rootSaga;
