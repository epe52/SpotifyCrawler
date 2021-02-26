import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(() => ({
  topCell: {
    fontWeight: 'bold',
    borderBottom: '3px solid black',
  },
  row: {
    borderBottom: '1px solid black',
  },
  cell: {
    borderBottom: 'none',
    textTransform: 'capitalize',
  },
  dropdownCell: {
    paddingBottom: 0,
    paddingTop: 0,
    borderBottom: '1px solid black',
  },
}));

const ArtistRow = ({ artist }) => {
  const classes = useStyles();
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
      <TableRow key={artist?.id}>
        <TableCell className={classes.cell}>
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
        <TableCell className={classes.cell}>{artist?.name}</TableCell>
        <TableCell className={classes.cell}>
          {artist?.genres.join(', ')}
        </TableCell>
        <TableCell className={classes.cell}>
          {artist?.followers.total.toLocaleString()}
        </TableCell>
        <TableCell align="right" className={classes.cell}>
          <Avatar
            variant="rounded"
            alt="Album cover"
            src={artist?.images[1].url}
          />
        </TableCell>
      </TableRow>
      <TableRow key={`2:${artist?.id}`} className={classes.row}>
        <TableCell className={classes.dropdownCell} colSpan={columns}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              Artists top 10 songs in your country
              <TrackTable items={topTracks?.tracks} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ArtistRow;
