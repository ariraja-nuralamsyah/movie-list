const initialState = {
  mylist: [],
};

const myListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_MYLIST":
      if (state.mylist.length === 0) {
        return {
          ...state,
          mylist: [{ username: action.username, list: [action.mylist] }],
        };
      } else {
        if(state.mylist.filter((obj) => obj.username === action.username).length === 0){
          return {
            ...state,
            mylist: [
              ...state.mylist,
              { username: action.username, list: [action.mylist] },
            ],
          };
        }else{
          return {
            ...state,
            mylist: [
              ...state.mylist.filter((obj) => obj.username !== action.username),
              {
                username: action.username,
                list: [
                  ...state.mylist.filter(
                    (obj) => obj.username === action.username
                  )[0].list,
                  action.mylist,
                ],
              },
            ],
          };
        }
      }
    case "LOAD_MYLIST":
      return {
        ...state,
        mylist: state.mylist,
      };
    case "DELETE_MYLIST":
      const updatedmylist = state.mylist.filter((obj) => obj.username === action.username)[0].list.filter(
        (obj) => obj.id !== action.movieId
      );
      return {
        ...state,
        mylist: [
          ...state.mylist.filter((obj) => obj.username !== action.username),
          { username: action.username, list: updatedmylist },
        ],
      };
    default:
      return state;
  }
};

export default myListReducer;
