import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PlaylistRow from '../component/PlaylistRow';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

const PlaylistTable = ({ rows }) => {
  return (
    <StyledEngineProvider>
      <TableContainer component={Paper}>
        <Table className={'table'} aria-label="track-table">
          <TableHead>
            <TableRow>
              <TableCell className={'topCell'}></TableCell>
              <TableCell className={'topCell'}>Name</TableCell>
              <TableCell className={'topCell'}>Owner</TableCell>
              <TableCell className={'topCell'}>Tracks</TableCell>
              <TableCell className={'topCell'}>Followers</TableCell>
              <TableCell className={'topCell'}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((playlist) => (
              <PlaylistRow key={playlist?.id} playlist={playlist} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
};

export default PlaylistTable;
