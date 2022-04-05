import React from 'react';
import Box from '@mui/material/Box';
import { Modal, Button, Typography } from '@mui/material';

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

export interface Props {
  open: boolean;
  toggle: () => void;
  handleDelete: () => void;
}

export default function DeleteModal({ open, toggle, handleDelete }: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure want to delete this item?
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={handleDelete}
              sx={{
                marginRight: 2,
              }}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={toggle}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
