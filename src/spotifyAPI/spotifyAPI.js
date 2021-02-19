import axios from 'axios';

const baseUrl = 'https://api.spotify.com/v1/';

const getSearchResults = (search, type, limit) => {
  const request = axios.get(
    `${baseUrl}search?q=${search}&type=${type}&limit=${limit}`,
  );
  return request.then((response) => response.data);
};

export default { getSearchResults };
