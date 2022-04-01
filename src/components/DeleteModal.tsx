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
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({
  open,
  toggle,
  handleDelete,
}: {
  open: any;
  toggle: any;
  handleDelete: any;
}) {
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
              variant="contained"
              onClick={handleDelete}
              sx={{
                marginRight: 2,
              }}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={toggle}>
              Cancle
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
