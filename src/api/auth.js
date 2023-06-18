const url = "https://api.themoviedb.org/3/";
const api_key = "9f85f315309fd8607469257a6caf1fd2";

const authenticateUser = async (username, password) => {
  try {
    // Get a new request token
    const tokenResponse = 
      await fetch(`${url}/authentication/token/new?api_key=${api_key}`
    );
    const tokenData = await tokenResponse.json();
    const requestToken = tokenData.request_token;

    // Authenticate the user's credentials
    const authResponse = await fetch(
      `${url}/authentication/token/validate_with_login?api_key=${api_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          request_token: requestToken,
        }),
      }
    );

    if (!authResponse.ok) {
      throw new Error("Username / Password Salah");
    }

    const authData = await authResponse.json();

    // Create a session with the authenticated request token
    const sessionResponse = await fetch(
      `${url}/authentication/session/new?api_key=${api_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: authData.request_token,
        }),
      }
    );

      const sessionData = await sessionResponse.json();

      const sessionId = sessionData.session_id;

      return sessionId;
    

  } catch (error) {
    throw new Error(error.message);
  }
}

const logoutUser = async (sessionId) => {
  try {
    return await fetch(
      `${url}authentication/session?api_key=${api_key}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
        }),
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export { authenticateUser, logoutUser, };

