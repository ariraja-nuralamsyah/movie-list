import { MOVIES, TV } from "../constants";

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case MOVIES.LOAD:
    case TV.LOAD:
      return true;
    case MOVIES.GENRE_LOAD:
      return true;
    case MOVIES.LOAD_SUCCESS:
    case TV.LOAD_SUCCESS:
      return false;
    case MOVIES.LOAD_FAIL:
    case TV.LOAD_FAIL:
      return false;
    case MOVIES.SETAMOVIE:
    case TV.SETATV:
      return false;
    case MOVIES.AMOVIE_FAIL:
    case TV.AMOVIE_FAIL:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
