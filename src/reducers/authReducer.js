const initialState = {
  username: null,
  isLoggedIn: false,
  sessionId: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        sessionId: action.payload.sessionId,
        username: action.payload.username,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        sessionId: null,
        error: action.payload.error,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        error: null,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
        sessionId: null,
      };
    case "LOGOUT_FAILURE":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
