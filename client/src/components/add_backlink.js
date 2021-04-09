import React from 'react'
import { 
  Button, 
  TextField,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@material-ui/core'


const AddBacklink = () => {
  const [open, setOpen] = React.useState(false)
  
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Add Backlink
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Backlink</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the following fields to add a new backlink.
          </DialogContentText>
          <TextField

          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


// Target URL
// Backlink URL
// Vendor
// Date Ordered
// Order Status
// Language
// Price