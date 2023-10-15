import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

const AlbumTrackTable = ({ rows }) => {
  const playAudio = (elemClassName) => () => {
    const audioEl = document.getElementsByClassName(elemClassName)[0];
    try {
      audioEl?.paused ? audioEl?.play() : audioEl?.pause();
    } catch (error) {
      console.log('Error in audio playback', error);
    }
  };

  return (
    <StyledEngineProvider>
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
            {rows?.map((track) => (
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
    </StyledEngineProvider>
  );
};

export default AlbumTrackTable;
