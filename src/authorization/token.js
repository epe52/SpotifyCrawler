import { SPOTIFY_USER_TOKEN_VALIDITY_IN_MS } from '../common/constants';

const hashData = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .map((v) => v.split('='))
    .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});
};

const setNewUserTokenToLocalStorage = (token) => {
  localStorage.setItem('userToken', token);
  localStorage.setItem('userTokenSetAt', new Date().valueOf());
  window.location = '/';
};

const oldUserTokenValid = (token) => {
  const oldTimeStamp = localStorage.getItem('userTokenSetAt', token) || 0;
  const currentTimeStamp = new Date().valueOf();
  return currentTimeStamp - oldTimeStamp < SPOTIFY_USER_TOKEN_VALIDITY_IN_MS;
};

const clearLocalStorage = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('publicToken');
  localStorage.removeItem('userTokenSetAt');
  localStorage.removeItem('stateKey');
};

/**
 * Returns user token from Spotify authorization redirect
 * or clears tokens from local storage
 * @returns Previously set user token token if valid
 * or user token from Spotify authorization redirect
 * or empty if no or only public token found
 */
export const getOrClearTokens = () => {
  const previousTokens = {
    publicToken: localStorage.getItem('publicToken'),
    userToken: localStorage.getItem('userToken'),
  };
  const urlHash = hashData();

  if (urlHash.state) {
    const storedState = localStorage.getItem('stateKey');
    const userToken = urlHash.access_token;
    userToken && storedState === urlHash.state
      ? setNewUserTokenToLocalStorage(urlHash.access_token)
      : console.debug('Error setting new user authorization token');
    return {
      ...previousTokens,
      userToken,
    };
  }

  if (previousTokens.userToken && oldUserTokenValid(previousTokens.userToken)) {
    console.debug('Found valid previous user token');
    return previousTokens;
  }

  if (previousTokens.publicToken) {
    console.debug('Found previous public token');
    clearLocalStorage();
  }

  return {};
};
