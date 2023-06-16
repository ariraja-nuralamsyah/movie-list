import { TV } from "../constants";

const searchTvReducer = (state = [], action) => {
  if (action.type === TV.SEARCH_SUCCESS) {
    return [...action.tvs.results];
  }
  return state;
};

export default searchTvReducer;
