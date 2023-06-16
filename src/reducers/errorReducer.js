import { MOVIES, TV } from "../constants";
const errorReducer = (state = null, action) => {
  switch (action.type) {
    case MOVIES.LOAD_SUCCESS:
    case TV.LOAD_SUCCESS:
      return null;
    case MOVIES.SETAMOVIE:
    case TV.SETAMOVIE:
      return null;
    case MOVIES.LOAD_FAIL:
    case TV.LOAD_FAIL:
      return action.error;
    case MOVIES.AMOVIE_FAIL:
    case TV.AMOVIE_FAIL:
      return action.error;
    default:
      return state;
  }
};

export default errorReducer;
