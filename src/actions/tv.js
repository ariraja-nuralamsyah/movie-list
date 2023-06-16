import { TV } from "../constants";
// main page tv
const loadTvs = (page) => ({
  type: TV.LOAD,
  value: page,
});

const setTv = (tvs) => ({
  type: TV.LOAD_SUCCESS,
  tvs,
});

//search results
const loadSearchTv = (id) => ({
  type: TV.SEARCH_LOAD,
  value: id,
});
const setQuerySearchTv = (query) => ({
  type: TV.SEARCH_LOAD + "a",
  value: query,
});

const setSearchTv = (tvs) => ({
  type: TV.SEARCH_SUCCESS,
  tvs,
});

// single tv info
const getaTv = (id) => ({
  type: TV.GETATV,
  value: id,
});

const setaTv = (tv) => ({
  type: TV.SETATV,
  tv,
});

const setErrorAtv = (error) => ({
  type: TV.ATV_FAIL,
  error,
});

const clearStateTv = () => ({
  type: TV.CLEAR,
});

export {
  loadTvs,
  setTv,
  loadSearchTv,
  setQuerySearchTv,
  setSearchTv,
  getaTv,
  setaTv,
  clearStateTv,
  setErrorAtv,
};
