import React from 'react';
import { useState } from 'react';
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
import AlbumTrackTable from '../component/AlbumTrackTable';

const AlbumRow = ({ album }) => {
  const columns = 7;
  const offset = 0;
  const limit = 50;
  const [open, setOpen] = useState(false);
  const [albumTracks, setAlbumTracks] = useState([]);

  const getAlbumTracks = () => {
    spotifyAPI
      .getAlbumTracks(album?.id, offset, limit)
      .then((response) => setAlbumTracks(response))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment key={album?.id}>
      <StylesProvider>
        <TableRow key={album?.id}>
          <TableCell className={'cell'}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
                getAlbumTracks();
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
      </StylesProvider>
    </React.Fragment>
  );
};

export default AlbumRow;
