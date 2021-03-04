import React from 'react';
import { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { StylesProvider } from '@material-ui/core/styles';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

const PlaylistRow = ({ playlist }) => {
  const columns = 6;
  const [open, setOpen] = useState(false);
  const [playlistDetails, setPlaylistDetails] = useState([]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlist?.id)
      .then((response) => setPlaylistDetails(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment key={playlist?.id}>
      <StylesProvider>
        <TableRow key={playlist?.id}>
          <TableCell className={'cell'}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
              }}
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
              <Box margin={1} className={'albumTrackBox'}>
                Playlist tracks
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </StylesProvider>
    </React.Fragment>
  );
};

export default PlaylistRow;
