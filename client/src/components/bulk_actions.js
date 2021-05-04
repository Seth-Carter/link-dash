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

  const handleEdit = (e, inputArray) => {
    e.preventDefault();
    axios
      .post('/api/backlink/edit', {
        _idArray: inputArray,
        editProps: { orderStatus: e.target.dataset.action },
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
        <MenuItem
          data-action="started"
          onClick={(e) => handleEdit(e, selected)}
        >
          Set Started
        </MenuItem>
        <MenuItem
          data-action="pending"
          onClick={(e) => handleEdit(e, selected)}
        >
          Set Pending
        </MenuItem>
        <MenuItem
          data-action="reviewing"
          onClick={(e) => handleEdit(e, selected)}
        >
          Set Reviewing
        </MenuItem>
        <MenuItem
          data-action="complete"
          onClick={(e) => handleEdit(e, selected)}
        >
          Set Complete
        </MenuItem>
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
