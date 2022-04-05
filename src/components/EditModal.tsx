import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  FormHelperText,
  Box,
} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export interface Form {
  id: string;
  name: string;
  description: string;
  watchers: number;
  language: string;
  openIssues: number;
  private: string;
}

export interface Props {
  open: boolean;
  toggle: () => void;
  onFormChange: (key: any, value: any) => void;
  mode: string;
  form: Form;
}

export default function EditModal({ open, toggle, onFormChange, mode, form }: Props) {
  const dispatch = useDispatch();
  const [values, setValues] = useState<Form>(form);

  const handleChange = (prop: keyof Form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    onFormChange(prop, event.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    onFormChange(name, value);
  };

  const [showErr, setShowErr] = useState<boolean>(false);
  const [validate, setValidate] = useState<any>({
    name: false,
    description: false,
    language: false,
    private: false,
  });

  const validateForm = () => {
    const valid = {
      name: false,
      description: false,
      language: false,
      private: false,
    };

    if (values.name.length < 1 || values.name.length > 100) {
      valid.name = false;
    } else {
      valid.name = true;
    }

    if (values.description.length < 1 || values.description.length > 150) {
      valid.description = false;
    } else {
      valid.description = true;
    }

    if (values.language.length < 1 || values.language.length > 50) {
      valid.language = false;
    } else {
      valid.language = true;
    }

    if (!values.private.length) {
      valid.private = false;
    } else {
      valid.private = true;
    }

    setValidate((prev: any) => ({
      ...prev,
      ...valid,
    }));

    if (valid.name && valid.description && valid.language && valid.private) {
      setShowErr(false);
      return true;
    }
    setShowErr(true);
    return false;
  };

  const handleSave = () => {
    if (validateForm()) {
      dispatch(saveRepoData(values));
      toggle();
    }
  };

  const handleAdd = () => {
    if (validateForm()) {
      dispatch(addRepoData(values));
      toggle();
    }
  };

  useEffect(() => {
    setValues(form);
    setValidate({
      name: false,
      description: false,
      language: false,
      private: false,
    });
    setShowErr(false);
  }, [form]);

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form data-testid="edit-form">
            {mode === 'edit' && (
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="id">ID</InputLabel>
                <OutlinedInput
                  id="id"
                  value={values.id}
                  label="ID"
                  disabled
                  inputProps={{ 'data-testid': 'id' }}
                />
              </FormControl>
            )}

            <FormControl
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
              error={showErr && !validate.name}
              required
            >
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                value={values.name}
                onChange={handleChange('name')}
                label="Name"
                inputProps={{ 'data-testid': 'name' }}
              />
              <FormHelperText>
                {showErr && !validate.name ? 'Please enter repository name' : ''}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
              error={showErr && !validate.description}
              required
            >
              <InputLabel htmlFor="description">Description</InputLabel>
              <OutlinedInput
                id="description"
                value={values.description}
                onChange={handleChange('description')}
                label="Description"
                inputProps={{ 'data-testid': 'description' }}
              />
              <FormHelperText>
                {showErr && !validate.description ? 'Please enter repository description' : ''}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="watchers">Watchers</InputLabel>
              <OutlinedInput
                id="watchers"
                type="number"
                value={values.watchers}
                onChange={handleChange('watchers')}
                label="Watchers"
                inputProps={{ 'data-testid': 'watchers' }}
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
              error={showErr && !validate.language}
              required
            >
              <InputLabel htmlFor="language">Language</InputLabel>
              <OutlinedInput
                id="language"
                value={values.language}
                onChange={handleChange('language')}
                label="Language"
                inputProps={{ 'data-testid': 'language' }}
              />
              <FormHelperText>
                {showErr && !validate.language ? 'Please enter repository language' : ''}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="openIssues">Open Issues</InputLabel>
              <OutlinedInput
                id="openIssues"
                type="number"
                value={values.openIssues}
                onChange={handleChange('openIssues')}
                label="Open Issues"
                inputProps={{ 'data-testid': 'openIssues' }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} error={showErr && !validate.private} required>
              <InputLabel id="private">Private</InputLabel>
              <Select
                labelId="private"
                id="select-private"
                value={values.private}
                label="Private"
                name="private"
                onChange={handleSelectChange}
                inputProps={{ 'data-testid': 'private' }}
              >
                <MenuItem value="">Select private...</MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
              <FormHelperText>
                {showErr && !validate.private ? 'Please select repository private' : ''}
              </FormHelperText>
            </FormControl>

            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              {mode === 'edit' && (
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

              {mode === 'add' && (
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

              <Button variant="outlined" onClick={toggle} data-testid="cancel-button">
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
