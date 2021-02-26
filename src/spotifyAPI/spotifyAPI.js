import axios from 'axios';

const baseUrl = 'https://api.spotify.com/v1/';

const getSearchResults = (search, type, limit) => {
  const request = axios.get(
    `${baseUrl}search?q=${search}&type=${type}&limit=${limit}`,
  );
  return request.then((response) => response.data);
};

const getUserCountryCode = () => {
  const request = axios.get(`https://ipapi.co/country_code/`);
  return request.then((response) => response.data);
};

const getArtistTopTracks = async (id) => {
  try {
    const market = await getUserCountryCode();
    const request = axios.get(
      `${baseUrl}artists/${id}/top-tracks?market=${
        market !== null ? market : 'ES'
      }`,
    );
    return request.then((response) => response.data);
  } catch (error) {
    console.log('error', error);
  }
};

export default { getSearchResults, getArtistTopTracks };
