import React, { useEffect, useState }from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { 
  Button, 
  TextField,
  Dialog, 
  DialogActions,
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Input
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%'
  }
}))

const initialFormState = {
  targetUrl: '',
  backlinkUrl: '',
  dateOrdered: new Date().toISOString(),
  vendor: '',
  orderStatus: '',
  language: '',
  price: null
}

const AddBacklink = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState(initialFormState)

   //TODO: Move backlink handlers to a dedicated file in the handlers folder

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert(`On ${formValues.dateOrdered} submitting Target URL: ${formValues.targetUrl} / Backlink URL ${formValues.backlinkUrl}`)
    setFormValues(initialFormState)
    handleClose()
  }

  const handleInputChange = e => {
    setFormValues(formValues => ({
      ...formValues,
      [e.target.name]: e.target.value
    }))
  }

  const handleDateChange = e => {
    setFormValues(formValues => ({
      ...formValues,
      dateOrdered: e.toISOString()
    }))
  }

  const handleStatusChange = e => {
    setFormValues(formValues => ({
      ...formValues,
      orderStatus: e.target.value
    }))
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Backlink
      </Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Add Backlink</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the following fields to add a new backlink.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Target URL"
                name="targetUrl"
                value={formValues.targetUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Backlink URL"
                name="backlinkUrl"
                value={formValues.backlinkUrl}
                onChange={handleInputChange}
              />
            </div>
            <Grid container justify="space-between">
              <Grid item xs>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="date-picker-inline"
                    label="Date Ordered"
                    name="dateOrdered"
                    value={formValues.dateOrdered}
                    onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.formControl} margin="dense">
                  <InputLabel>Order Status</InputLabel>
                  <Select 
                    value={formValues.orderStatus}
                    onChange={handleStatusChange}
                    input={<Input />}
                  >
                    {/* Need to figure out what options should be included here */}
                    <MenuItem value="started">Started</MenuItem>                 
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="reviewing">Reviewing</MenuItem>
                    <MenuItem value="complete">Complete</MenuItem>
                  </Select>
                </FormControl>
                <p>You selected: {formValues.orderStatus}</p>
              </Grid>
            </Grid>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Vendor"
                name="vendor"
                value={formValues.backlinkUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Language"
                name="language"
                value={formValues.backlinkUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Price"
                name="price"
                value={formValues.backlinkUrl}
                onChange={handleInputChange}
              />
            </div>
            <DialogActions>
              <Button
                color="primary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddBacklink