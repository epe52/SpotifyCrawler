import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
  playIcon: {
    height: 18,
    width: 18,
  },
  table: {
    background: 'rgb(30 215 96)',
    border: '3px solid black',
  },
  topCell: {
    fontWeight: 'bold',
    borderBottom: '3px solid black',
  },
  cell: {
    borderBottom: '1px solid black',
  },
}));

const TrackTable = ({ items }) => {
  const classes = useStyles();

  const playAudio = (elemClassName) => () => {
    const audioEl = document.getElementsByClassName(elemClassName)[0];
    try {
      audioEl?.paused ? audioEl?.play() : audioEl?.pause();
    } catch (error) {
      console.log('Error in audio playback', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="track-table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.topCell}>Song artists</TableCell>
            <TableCell className={classes.topCell}>Song</TableCell>
            <TableCell className={classes.topCell}>Album</TableCell>
            <TableCell align="right" className={classes.topCell}>
              Play Preview
            </TableCell>
            <TableCell className={classes.topCell}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((track) => (
            <TableRow key={track?.id}>
              <TableCell className={classes.cell}>
                {track?.artists?.map((artist) => artist.name).join(', ')}
              </TableCell>
              <TableCell className={classes.cell}>{track?.name}</TableCell>
              <TableCell className={classes.cell}>
                {track?.album.name}
              </TableCell>
              <TableCell align="right" className={classes.cell}>
                <audio className={`audio:${track?.id}`}>
                  <source src={track?.preview_url}></source>
                </audio>
                {track?.preview_url !== null ? (
                  <IconButton
                    aria-label="play/pause"
                    onClick={playAudio(`audio:${track?.id}`)}
                  >
                    <PlayArrowIcon className={classes.playIcon} />
                  </IconButton>
                ) : null}
              </TableCell>
              <TableCell align="right" className={classes.cell}>
                <Avatar
                  variant="rounded"
                  alt="Album cover"
                  src={track?.album.images[1].url}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrackTable;
