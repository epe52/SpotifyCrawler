import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlaylistTrackTable from '../component/PlaylistTrackTable';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import spotifyAPI from '../spotifyAPI/spotifyAPI';

const PlaylistRow = ({ playlist }) => {
  const columns = 6;
  const [open, setOpen] = useState(false);
  const [playlistDetails, setPlaylistDetails] = useState([]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlist?.id)
      .then((response) => setPlaylistDetails(response))
      .catch((error) => console.debug(error));
  }, []);

  return (
    <React.Fragment key={playlist?.id}>
      <StyledEngineProvider>
        <TableRow key={playlist?.id}>
          <TableCell className={'cell'}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className={'cell'}>{playlist?.name}</TableCell>
          <TableCell className={'cell'}>
            {playlist?.owner?.display_name}
          </TableCell>
          <TableCell className={'cell'}>
            {playlist?.tracks?.total.toLocaleString()}
          </TableCell>
          <TableCell className={'cell'}>
            {playlistDetails?.followers?.total.toLocaleString()}
          </TableCell>
          <TableCell align="right" className={'cell'}>
            <Avatar
              variant="rounded"
              alt="Album cover"
              src={playlist?.images[0]?.url}
            />
          </TableCell>
        </TableRow>
        <TableRow key={`2:${playlist?.id}`} className={'row'}>
          <TableCell className={'dropdownCell'} colSpan={columns}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                Playlist tracks
                <PlaylistTrackTable items={playlistDetails} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default PlaylistRow;
