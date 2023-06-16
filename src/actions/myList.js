const saveMyList = (mylist) => ({
  type: "SAVE_MYLIST",
  mylist,
});

const loadMyList = () => ({
  type: "LOAD_MYLIST",
});

const deleteMyList = (movieId) => ({
  type: "DELETE_MYLIST",
  movieId,
});

export { saveMyList, loadMyList, deleteMyList };
