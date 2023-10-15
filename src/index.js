import './styles/main.scss';
import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchFromSpotify from './component/SearchFromSpotify';
import { StyledEngineProvider } from '@mui/material/styles';
import UserInfo from './component/UserInfo';
import axios from 'axios';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  // Spotify User Authorization
  useEffect(() => {
    setLoading(true);
    const urlHash = hashData();
    if (urlHash.state) {
      const storedState = localStorage.getItem('stateKey');
      const accessData = hashData();
      accessData.access_token !== undefined && storedState === accessData.state
        ? setNewToken(accessData.access_token)
        : console.log('Error getting authorization');
    } else if (localStorage.getItem('token')) {
      setDone();
    }
  }, []);

  const getAccess = () => {
    const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const state = Math.random().toString(16).substr(2, 8);
    localStorage.setItem('stateKey', state);
    const scope =
      'user-read-private user-read-recently-played user-top-read user-library-read';
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
      clientId,
    )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
      redirect_uri,
    )}&state=${encodeURIComponent(state)}`;

    window.location = url;
  };

  const hashData = () => {
    return window.location.hash
      .substring(1)
      .split('&')
      .map((v) => v.split('='))
      .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});
  };

  const setNewToken = (token) => {
    localStorage.setItem('token', token);
    window.location = '/';
  };

  const setDone = () => {
    setUserToken(localStorage.getItem('token'));
    setLoading(false);
    localStorage.removeItem('token');
    localStorage.removeItem('stateKey');
  };

  // Spotify App Authorization
  const publicAccess = () => {
    setLoading(true);
    axios({
      auth: {
        password: clientSecret, // User Secret
        username: clientId, // User ID
      },
      data: 'grant_type=client_credentials',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
    })
      .then((response) => {
        console.log('Got the token');
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.access_token}`;
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error', error);
        setLoading(false);
      });
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        {loading && (
          <Container maxWidth="md">
            <h1>Choose authorization</h1>
            <div>
              <Button
                variant="outlined"
                className="accessButton"
                onClick={getAccess}
              >
                Login to Spotify
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                className="accessButton"
                onClick={publicAccess}
              >
                Public access
              </Button>
            </div>
          </Container>
        )}
        {!loading && (
          <Container maxWidth="md">
            <h1>Spotify Crawler</h1>
            <p>
              This is a work in progress project that aims to have functionality
              to help users find new music to listen to based on what they have
              listened to in the past.
            </p>
            <h2>Current functionality</h2>
            <ul>
              <li>
                Can be authorized either with App Authorization or User
                Authorization.
              </li>
              <li>
                Search albums, artists, playlists or tracks from Spotify and
                display top 10 results.
              </li>
              <li>
                Display information about albums, artists, tracks and playlists
                in custom tables.
              </li>
              <li>Play song previews.</li>
              <li>Get recommendations based on user top artists.</li>
              <li>Get user top artists and play their top tracks.</li>
            </ul>
            {userToken !== '' && <UserInfo token={userToken} />}
            <SearchFromSpotify />
          </Container>
        )}
      </StyledEngineProvider>
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
