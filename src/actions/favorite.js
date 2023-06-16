const saveFavorite = (favorites) => ({
  type: "SAVE_FAVORITE",
  favorites,
});

const loadFavorite = () => ({
  type: "LOAD_FAVORITE"
});

const deleteFavorite = (movieId) => ({
  type: "DELETE_FAVORITE",
  movieId,
});

export {
  saveFavorite,
  loadFavorite,
  deleteFavorite,
};