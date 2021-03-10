import React from 'react';
import { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import TrackTable from '../component/TrackTable';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const UserTopArtists = ({ userTopArtists }) => {
  const [showTracks, setShowTracks] = useState(false);
  const [topTracks, setTopTracks] = useState([]);

  const artistTopTracks = (id) => {
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
            }}
          >
            Hide artist tracks
          </Button>
          <TrackTable items={topTracks?.tracks} />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserTopArtists;
