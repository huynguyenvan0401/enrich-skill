import React, { useEffect, useState } from 'react';
import { fetchRepoData, deleteRepoData } from 'actions/dataRepo';
import updateForm from 'actions/formAction';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Container, Box, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import EditModal from 'components/EditModal';
import DeleteModal from 'components/DeleteModal';
import Header from 'components/Header';

export default function DataTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootStateOrAny) => state.data);

  useEffect(() => {
    if (!rows.length) {
      dispatch(fetchRepoData());
    }
  }, []);

  const [showModal, updateShowModal] = useState(false);

  const toggleModal = () => updateShowModal((state) => !state);

  // Delete modal
  const [showDelModal, setShowDelModal] = useState(false);

  const toggleDelModal = () => setShowDelModal((state) => !state);

  const [delId, setDelId] = useState(0);

  const handleDelete = () => {
    dispatch(deleteRepoData({ id: delId }));
    toggleDelModal();
  };

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
      renderCell: (params: GridRenderCellParams<Date>) => (
        <strong>
          <IconButton
            aria-label="edit"
            onClick={() => {
              dispatch(
                updateForm({
                  id: params.row.id,
                  name: params.row.name,
                  description: params.row.description,
                  watchers: params.row.watchers_count,
                  language: params.row.language,
                  openIssues: params.row.open_issues,
                  private: params.row.private,
                  mode: 'edit',
                })
              );
              toggleModal();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setDelId(params.row.id);
              toggleDelModal();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </strong>
      ),
    },
  ];
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <EditModal open={showModal} toggle={toggleModal} />
        <DeleteModal open={showDelModal} toggle={toggleDelModal} handleDelete={handleDelete} />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center ',
          }}
        >
          <Typography variant="h3" component="div" gutterBottom>
            Management
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => {
              dispatch(
                updateForm({
                  id: '',
                  name: '',
                  description: '',
                  watchers: 0,
                  language: '',
                  openIssues: 0,
                  private: '',
                  mode: 'add',
                })
              );
              toggleModal();
            }}
          >
            Add
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>
        </Box>
      </Container>
    </>
  );
}
