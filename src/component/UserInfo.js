import { Grid, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import UserRecommendations from '../component/UserRecommendations';
import UserTopArtists from '../component/UserTopArtists';
import _ from 'lodash';
import axios from 'axios';
import spotifyAPI from '../spotifyAPI/spotifyAPI';

const UserInfo = ({ token }) => {
  const showLimit = 20;
  const artistLimit = 50;
  const [userProfile, setUserProfile] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState({});
  const [value, setValue] = useState(6);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    spotifyAPI
      .getUserProfile()
      .then((response) => setUserProfile(response))
      .catch((error) => console.log(error));
    spotifyAPI
      .getUserTopArtists(artistLimit)
      .then((response) => setUserTopArtists(response))
      .catch((error) => console.log(error));
  }, []);

  const handleBeforeInput = (event) => {
    if (event.data && !/^\d*$/.test(event.data)) {
      event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    setValue(event.target.value ? event.target.value : '');
  };

  const handleBlur = () => {
    value < 0 ? setValue(0) : value > showLimit ? setValue(showLimit) : null;
  };

  return (
    <>
      <h2>Hello {userProfile?.display_name}!</h2>
      <h3>{'Your song recommendations'}</h3>
      {!_.isEmpty(userTopArtists) && (
        <UserRecommendations userTopArtists={userTopArtists.items} />
      )}
      <h3>{'Your top artists'}</h3>
      <Grid container spacing={1} direction="row" alignItems="flex-start">
        <Grid item>Artists to show:</Grid>
        <Grid item>
          <Input
            className={'input'}
            value={value}
            margin="dense"
            onBeforeInput={handleBeforeInput}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              'aria-labelledby': 'input-slider',
              max: 20,
              min: 1,
              step: 1,
              type: 'number',
            }}
          />
        </Grid>
      </Grid>
      <UserTopArtists
        userTopArtists={userTopArtists?.items?.filter(
          (item, index) => index < value,
        )}
      />
    </>
  );
};

export default UserInfo;
