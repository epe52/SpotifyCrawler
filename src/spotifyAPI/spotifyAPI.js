import { SPOTIFY_API_BASE_URL, USER_DEFAULT_MARKET } from '../common/constants';
import axios from 'axios';

let userSavedTracks = [];

const getUserCountryCode = async () => {
  return axios
    .get('https://ipapi.co/country_code/', {
      auth: {},
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.debug('Could not get country code, using default market');
      return USER_DEFAULT_MARKET;
    });
};

const getAlbumTracks = async (id, offset, limit) => {
  const request = axios.get(
    `${SPOTIFY_API_BASE_URL}albums/${id}/tracks?offset=${offset}&limit=${limit}`,
  );
  return request.then((response) => response.data);
};

const getArtistTopTracks = async (id) => {
  try {
    const market = await getUserCountryCode();
    const request = axios.get(
      `${SPOTIFY_API_BASE_URL}artists/${id}/top-tracks?market=${market}`,
    );
    return request.then((response) => response.data);
  } catch (error) {
    console.debug('Error getting artist top tracks', error);
  }
};

const getAudioFeaturesSeveralTracks = async (ids) => {
  const request = axios.get(`${SPOTIFY_API_BASE_URL}audio-features`, {
    params: { ids: ids },
  });
  return request.then((response) => response.data);
};

const getAvailableGenreSeeds = async () => {
  const request = axios.get(
    `${SPOTIFY_API_BASE_URL}recommendations/available-genre-seeds`,
  );
  return request.then((response) => response.data);
};

const getPlaylist = async (playlistId) => {
  const request = axios.get(`${SPOTIFY_API_BASE_URL}playlists/${playlistId}`);
  return request.then((response) => response.data);
};

const getUserSavedTracks = (nextUrl, maxGetAmount) => {
  const limit = 50;
  const timeoutAPI = 5;
  const url =
    nextUrl === ''
      ? `${SPOTIFY_API_BASE_URL}me/tracks?offset=0&limit=${limit}`
      : nextUrl;
  nextUrl === '' ? (userSavedTracks = []) : null;
  setTimeout(
    () =>
      axios.get(url).then((response) => {
        userSavedTracks.push(response.data.items);
        response.data.next && userSavedTracks.length < maxGetAmount
          ? getUserSavedTracks(response.data.next, maxGetAmount)
          : null;
      }),
    timeoutAPI,
  );
  return userSavedTracks;
};

const getUserTopArtists = async (limit) => {
  const request = axios.get(
    `${SPOTIFY_API_BASE_URL}me/top/artists?limit=${limit}`,
  );
  return request.then((response) => response.data);
};

const getUserProfile = async () => {
  const request = axios.get(`${SPOTIFY_API_BASE_URL}me/`);
  return request.then((response) => response.data);
};

const getUserRecommendations = async (
  seedArtists,
  seedGenres,
  seedDanceability,
  seedEnergy,
  limit,
) => {
  try {
    const market = await getUserCountryCode();
    const request = axios.get(`${SPOTIFY_API_BASE_URL}recommendations`, {
      params: {
        limit,
        market,
        seed_artists: seedArtists,
        seed_genres: seedGenres,
        target_danceability: seedDanceability,
        target_energy: seedEnergy,
      },
    });
    return request.then((response) => response.data);
  } catch (error) {
    console.debug('Error getting user recommendations', error);
  }
};

const getSearchResults = async (search, type, limit) => {
  const request = axios.get(
    `${SPOTIFY_API_BASE_URL}search?q=${search}&type=${type}&limit=${limit}`,
  );
  return request.then((response) => response.data);
};

export default {
  getAlbumTracks,
  getArtistTopTracks,
  getAudioFeaturesSeveralTracks,
  getAvailableGenreSeeds,
  getPlaylist,
  getSearchResults,
  getUserProfile,
  getUserRecommendations,
  getUserSavedTracks,
  getUserTopArtists,
};
