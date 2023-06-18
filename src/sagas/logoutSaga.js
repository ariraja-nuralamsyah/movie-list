import { put, takeLatest } from "redux-saga/effects";
import { logoutSuccess, logoutFailure } from "./../actions";
import { logoutUser } from "./../api";

function* logoutSaga(action) {
  const { sessionId } = action.payload;
  try {
    yield logoutUser(sessionId);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

export function* watchLogout() {
  yield takeLatest("LOGOUT_REQUEST", logoutSaga);
}
