import { put, takeLatest, call } from "redux-saga/effects";
import { authenticateUser } from "../api";
import { loginSuccess, loginFailure } from "./../actions";

function* loginSaga(action) {
  const { username, password } = action.payload;
  try {
    const sessionId = yield call(authenticateUser, username, password);
    if(sessionId == null){
        yield put(loginFailure("Something Happen"));
    }else{
        yield put(loginSuccess(sessionId, username));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* watchLogin() {
  yield takeLatest("LOGIN_REQUEST", loginSaga);
}
