import React from 'react';
import { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const PlaylistTrackTable = ({ items }) => {
  const [rows, setRows] = useState([]);
  const columnsAmount = 5;
  const tH = columnsAmount * 85;
  const tW = document.getElementsByClassName('MuiTableBody-root')[0]
    .offsetWidth;
  const columnW = tW / columnsAmount;

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Track', width: columnW },
    { field: 'artists', headerName: 'Artist', width: columnW },
    { field: 'album', headerName: 'Album', width: columnW },
    {
      field: 'added_at',
      headerName: 'Added',
      sortable: false,
      width: columnW,
    },
  ];

  useEffect(() => {
    setRows(
      items?.tracks?.items?.map((item, i) => ({
        id: i,
        name: item?.track?.name,
        artists: item?.track?.artists?.map((artist) => artist.name).join(', '),
        album: item?.track?.album?.name,
        added_at: new Date(item?.added_at).toLocaleDateString(),
      })),
    );
  }, []);

  return (
    <StylesProvider>
      <div style={{ height: tH, tW }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          columnBuffer={8}
          hideFooterSelectedRowCount={true}
          onRowSelected={null}
        />
      </div>
    </StylesProvider>
  );
};

export default PlaylistTrackTable;
