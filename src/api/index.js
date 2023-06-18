import { fetchMovies, fetchaMovie, fetchGenre, fetchSearchMovies } from "./movie";

import { fetchTv, fetchaTv, fetchSearchTv } from "./tv";

import { authenticateUser, logoutUser } from "./auth";

export {
  // Movie
  fetchMovies,
  fetchaMovie,
  fetchGenre,
  fetchSearchMovies,
  // TV
  fetchTv,
  fetchaTv,
  fetchSearchTv,
  // Login
  authenticateUser,
  logoutUser,
};
