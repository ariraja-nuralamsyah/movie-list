const loginRequest = (username, password) => ({
  type: "LOGIN_REQUEST",
  payload: { username, password },
});

const loginSuccess = (sessionId, username) => ({
  type: "LOGIN_SUCCESS",
  payload: { sessionId, username },
});

const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: { error },
});

const logoutRequest = (sessionId) => ({
  type: "LOGOUT_REQUEST",
  payload: {sessionId},
});

const logoutSuccess = () => ({
  type: "LOGOUT_SUCCESS",
});

const logoutFailure = (error) => ({
  type: "LOGOUT_FAILURE",
  payload: {error},
});

export {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
};
