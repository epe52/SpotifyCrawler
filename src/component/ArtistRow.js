import React from 'react';
import { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import TrackTable from '../component/TrackTable';
import { StylesProvider } from '@material-ui/core/styles';

const ArtistRow = ({ artist }) => {
  const columns = 5;
  const id = artist?.id;
  const [open, setOpen] = useState(false);
  const [topTracks, setTopTracks] = useState([]);

  const searchArtistTopTracks = async () => {
    try {
      const resp = await spotifyAPI.getArtistTopTracks(id);
      setTopTracks(resp);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <React.Fragment key={artist?.id}>
      <StylesProvider>
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
          <TableCell className={'cell'}>{artist?.genres.join(', ')}</TableCell>
          <TableCell className={'cell'}>
            {artist?.followers.total.toLocaleString()}
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
      </StylesProvider>
    </React.Fragment>
  );
};

export default ArtistRow;
