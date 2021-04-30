import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const BulkActions = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>Delete All</MenuItem>
        <MenuItem onClick={handleClose}>Set Started</MenuItem>
        <MenuItem onClick={handleClose}>Set Pending</MenuItem>
        <MenuItem onClick={handleClose}>Set Reviewing</MenuItem>
        <MenuItem onClick={handleClose}>Set Complete</MenuItem>
      </Menu>
    </>
  );
};

export default BulkActions;
