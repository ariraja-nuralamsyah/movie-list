const initialState = {
  favorites: [], 
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_FAVORITE":
        if (state.favorites == null){
            return {
              ...state,
              favorites: [action.favorites], // Tambahkan data ke daftar favorit
            }; 
        }else{
          return {
            ...state,
            favorites: [...state.favorites, action.favorites], // Tambahkan data ke daftar favorit
          };
        }
    case "LOAD_FAVORITE":
      return {
        ...state,
        favorites: state.favorites, // Mendapatkan data favorit dari local storage
      };
    case "DELETE_FAVORITE":
      const updatedFavorites = state.favorites.filter(
        (obj) => obj.id !== action.movieId
      );
      return {
        ...state,
        favorites: updatedFavorites, // Menghapus data favorit
      };
    default:
      return state;
  }
};

export default favoriteReducer;