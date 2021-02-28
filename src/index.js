import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SearchFromSpotify from './component/SearchFromSpotify';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import './styles/main.scss';

const App = () => {
  const [loading, setLoading] = useState(false);
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  // Spotify token
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId, // User ID
        password: clientSecret, // User Secret
      },
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
  }, []);

  return (
    <>
      {loading ? 'Waiting for token from Spotify' : ''}
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
              Search albums, artists, playlists or tracks from Spotify and
              display top 10 results.
            </li>
            <li>
              Display information about artists and tracks in custom tables.
            </li>
            <li>Play song previews.</li>
          </ul>
          <SearchFromSpotify />
        </Container>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
