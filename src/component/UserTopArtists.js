import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import TrackGrid from '../component/TrackGrid';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import { useState } from 'react';

const UserTopArtists = ({ userTopArtists }) => {
  const [showTracks, setShowTracks] = useState(false);
  const [topTracks, setTopTracks] = useState([]);
  const previewSong = new Audio();

  const artistTopTracks = (id) => {
    previewSong.src = '';
    spotifyAPI
      .getArtistTopTracks(id)
      .then((response) => {
        setTopTracks(response);
        setShowTracks(true);
      })
      .catch((error) => console.debug(error));
  };

  const scrollToTracks = () => {
    const elem = document.getElementsByClassName(`topArtistCardGrid`)[0];
    window.scrollTo(0, elem.offsetTop + elem.offsetHeight);
  };

  return (
    <>
      <Grid
        className="topArtistCardGrid"
        container
        spacing={1}
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        {userTopArtists?.map((artist) => (
          <Grid
            key={artist?.id}
            item
            xs={6}
            sm={2}
            onClick={() => {
              artistTopTracks(artist?.id);
              scrollToTracks();
              previewSong.src = '';
            }}
          >
            <Card key={artist?.id} className={'card'}>
              <CardActionArea>
                <Avatar
                  className={'cardMedia'}
                  variant="square"
                  alt="Album cover"
                  src={artist?.images[1]?.url}
                />
                <CardContent className={'cardContent'}>
                  <Typography>{artist?.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {showTracks ? (
        <div>
          <Button
            variant="outlined"
            className="accessButton"
            onClick={() => {
              setShowTracks(!showTracks);
              previewSong.src = '';
            }}
          >
            Hide artist top tracks
          </Button>
          <TrackGrid
            tracks={topTracks?.tracks}
            previewSong={previewSong}
            gridID="UserTopArtists"
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserTopArtists;
