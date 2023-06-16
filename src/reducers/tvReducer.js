import { TV } from "../constants";
const tvReducer = (state = [], action) => {
  if (
    action.type === TV.LOAD_SUCCESS
  ) {
    return [...action.tvs.results];
  }
  return state;
};

export default tvReducer;
