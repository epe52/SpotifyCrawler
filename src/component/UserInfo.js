import React from 'react';
import { useState, useEffect } from 'react';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import axios from 'axios';
import UserRecommendations from '../component/UserRecommendations';
import UserTopArtists from '../component/UserTopArtists';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

const UserInfo = ({ token }) => {
  const limit = 20;
  const [userProfile, setUserProfile] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [value, setValue] = useState(6);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    spotifyAPI
      .getUserProfile()
      .then((response) => setUserProfile(response))
      .catch((error) => console.log(error));
    spotifyAPI
      .getUserTopArtists(limit)
      .then((response) => setUserTopArtists(response))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    value < 0 ? setValue(0) : value > limit ? setValue(limit) : null;
  };

  return (
    <>
      <h2>Hello {userProfile?.display_name}!</h2>
      <h3>{'Your song recommendations'}</h3>
      <UserRecommendations userTopArtists={userTopArtists?.items} />
      <h3>{'Your top artists'}</h3>
      <Grid container spacing={1} direction="row" alignItems="flex-start">
        <Grid item>Artists to show:</Grid>
        <Grid item>
          <Input
            className={'input'}
            value={value}
            margin="dense"
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
