import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AddIcon from '@material-ui/icons/Add';

const TrackGrid = ({ tracks, previewSong }) => {
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
      <Grid container spacing={1}>
        {tracks?.map((track) => (
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
                        <PlayCircleFilledIcon className={'trackCardPlayIcon'} />
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
                  <Typography className={'trackCardAddTypography'}>
                    <IconButton className={'trackCardAddButton'}>
                      <AddIcon className={'trackCardAddIcon'} />
                    </IconButton>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    </>
  );
};

export default TrackGrid;
