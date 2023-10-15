import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import TrackTable from '../component/TrackTable';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import { useState } from 'react';

const ArtistRow = ({ artist }) => {
  const columns = 5;
  const artistId = artist?.id;
  const [open, setOpen] = useState(false);
  const [topTracks, setTopTracks] = useState([]);

  const searchArtistTopTracks = async () => {
    try {
      const resp = await spotifyAPI.getArtistTopTracks(artistId);
      setTopTracks(resp);
    } catch (error) {
      console.debug('Error in searching artist top tracks', error);
    }
  };

  return (
    <React.Fragment key={artist?.id}>
      <StyledEngineProvider>
        <TableRow key={artist?.id}>
          <TableCell className={'cell'}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
                searchArtistTopTracks();
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className={'cell'}>{artist?.name}</TableCell>
          <TableCell className={'cell'}>{artist?.genres?.join(', ')}</TableCell>
          <TableCell className={'cell'}>
            {artist?.followers?.total?.toLocaleString()}
          </TableCell>
          <TableCell align="right" className={'cell'}>
            <Avatar
              variant="rounded"
              alt="Album cover"
              src={artist?.images[1]?.url}
            />
          </TableCell>
        </TableRow>
        <TableRow key={`2:${artist?.id}`} className={'row'}>
          <TableCell className={'dropdownCell'} colSpan={columns}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                Artists top 10 songs in your country
                <TrackTable items={topTracks?.tracks} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default ArtistRow;
