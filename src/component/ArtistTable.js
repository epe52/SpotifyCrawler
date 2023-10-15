import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ArtistRow from '../component/ArtistRow';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

const ArtistTable = ({ rows }) => {
  return (
    <StyledEngineProvider>
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
            {rows.map((artist) => (
              <ArtistRow key={artist?.id} artist={artist} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
};

export default ArtistTable;
