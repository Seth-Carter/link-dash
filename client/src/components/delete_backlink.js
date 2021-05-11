import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import axios from 'axios';
import { handleClickOpen, handleClose } from '../utils/handlers/handlers';

const DeleteBacklink = ({ _id, setBacklink }) => {
  const [openStatus, setOpenStatus] = useState(false);

  const handleDelete = (id) => {
    axios
      .post('/api/backlink/delete', {
        _idArray: [id],
      })
      .then((res) => {
        setBacklink(res.data);
        handleClose(setOpenStatus);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <IconButton
        color="primary"
        size="small"
        onClick={() => handleClickOpen(setOpenStatus)}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={openStatus} onClose={() => handleClose(setOpenStatus)}>
        <DialogTitle>Delete Backlink</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this backlink? This cannot be
            undone.
          </DialogContentText>
          <DialogActions>
            <Button color="primary" onClick={() => handleDelete(_id)}>
              Confirm
            </Button>
            <Button color="primary" onClick={() => handleClose(setOpenStatus)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

DeleteBacklink.propTypes = {
  _id: PropTypes.string.isRequired,
  setBacklink: PropTypes.func.isRequired,
};

export default DeleteBacklink;
