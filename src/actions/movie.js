import { MOVIES } from "../constants";
// main page movies
const loadMovies = page => ({
  type: MOVIES.LOAD,
  value: page
});

const setMovies = movies => ({
  type: MOVIES.LOAD_SUCCESS,
  movies
});

//search results
const loadSearchMovies = id => ({
  type: MOVIES.SEARCH_LOAD,
  value: id
});
const setQuerySearchMovie = query => ({
  type: MOVIES.SEARCH_LOAD + "a",
  value: query
});

const setSearchMovies = movies => ({
  type: MOVIES.SEARCH_SUCCESS,
  movies
});

// single movie info
const getaMovie = id => ({
  type: MOVIES.GETAMOVIE,
  value: id
});

const setaMovie = movie => ({
  type: MOVIES.SETAMOVIE,
  movie
});

const setErrorPopular = (error) => ({
  type: MOVIES.LOAD_FAIL,
  error,
});

const setErrorAmovie = error => ({
  type: MOVIES.AMOVIE_FAIL,
  error
});


const clearStateMovie = () => ({
  type: MOVIES.CLEAR
});

export {
  loadMovies,
  setMovies,
  loadSearchMovies,
  setQuerySearchMovie,
  setSearchMovies,
  getaMovie,
  setaMovie,
  clearStateMovie,
  setErrorAmovie,
  setErrorPopular,
};
