import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AlbumRow from '../component/AlbumRow';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

const AlbumTable = ({ items }) => {
  return (
    <StyledEngineProvider>
      <TableContainer component={Paper}>
        <Table className={'table'} aria-label="track-table">
          <TableHead>
            <TableRow>
              <TableCell className={'topCell'}></TableCell>
              <TableCell className={'topCell'}>Title</TableCell>
              <TableCell className={'topCell'}>Artist</TableCell>
              <TableCell className={'topCell'}>Type</TableCell>
              <TableCell className={'topCell'}>Tracks</TableCell>
              <TableCell className={'topCell'}>Release date</TableCell>
              <TableCell className={'topCell'}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((album) => (
              <AlbumRow key={album?.id} album={album} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
};

export default AlbumTable;
