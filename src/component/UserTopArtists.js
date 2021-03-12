import React from 'react';
import { useState } from 'react';
import TrackGrid from '../component/TrackGrid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

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
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Grid
        className="cardGrid"
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
          <TrackGrid tracks={topTracks?.tracks} previewSong={previewSong} />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserTopArtists;
