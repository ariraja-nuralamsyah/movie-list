import { MOVIES, TV } from "../constants";

const singleReducer = (state = [], action) => {
  if (action.type === MOVIES.SETAMOVIE) {
    return { ...action.movie };
  } else if (action.type === MOVIES.GETAMOVIE) {
    return null;
  }else if (action.type === TV.SETATV) {
    return { ...action.tv };
  } else if (action.type === TV.GETATV) {
    return null;
  }
  return state;
};

export default singleReducer;
