import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Box from '@mui/material/Box';
import { saveRepoData, addRepoData } from 'actions/dataRepo';
import {
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface State {
  id: string;
  name: string;
  description: string;
  watchers: number;
  language: string;
  openIssues: number;
  private: string;
  mode: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, toggle }: { open: any; toggle: any }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState<State>({
    id: '',
    name: '',
    description: '',
    watchers: 0,
    language: '',
    openIssues: 0,
    private: 'false',
    mode: 'edit',
  });

  const form = useSelector((state: RootStateOrAny) => state.form);
  useEffect(() => {
    setValues(form);
  }, [form]);

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSave = () => {
    dispatch(saveRepoData(values));
    toggle();
  };

  const handleAdd = () => {
    dispatch(addRepoData(values));
    toggle();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {values && values.mode === 'edit' && (
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="id">ID</InputLabel>
              <OutlinedInput id="id" value={values.id} label="ID" disabled />
            </FormControl>
          )}

          {values && values.mode === 'add' && (
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="id">ID</InputLabel>
              <OutlinedInput id="id" value={values.id} onChange={handleChange('id')} label="ID" />
            </FormControl>
          )}

          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              value={values.name}
              onChange={handleChange('name')}
              label="Name"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="description">Description</InputLabel>
            <OutlinedInput
              id="description"
              value={values.description}
              onChange={handleChange('description')}
              label="Description"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="watchers">Watchers</InputLabel>
            <OutlinedInput
              id="watchers"
              type="number"
              value={values.watchers}
              onChange={handleChange('watchers')}
              label="Watchers"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="language">Language</InputLabel>
            <OutlinedInput
              id="language"
              value={values.language}
              onChange={handleChange('language')}
              label="Language"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="openIssues">Open Issues</InputLabel>
            <OutlinedInput
              id="openIssues"
              type="number"
              value={values.openIssues}
              onChange={handleChange('openIssues')}
              label="Open Issues"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="private">Private</InputLabel>
            <Select
              labelId="private"
              id="select-private"
              value={values.private}
              label="Private"
              name="private"
              onChange={handleSelectChange}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            {values && values.mode === 'edit' && (
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  marginRight: 2,
                }}
              >
                Save
              </Button>
            )}

            {values && values.mode === 'add' && (
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  marginRight: 2,
                }}
              >
                Add
              </Button>
            )}

            <Button variant="outlined" onClick={toggle}>
              Cancle
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
