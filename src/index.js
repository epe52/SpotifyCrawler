import './styles/main.scss';
import { Button, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  getPublicSpotifyAccess,
  getUserSpotifyAccess,
} from './authorization/spotify';
import SearchFromSpotify from './component/SearchFromSpotify';
import { StyledEngineProvider } from '@mui/material/styles';
import UserInfo from './component/UserInfo';
import _ from 'lodash';
import { createRoot } from 'react-dom/client';
import { getOrClearTokens } from './authorization/token';

const App = () => {
  const [publicToken, setPublicToken] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const tokens = getOrClearTokens();
    setPublicToken(tokens?.publicToken);
    setUserToken(tokens?.userToken);
  }, []);

  const publicSpotifyAccess = async () => {
    setPublicToken(await getPublicSpotifyAccess());
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
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
              Can be authorized either with App Authorization for public Spotify
              search or with User Authorization for personalized music
              recommendations.
            </li>
            <li>
              Search albums, artists, playlists or tracks from Spotify and
              display top 10 results.
            </li>
            <li>
              Display information about albums, artists, tracks and playlists in
              custom tables.
            </li>
            <li>Play song previews.</li>
            <li>Get recommendations based on user top artists.</li>
            <li>Get user top artists and play their top tracks.</li>
          </ul>
        </Container>
        {_.isEmpty(publicToken) && _.isEmpty(userToken) && (
          <Container maxWidth="md">
            <h1>Choose authorization</h1>
            <div>
              <Button
                variant="outlined"
                className="accessButton"
                onClick={getUserSpotifyAccess}
              >
                Login to Spotify
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                className="accessButton"
                onClick={publicSpotifyAccess}
              >
                Public access
              </Button>
            </div>
          </Container>
        )}
        {(!_.isEmpty(publicToken) || !_.isEmpty(userToken)) && (
          <Container maxWidth="md">
            {!_.isEmpty(userToken) && <UserInfo token={userToken} />}
            <SearchFromSpotify />
          </Container>
        )}
      </StyledEngineProvider>
    </>
  );
};

createRoot(document.getElementById('root')).render(<App />);
