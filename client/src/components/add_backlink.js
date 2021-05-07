import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from '@material-ui/core';
import {
  handleClickOpen,
  handleClose,
  handleInputChange,
  handleDateChange,
} from '../utils/handlers/click_handlers';
import BacklinkForm from './backlink_form';

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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen(setOpenStatus)}
      >
        Add Backlink
      </Button>
      <BacklinkForm
        formTitle="Add Backlink"
        formDescription="Fill out the following fields to add a new backlink."
        formValues={formValues}
        setFormValues={setFormValues}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

AddBacklink.propTypes = {
  setBacklink: PropTypes.func.isRequired,
};

export default AddBacklink;
