import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StylesProvider } from '@material-ui/core/styles';

const AlbumTrackTable = ({ items }) => {
  const playAudio = (elemClassName) => () => {
    const audioEl = document.getElementsByClassName(elemClassName)[0];
    try {
      audioEl?.paused ? audioEl?.play() : audioEl?.pause();
    } catch (error) {
      console.log('Error in audio playback', error);
    }
  };

  return (
    <StylesProvider>
      <TableContainer component={Paper}>
        <Table className={'table'} aria-label="track-table">
          <TableHead>
            <TableRow>
              <TableCell className={'topCell'}>#</TableCell>
              <TableCell className={'topCell'}>Title</TableCell>
              <TableCell className={'topCell'}>Play Preview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((track) => (
              <TableRow key={track?.id} className={'row'}>
                <TableCell className={'cell'}>{track?.track_number}</TableCell>
                <TableCell className={'cell'}>{track?.name}</TableCell>
                <TableCell className={'cell'}>
                  <audio className={`audio:${track?.id}`}>
                    <source src={track?.preview_url}></source>
                  </audio>
                  {track?.preview_url !== null ? (
                    <IconButton
                      aria-label="play/pause"
                      onClick={playAudio(`audio:${track?.id}`)}
                    >
                      <PlayArrowIcon className={'playIcon'} />
                    </IconButton>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StylesProvider>
  );
};

export default AlbumTrackTable;
