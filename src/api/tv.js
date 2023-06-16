// get a movie info
const url = "https://api.themoviedb.org/3/";
const language = "en-US";
const api_key = "9f85f315309fd8607469257a6caf1fd2";

const fetchTv = async (id) => {
  const respone = await fetch(
    url +
      "tv/popular?page=" +
      id +
      "&language=" +
      language +
      "&api_key=" +
      api_key +
      ""
  );
  const data = respone.json();
  if (respone.status > 400) {
    throw new Error(respone.status);
  }

  return data;
};

const fetchaTv = async (id) => {
  const respone = await fetch(
    url + "tv/" + id + "?language=" + language + "&api_key=" + api_key + ""
  );
  const data = respone.json();
  if (respone.status > 400) {
    throw new Error(respone.status);
  }

  return data;
};

// get searched tv
const fetchSearchTv = async (query, id) => {
  const tempId = id === undefined ? 1 : id;
  const respone = await fetch(
    url +
      "search/tv?include_adult=false&page=" +
      tempId +
      "&query=" +
      query +
      "&language=" +
      language +
      "&api_key=" +
      api_key +
      ""
  );
  const data = respone.json();
  if (respone.status > 400) {
    throw new Error(data.error);
  }

  return data;
};

export {
fetchTv,
  fetchaTv,
  fetchSearchTv,
};
