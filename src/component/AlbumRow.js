import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import AlbumTrackTable from '../component/AlbumTrackTable';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import { useState } from 'react';

const AlbumRow = ({ album }) => {
  const columns = 7;
  const offset = 0;
  const limit = 50;
  const [open, setOpen] = useState(false);
  const [albumTracks, setAlbumTracks] = useState([]);

  const getAT = () => {
    spotifyAPI
      .getAlbumTracks(album?.id, offset, limit)
      .then((response) => setAlbumTracks(response))
      .catch((error) => console.debug(error));
  };

  return (
    <React.Fragment key={album?.id}>
      <StyledEngineProvider>
        <TableRow key={album?.id}>
          <TableCell className={'cell'}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
                getAT();
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className={'cell'}>{album?.name}</TableCell>
          <TableCell className={'cell'}>
            {album?.artists?.map((artist) => artist.name).join(', ')}
          </TableCell>
          <TableCell className={'cell'}>{album?.album_type}</TableCell>
          <TableCell className={'cell'}>{album?.total_tracks}</TableCell>
          <TableCell className={'cell'}>{album?.release_date}</TableCell>
          <TableCell align="right" className={'cell'}>
            <Avatar
              variant="rounded"
              alt="Album cover"
              src={album?.images[1]?.url}
            />
          </TableCell>
        </TableRow>
        <TableRow key={`2:${album?.id}`} className={'row'}>
          <TableCell className={'dropdownCell'} colSpan={columns}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} className={'albumTrackBox'}>
                Album tracks
                <AlbumTrackTable items={albumTracks?.items} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default AlbumRow;
