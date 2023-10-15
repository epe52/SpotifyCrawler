import {
  Avatar,
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

const TrackTable = ({ items }) => {
  const playAudio = (elemClassName) => () => {
    const audioEl = document.getElementsByClassName(elemClassName)[0];
    try {
      audioEl?.paused ? audioEl?.play() : audioEl?.pause();
    } catch (error) {
      console.debug('Error in audio playback', error);
    }
  };

  return (
    <StyledEngineProvider>
      <TableContainer component={Paper}>
        <Table className={'table'} aria-label="track-table">
          <TableHead>
            <TableRow>
              <TableCell className={'topCell'}>Title</TableCell>
              <TableCell className={'topCell'}>Artist</TableCell>
              <TableCell className={'topCell'}>Album</TableCell>
              <TableCell align="right" className={'topCell'}>
                Play Preview
              </TableCell>
              <TableCell className={'topCell'}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((track) => (
              <TableRow key={track?.id} className={'row'}>
                <TableCell className={'cell'}>{track?.name}</TableCell>
                <TableCell className={'cell'}>
                  {track?.artists?.map((artist) => artist?.name).join(', ')}
                </TableCell>
                <TableCell className={'cell'}>{track?.album?.name}</TableCell>
                <TableCell align="right" className={'cell'}>
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
                <TableCell align="right" className={'cell'}>
                  <Avatar
                    variant="rounded"
                    alt="Album cover"
                    src={track?.album?.images[1]?.url}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
};

export default TrackTable;
