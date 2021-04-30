import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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
  Input,
} from '@material-ui/core';
import { handleClickOpen, handleClose } from '../utils/handlers/click_handlers';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '100%',
  },
}));

const initialFormState = {
  targetUrl: '',
  backlinkUrl: '',
  anchor: '',
  dateOrdered: new Date().toISOString(),
  vendor: '',
  orderStatus: '',
  contentLanguage: '',
  price: '',
  currency: '',
};
const AddBacklink = ({ setBacklink }) => {
  const classes = useStyles();

  const [openStatus, setOpenStatus] = useState(false);
  const [formValues, setFormValues] = useState(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/backlink/new', {
        ...formValues,
        price: parseFloat(formValues.price),
      })
      .then((res) => {
        setBacklink(res.data._id);
        setFormValues(initialFormState);
        handleClose(setOpenStatus);
      })
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setFormValues(() => ({
      ...formValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (e) => {
    setFormValues(() => ({
      ...formValues,
      dateOrdered: e.toISOString(),
    }));
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen(setOpenStatus)}
      >
        Add Backlink
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openStatus}
        onClose={() => handleClose(setOpenStatus)}
      >
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
                    name="orderStatus"
                    value={formValues.orderStatus}
                    onChange={handleInputChange}
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
            <Grid container justify="space-between">
              <Grid item xs>
                <TextField
                  margin="dense"
                  fullWidth
                  label="Price"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs>
                <FormControl className={classes.formControl} margin="dense">
                  <InputLabel>Currency</InputLabel>
                  <Select
                    name="currency"
                    value={formValues.currency}
                    onChange={handleInputChange}
                    input={<Input />}
                  >
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EURO (€)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => handleClose(setOpenStatus)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

AddBacklink.propTypes = {
  setBacklink: PropTypes.func.isRequired,
};

export default AddBacklink;
