import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

const PlaylistTrackTable = ({ items }) => {
  const [rows, setRows] = useState([]);
  const columnsAmount = 5;
  const tH = columnsAmount * 85;
  const tW =
    document.getElementsByClassName('MuiTableBody-root')[0].offsetWidth;
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
        added_at: new Date(item?.added_at).toLocaleDateString(),
        album: item?.track?.album?.name,
        artists: item?.track?.artists?.map((artist) => artist.name).join(', '),
        id: i,
        name: item?.track?.name,
      })),
    );
  }, []);

  return (
    <StyledEngineProvider>
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
    </StyledEngineProvider>
  );
};

export default PlaylistTrackTable;
