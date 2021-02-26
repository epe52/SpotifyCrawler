import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArtistRow from '../component/ArtistRow';

const useStyles = makeStyles(() => ({
  table: {
    background: 'rgb(30 215 96)',
    border: '3px solid black',
  },
  topCell: {
    fontWeight: 'bold',
    borderBottom: '3px solid black',
  },
}));

const ArtistTable = ({ items }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="track-table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.topCell}></TableCell>
            <TableCell className={classes.topCell}>Artist</TableCell>
            <TableCell className={classes.topCell}>Genres</TableCell>
            <TableCell className={classes.topCell}>Followers</TableCell>
            <TableCell className={classes.topCell}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((artist) => (
            <ArtistRow key={artist?.id} artist={artist} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ArtistTable;
