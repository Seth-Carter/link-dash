import { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { handleClickOpen, handleClose } from '../utils/handlers/click_handlers'

const DeleteBacklink = ({_id}) => {
  const [ openStatus, setOpenStatus ]  = useState(false)

  const deleteHandler = (id) => {

  }

  return (
    <>
      <IconButton size="small" color="secondary" onClick={() => handleClickOpen(setOpenStatus)}>
        <DeleteIcon/>
      </IconButton>
      <Dialog open={openStatus} onClose={() => handleClose(setOpenStatus)}>
        <DialogTitle>
          Delete Backlink
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this backlink? This cannot be undone.
          </DialogContentText>
          <DialogActions>
            <Button color="primary">Confirm</Button>
            <Button color="primary" onClick={() => handleClose(setOpenStatus)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
    )
}

export default DeleteBacklink