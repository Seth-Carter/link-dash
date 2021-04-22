import React, { useState }from 'react'
import DateFnsUtils from '@date-io/date-fns'
import axios from 'axios'
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
import { handleClickOpen } from '../utils/handlers/click_handlers'
import { handleClose } from '../utils/handlers/click_handlers'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%'
  }
}))

const initialFormState = {
  targetUrl: '',
  backlinkUrl: '',
  anchor: '',
  dateOrdered: new Date().toISOString(),
  vendor: '',
  orderStatus: '',
  contentLanguage: '',
  price: '',
  currency: ''
}
const AddBacklink = ({loadData}) => {
  const classes = useStyles()

  const [openStatus, setOpenStatus] = useState(false)
  const [formValues, setFormValues] = useState(initialFormState)

   //TODO: Move backlink handlers to a dedicated file in the handlers folder

  const handleSubmit = e => {
    e.preventDefault()
    axios.post('http://localhost:3050/api/backlink/new', {
      ...formValues,
      price: parseFloat(formValues.price)
      })
      .then(res => {
        loadData()
        setFormValues(initialFormState)
        handleClose(setOpenStatus)
      })
      .catch(err => console.error(err))
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
      <Button variant="contained" color="primary" onClick={() => handleClickOpen(setOpenStatus)}>
        Add Backlink
      </Button>
      <Dialog fullWidth maxWidth="sm" open={openStatus} onClose={() => handleClose(setOpenStatus)}>
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
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Anchor"
                name="anchor"
                value={formValues.anchor}
                onChange={handleInputChange}
                />
            </div>
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
              </Grid>
            </Grid>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Vendor"
                name="vendor"
                value={formValues.vendor}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Language"
                name="contentLanguage"
                value={formValues.contentLanguage}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Price"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                margin="dense"
                fullWidth
                label="Currency"
                name="currency"
                value={formValues.currency}
                onChange={handleInputChange}
              />
            </div>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => handleClose(setOpenStatus)}
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