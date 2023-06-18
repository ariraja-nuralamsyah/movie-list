import {
  loadMovies,
  setMovies,
  loadSearchMovies,
  setQuerySearchMovie,
  setSearchMovies,
  loadGenre,
  setGenres,
  getaMovie,
  setaMovie,
  clearStateMovie,
  setErrorAmovie,
  setErrorPopular,
} from "./movie";

import {
  loadTvs,
  setTv,
  loadSearchTv,
  setQuerySearchTv,
  setSearchTv,
  getaTv,
  setaTv,
  clearStateTv,
  setErrorAtv,
} from "./tv";

import { saveFavorite, loadFavorite, deleteFavorite, } from "./favorite";
import { saveMyList, loadMyList, deleteMyList } from "./myList";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "./auth";

export {
  // Movie
  loadMovies,
  setMovies,
  loadSearchMovies,
  setQuerySearchMovie,
  setSearchMovies,
  loadGenre,
  setGenres,
  getaMovie,
  setaMovie,
  clearStateMovie,
  setErrorAmovie,
  setErrorPopular,
  // TV
  loadTvs,
  setTv,
  loadSearchTv,
  setQuerySearchTv,
  setSearchTv,
  getaTv,
  setaTv,
  clearStateTv,
  setErrorAtv,
  // Favorite
  saveFavorite,
  loadFavorite,
  deleteFavorite,
  // MyList
  saveMyList,
  loadMyList,
  deleteMyList,
  // Login
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
};
