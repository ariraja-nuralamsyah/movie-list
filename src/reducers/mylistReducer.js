const initialState = {
  mylist: [],
};

const myListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_MYLIST":
      if (state.mylist == null) {
        return {
          ...state,
          mylist: [action.mylist], // Tambahkan data ke daftar favorit
        };
      } else {
        return {
          ...state,
          mylist: [...state.mylist, action.mylist], // Tambahkan data ke daftar favorit
        };
      }
    case "LOAD_MYLIST":
      return {
        ...state,
        mylist: state.mylist, // Mendapatkan data my list dari local storage
      };
    case "DELETE_MYLIST":
      const updatedmylist = state.mylist.filter(
        (obj) => obj.id !== action.movieId
      );
      return {
        ...state,
        mylist: updatedmylist, // Menghapus data favorit
      };
    default:
      return state;
  }
};

export default myListReducer;
