export const SPOTIFY_ACCOUNT_BASE_URL = 'https://accounts.spotify.com';
export const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1/';
export const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET =
  process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
export const SPOTIFY_REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
export const SPOTIFY_USER_SCOPES = [
  'user-library-read',
  'user-read-private',
  'user-read-recently-played',
  'user-top-read',
].join(' ');
export const SPOTIFY_USER_TOKEN_VALIDITY_IN_MS = 3600000;

export const USER_DEFAULT_MARKET = 'FI';
