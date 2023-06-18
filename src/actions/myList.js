const saveMyList = (mylist, username) => ({
  type: "SAVE_MYLIST",
  mylist,
  username,
});

const loadMyList = () => ({
  type: "LOAD_MYLIST",
});

const deleteMyList = (movieId, username) => ({
  type: "DELETE_MYLIST",
  movieId,
  username,
});

export { saveMyList, loadMyList, deleteMyList };
