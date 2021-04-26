import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { handleClickOpen, handleClose } from "../utils/handlers/click_handlers";
import axios from "axios";

const DeleteBacklink = ({ _id, loadData }) => {
  const [openStatus, setOpenStatus] = useState(false);

  const handleDelete = (id) => {
    axios
      .post("http://localhost:3050/api/backlink/delete", {
        _idArray: [id],
      })
      .then((res) => {
        console.log(id);
        console.log(res);
        loadData();
        handleClose(setOpenStatus);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <>
      <IconButton
        size="small"
        color="secondary"
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

export default DeleteBacklink;
