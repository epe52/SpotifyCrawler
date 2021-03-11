import React from 'react';
import { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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

  const playPreview = (url) => {
    if (previewSong.paused || previewSong.src !== url) {
      previewSong.src = url;
      previewSong.play().catch((error) => console.log(error));
    } else {
      previewSong.src = '';
    }
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
          {topTracks?.tracks?.map((track) => (
            <Paper key={track?.id} className={'trackPaper'}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm container>
                  <Grid item xs={'auto'}>
                    <Avatar
                      className={'trackCardMedia'}
                      variant="square"
                      alt="Album cover"
                      src={track?.album?.images[1]?.url}
                    />
                    {track?.preview_url !== null ? (
                      <Typography className={'trackCardPlayTypography'}>
                        <IconButton
                          className={'trackCardPlayButton'}
                          onClick={() => {
                            playPreview(track?.preview_url);
                          }}
                        >
                          <PlayCircleFilledIcon
                            className={'trackCardPlayIcon'}
                          />
                        </IconButton>
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs className={'trackCardInfo'}>
                    <Typography gutterBottom variant="subtitle1">
                      {track?.artists?.map((artist) => artist?.name).join(', ')}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {track?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {track?.album?.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={'trackCardMoreTypography'}>
                      <IconButton className={'trackCardMoreButton'}>
                        <MoreVertIcon className={'trackCardMoreIcon'} />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserTopArtists;
