import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import {
  handleClickOpen,
  handleInputChange,
  handleDateChange,
} from '../utils/handlers/click_handlers';
import BacklinkForm from './backlink-form';

const EditBacklink = ({ data, setBacklink }) => {
  const dataHandler = (rowData) => ({
    targetUrl: rowData.targetUrl,
    backlinkUrl: rowData.backlinkUrl,
    anchor: rowData.anchor,
    dateOrdered: rowData.dateOrdered,
    vendor: rowData.vendor,
    orderStatus: rowData.orderStatus,
    contentLanguage: rowData.contentLanguage,
    price: rowData.price.$numberDecimal,
    currency: rowData.currency,
  });

  const [openStatus, setOpenStatus] = useState(false);
  const [formValues, setFormValues] = useState(() => dataHandler(data));

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/backlink/edit', {
        _idArray: [data._id],
        editProps: { ...formValues, price: parseFloat(formValues.price) },
      })
      .then((res) => {
        setBacklink(res.data);
        setOpenStatus(false);
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
        <EditIcon />
      </IconButton>
      <BacklinkForm
        _id={data._id}
        formTitle="Edit Backlink"
        formDescription="Fill out the following fields to edit an existing backlink."
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

EditBacklink.propTypes = {
  data: PropTypes.shape({
    vendor: PropTypes.string,
    _id: PropTypes.string,
    price: PropTypes.objectOf(PropTypes.string),
    targetUrl: PropTypes.string,
    backlinkUrl: PropTypes.string,
    anchor: PropTypes.string,
    dateOrdered: PropTypes.string,
    orderStatus: PropTypes.string,
    contentLanguage: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
  setBacklink: PropTypes.func.isRequired,
};

export default EditBacklink;
