import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from '@material-ui/core';
import {
  handleClickOpen,
  handleClose,
  handleInputChange,
  handleDateChange,
} from '../utils/handlers/handlers';
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
  const [errors, setErrors] = useState({});

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
        setErrors({});
        handleClose(setOpenStatus);
      })
      .catch((err) => {
        const errorData = err.response.data.errors;
        const newErrors = {};
        Object.keys(errorData).forEach((key) => {
          newErrors[key] = errorData[key].message;
        });
        setErrors(newErrors);
      });
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
        errors={errors}
        setErrors={setErrors}
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
