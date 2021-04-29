import React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AddIcon from '@material-ui/icons/Add';

const TrackGrid = ({ tracks, previewSong, gridID }) => {
  const [displayTracks, setDisplayTracks] = useState([]);
  const [trackPageAmount, setTrackPageAmount] = useState([]);
  const [trackPages, setTrackPages] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const totalTracks = tracks.length;
  const tracksPerPage = 6;
  const trackPagesToShow = 4;

  useEffect(() => {
    previewSong.volume = 0.6;
    if (totalTracks > tracksPerPage) {
      setDisplayTracks(tracks.slice(0, tracksPerPage));
      setTrackPages(true);
      setTrackPageAmount(
        Array.from(Array(Math.ceil(totalTracks / tracksPerPage)).keys()),
      );
    } else {
      setDisplayTracks(tracks);
    }
    currentPage > 0 ? changeActivePageColor(0) : null;
  }, [tracks]);

  const stopMusic = () => (previewSong.src = '');

  const pageChange = (page) => {
    const nextStart = page * tracksPerPage;
    setDisplayTracks(
      tracks.slice(
        nextStart,
        nextStart + tracksPerPage > totalTracks
          ? totalTracks
          : nextStart + tracksPerPage,
      ),
    );
    stopMusic();
    setCurrentPage(page);
  };

  const changeActivePageColor = (page) => {
    document.getElementsByClassName(
      `${gridID}trackPage${currentPage}`,
    )[0].style.backgroundColor = '#ebebeb';
    document.getElementsByClassName(
      `${gridID}trackPage${page}`,
    )[0].style.backgroundColor = 'white';
    window.scrollTo(
      0,
      document.getElementsByClassName(`${gridID}trackGrid`)[0].offsetTop,
    );
  };

  const playPreview = (url) => {
    if (previewSong.paused || previewSong.src !== url) {
      previewSong.src = url;
      previewSong.play().catch((error) => console.log(error));
    } else {
      stopMusic();
    }
  };

  const pageButton = (page, text) => {
    return (
      <Button
        key={page}
        className={`${gridID}trackPage${page}`}
        onClick={() => {
          pageChange(page);
          changeActivePageColor(page);
        }}
      >
        {text}
      </Button>
    );
  };

  return (
    <>
      <Grid container spacing={1} className={`${gridID}trackGrid`}>
        {displayTracks?.map((track) => (
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
      {trackPages ? (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <ButtonGroup
            aria-label="outlined primary button group"
            className="trackGridPages"
          >
            {trackPageAmount?.map((page) => {
              return (page < currentPage + trackPagesToShow / 2 &&
                page > currentPage - trackPagesToShow / 2) ||
                page === trackPageAmount.length - 1 ||
                page === 0
                ? pageButton(page, page + 1)
                : page === trackPageAmount.length - 2 ||
                  (currentPage > 0 && page < currentPage && page === 1)
                ? pageButton(page, '...')
                : null;
            })}
          </ButtonGroup>
        </Grid>
      ) : (
        ''
      )}
    </>
  );
};

export default TrackGrid;
