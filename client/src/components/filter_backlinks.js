import React, { useState } from 'react';
import {
  IconButton,
  Popper,
  Grow,
  TextField,
  ClickAwayListener,
  Paper,
  Grid,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(() => ({
  filterBackground: {
    padding: '0px 16px 0px 16px',
  },
}));

const autocompleteOptions = [
  { title: 'Target URL', name: 'targetUrl' },
  { title: 'Backlink URL', name: 'backlinkUrl' },
  { title: 'Anchor', name: 'anchor' },
  { title: 'Vendor', name: 'vendor' },
  { title: 'Date Ordered', name: 'dateOrdered' },
  { title: 'Order Status', name: 'orderStatus' },
  { title: 'Language', name: 'language' },
  { title: 'Price', name: 'price' },
];

const FilterBacklinks = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <Grow
            in={TransitionProps.in}
            onEnter={TransitionProps.onEnter}
            onExited={TransitionProps.onExited}
            timeout={350}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Paper className={classes.filterBackground} elevation={8}>
                <form>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Autocomplete
                        options={autocompleteOptions}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField {...params} margin="dense" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="Test" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField label="Test" />
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default FilterBacklinks;
