import React from 'react';
import { useState, useEffect } from 'react';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import axios from 'axios';
import UserRecommendations from '../component/UserRecommendations';
import UserTopArtists from '../component/UserTopArtists';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import _ from 'lodash';

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
              step: 1,
              min: 1,
              max: 20,
              type: 'number',
              'aria-labelledby': 'input-slider',
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
