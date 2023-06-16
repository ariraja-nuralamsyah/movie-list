import { MOVIES, TV } from "../constants";

const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case MOVIES.LOAD:
    case TV.LOAD:
      return action.value;
    case MOVIES.SEARCH_LOAD:
    case TV.SEARCH_LOAD:
      return action.value;

    default:
      return state;
  }
};

export default pageReducer;
