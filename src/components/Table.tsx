import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export interface Props {
  rows: any;
  onEditClick: (params: any) => void;
  onDeleteClick: (params: any) => void;
}

export default function Table({ rows, onEditClick, onDeleteClick }: Props) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, editable: false },
    { field: 'name', headerName: 'NAME', width: 240, editable: false },
    { field: 'description', headerName: 'DESCRIPTION', width: 350, editable: false },
    {
      field: 'watchers_count',
      headerName: 'WATCHERS',
      type: 'number',
      width: 90,
      editable: false,
    },
    { field: 'language', headerName: 'LANGUAGE', width: 90, editable: false },
    {
      field: 'open_issues',
      headerName: 'OPEN ISSUES',
      type: 'number',
      width: 110,
      editable: false,
    },
    { field: 'private', headerName: 'PRIVATE', width: 70, editable: false },
    {
      field: 'menu',
      headerName: 'MENU',
      width: 100,
      sortable: false,
      hideable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<any>) => (
        <strong>
          <IconButton aria-label="edit" onClick={() => onEditClick(params)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onDeleteClick(params)}>
            <DeleteIcon />
          </IconButton>
        </strong>
      ),
    },
  ];
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        disableSelectionOnClick
      />
    </div>
  );
}
