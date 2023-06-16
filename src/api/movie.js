// get a movie info
const url = "https://api.themoviedb.org/3/";
const language = "en-US";
const api_key = "9f85f315309fd8607469257a6caf1fd2";
  
const fetchaMovie = async id => {
  const respone = await fetch(
    url + "movie/" +
      id +
      "?language="+language+"&api_key="+api_key+""
  );
  const data = respone.json();
  if (respone.status > 400) {
    throw new Error(respone.status);
  }

  return data;
};

// get all genres
const fetchGenre = async () => {
  const respone = await fetch(
    url + "genre/movie/list?language="+language+"&api_key="+api_key+""
  );
  const data = respone.json();
  if (respone.status > 400) {
    throw new Error(data.error);
  }
  return data;
};
// get popular movies
const fetchMovies = async page => {
  const respone = await fetch(
    url + "movie/popular?page=" +
      page +
      "&language="+language+"&api_key="+api_key+""
  );
  const data = respone.json();
  if (respone.status > 400) {
    throw new Error(data.error);
  }

  return data;
};

// get searched movies
const fetchSearchMovies = async (query, id) => {
  const tempId = id === undefined ? 1 : id;
  const respone = await fetch(
    url + "search/movie?include_adult=false&page=" +
      tempId +
      "&query=" +
      query +
      "&language="+language+"&api_key="+api_key+""
  );
  const data = respone.json();
  if (respone.status > 400) {
    throw new Error(data.error);
  }

  return data;
};

export {
  fetchaMovie,
  fetchGenre,
  fetchMovies,
  fetchSearchMovies,
};
