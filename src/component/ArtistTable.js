import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArtistRow from '../component/ArtistRow';
import { StylesProvider } from '@material-ui/core/styles';

const ArtistTable = ({ items }) => {
  return (
    <StylesProvider>
      <TableContainer component={Paper}>
        <Table className={'table'} aria-label="track-table">
          <TableHead>
            <TableRow>
              <TableCell className={'topCell'}></TableCell>
              <TableCell className={'topCell'}>Artist</TableCell>
              <TableCell className={'topCell'}>Genres</TableCell>
              <TableCell className={'topCell'}>Followers</TableCell>
              <TableCell className={'topCell'}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((artist) => (
              <ArtistRow key={artist?.id} artist={artist} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StylesProvider>
  );
};

export default ArtistTable;
