import {
  SPOTIFY_ACCOUNT_BASE_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_USER_SCOPES,
} from '../common/constants';
import axios from 'axios';

/**
 * Spotify User Authorization
 */
export const getUserSpotifyAccess = () => {
  const state = Math.random().toString(16).substring(2, 8);
  localStorage.setItem('stateKey', state);
  const url = [
    `${SPOTIFY_ACCOUNT_BASE_URL}/authorize`,
    '?response_type=token',
    `&client_id=${encodeURIComponent(SPOTIFY_CLIENT_ID)}`,
    `&scope=${encodeURIComponent(SPOTIFY_USER_SCOPES)}`,
    `&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`,
    `&state=${encodeURIComponent(state)}`,
  ].join('');
  window.open(url, '_self');
};

/**
 * Spotify App Authorization
 * @param {*} setLoading State to set as loading while fetching authorization
 * @returns Token from Spotify
 */
export const getPublicSpotifyAccess = async () => {
  let publicToken = '';
  await axios({
    auth: {
      password: SPOTIFY_CLIENT_SECRET,
      username: SPOTIFY_CLIENT_ID,
    },
    data: 'grant_type=client_credentials',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    url: `${SPOTIFY_ACCOUNT_BASE_URL}/api/token`,
  })
    .then((response) => {
      console.debug('Got Spotify token for public view');
      const accessToken = response?.data?.access_token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      localStorage.setItem('publicToken', accessToken);
      publicToken = accessToken;
    })
    .catch((error) => {
      console.debug('Error while getting Spotify token for public view', error);
    });
  return publicToken;
};
