import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';
import PropTypes from 'prop-types';

const BulkActions = ({ selected, setSelected, setBacklink }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e, inputArray) => {
    e.preventDefault();
    axios
      .post('/api/backlink/delete', {
        _idArray: inputArray,
      })
      .then((res) => {
        setBacklink(res.data);
        setSelected([]);
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => handleDelete(e, selected)}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Set Started</MenuItem>
        <MenuItem onClick={handleClose}>Set Pending</MenuItem>
        <MenuItem onClick={handleClose}>Set Reviewing</MenuItem>
        <MenuItem onClick={handleClose}>Set Complete</MenuItem>
      </Menu>
    </>
  );
};

BulkActions.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelected: PropTypes.func.isRequired,
  setBacklink: PropTypes.func.isRequired,
};

export default BulkActions;
