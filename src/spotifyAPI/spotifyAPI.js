import axios from 'axios';

const baseUrl = 'https://api.spotify.com/v1/';
let userSavedTracks = [];

const getUserCountryCode = () => {
  const request = axios.get(`https://ipapi.co/country_code/`);
  return request.then((response) => response.data);
};

const getAlbumTracks = (id, offset, limit) => {
  const request = axios.get(
    `${baseUrl}albums/${id}/tracks?offset=${offset}&limit=${limit}`,
  );
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

const getAvailableGenreSeeds = () => {
  const request = axios.get(`${baseUrl}recommendations/available-genre-seeds`);
  return request.then((response) => response.data);
};

const getPlaylist = (playlistId) => {
  const request = axios.get(`${baseUrl}playlists/${playlistId}`);
  return request.then((response) => response.data);
};

const getUserSavedTracks = (nextUrl) => {
  const limit = 50;
  const url = !nextUrl
    ? `${baseUrl}me/tracks?offset=0&limit=${limit}`
    : nextUrl;
  !nextUrl ? (userSavedTracks = []) : null;
  axios.get(url).then((response) => {
    userSavedTracks.push(response.data.items);
    !response.data.next ? null : getUserSavedTracks(response.data.next);
  });
  return userSavedTracks;
};

const getUserTopArtists = (limit) => {
  const request = axios.get(`${baseUrl}me/top/artists?limit=${limit}`);
  return request.then((response) => response.data);
};

const getUserProfile = () => {
  const request = axios.get(`${baseUrl}me/`);
  return request.then((response) => response.data);
};

const getUserRecommendations = async (seedArtists, seedGenres, limit) => {
  try {
    const market = await getUserCountryCode();
    const request = axios.get(`${baseUrl}recommendations`, {
      params: {
        seed_artists: seedArtists,
        seed_genres: seedGenres,
        limit: limit,
        market: market !== null ? market : 'ES',
      },
    });
    return request.then((response) => response.data);
  } catch (error) {
    console.log('error', error);
  }
};

const getSearchResults = (search, type, limit) => {
  const request = axios.get(
    `${baseUrl}search?q=${search}&type=${type}&limit=${limit}`,
  );
  return request.then((response) => response.data);
};

export default {
  getAlbumTracks,
  getArtistTopTracks,
  getAvailableGenreSeeds,
  getPlaylist,
  getUserSavedTracks,
  getUserTopArtists,
  getUserProfile,
  getUserRecommendations,
  getSearchResults,
};
