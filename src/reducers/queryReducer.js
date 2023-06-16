import { MOVIES, TV } from "../constants";

const queryReducer = (state = 1, action) => {
  switch (action.type) {
    case MOVIES.SEARCH_LOAD + "a":
    case TV.SEARCH_LOAD + "a":
      return action.value;
    default:
      return state;
  }
};

export default queryReducer;
