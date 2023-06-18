import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import loadingReducer from "./loadingReducer";
import movieReducer from "./movieReducer";
import errorReducer from "./errorReducer";
import pageReducer from "./pageReducer";
import genreReducer from "./genreReducer";
import recomendReducer from "./recomendReducer";
import idReducer from "./idReducer";
import queryReducer from "./queryReducer";
import searchMovieReducer from "./searchMovieReducer";
import countReducer from "./countReducer";
import singleReducer from "./singleReducer";
import tvReducer from "./tvReducer";
import searchTvReducer from "./searchTvReducer";
import favoriteReducer from "./favoriteReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import myListReducer from "./mylistReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { MY_SECRET_KEY } from "../constants";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  movies: movieReducer,
  tvs: tvReducer,
  movieid: idReducer,
  error: errorReducer,
  genres: genreReducer,
  currentpage: pageReducer,
  movieinfo: singleReducer,
  recmovies: recomendReducer,
  searchquery: queryReducer,
  searchmovies: searchMovieReducer,
  searchtv: searchTvReducer,
  totalresults: countReducer,
  routing: routerReducer,
  favoriteStorage: favoriteReducer,
  myListStorage: myListReducer,
  auth: authReducer,
});

const encryptor = encryptTransform({
  secretKey: MY_SECRET_KEY,
});

const persistConfig = {
  key: "root",
  storage,
  // transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
