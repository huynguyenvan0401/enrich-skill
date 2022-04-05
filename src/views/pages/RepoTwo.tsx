import React, { useEffect, useState } from 'react';
import { fetchRepoData, deleteRepoData } from 'actions/dataRepo';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Container, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditModal, { Form } from 'components/EditModal';
import DeleteModal from 'components/DeleteModal';
import Header from 'components/Header';
import Table from 'components/Table';

export default function RepoOne() {
  const dispatch = useDispatch();

  // Get repo data
  const rows = useSelector((state: RootStateOrAny) => state.data);
  useEffect(() => {
    if (!rows.length) {
      dispatch(fetchRepoData());
    }
  }, []);

  // Setting form values
  const [values, setValues] = useState<Form>({
    id: '',
    name: '',
    description: '',
    watchers: 0,
    language: '',
    openIssues: 0,
    private: 'false',
  });

  const onFormChange = (key: any, value: any) => {
    setValues({ ...values, [key]: value });
  };

  // Setting modal for edit and add repo data
  const [mode, setMode] = useState('edit');
  const [showModal, updateShowModal] = useState(false);
  const toggleModal = () => updateShowModal((state) => !state);

  // Setting modal for delete repo data
  const [showDelModal, setShowDelModal] = useState(false);
  const toggleDelModal = () => setShowDelModal((state) => !state);
  const [delId, setDelId] = useState(0);
  const handleDelete = () => {
    dispatch(deleteRepoData({ id: delId }));
    toggleDelModal();
  };

  // Setting table display repo data
  const onEditClick = (params: any) => {
    setMode('edit');
    setValues({
      id: params.row.id,
      name: params.row.name,
      description: params.row.description,
      watchers: params.row.watchers_count,
      language: params.row.language,
      openIssues: params.row.open_issues,
      private: params.row.private ? 'true' : 'false',
    });
    toggleModal();
  };

  const onDeleteClick = (params: any) => {
    setDelId(params.row.id);
    toggleDelModal();
  };

  const onAddClick = () => {
    setMode('add');
    setValues({
      id: '',
      name: '',
      description: '',
      watchers: 0,
      language: '',
      openIssues: 0,
      private: 'false',
    });
    toggleModal();
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <EditModal
          open={showModal}
          toggle={toggleModal}
          mode={mode}
          form={values}
          onFormChange={onFormChange}
        />
        <DeleteModal open={showDelModal} toggle={toggleDelModal} handleDelete={handleDelete} />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" endIcon={<AddIcon />} onClick={onAddClick}>
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
          <Table onEditClick={onEditClick} onDeleteClick={onDeleteClick} rows={rows} />
        </Box>
      </Container>
    </>
  );
}
