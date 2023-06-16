import { MOVIES, TV } from "../constants";
const countReducer = (state = [], action) => {
  if (
    action.type === MOVIES.LOAD_SUCCESS ||
    action.type === MOVIES.SEARCH_SUCCESS
  ) {
    let totalmovie = action.movies.total_results;
    return totalmovie;
  }else if (
    action.type === TV.LOAD_SUCCESS ||
    action.type === TV.SEARCH_SUCCESS
  ){
    let totalTV = action.tvs.total_results;
    return totalTV;
  }
    return state;
};

export default countReducer;
