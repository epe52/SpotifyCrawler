import React from 'react';
import { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const PlaylistTrackTable = ({ items }) => {
  const [rows, setRows] = useState([]);
  const rowAmount = 5;
  const tH = rowAmount * 85;
  const tW = document.getElementsByClassName('MuiTableBody-root')[0]
    .offsetWidth;

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Track', width: tW / rowAmount },
    { field: 'artists', headerName: 'Artist', width: tW / rowAmount },
    { field: 'album', headerName: 'Album', width: tW / rowAmount },
    {
      field: 'added_at',
      headerName: 'Added',
      sortable: false,
      width: tW / rowAmount,
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
