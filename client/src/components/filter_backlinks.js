import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  Grid,
  Button,
  DialogActions,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  filterBackground: {
    padding: '0px 16px 0px 16px',
  },
}));

const FilterBacklinks = ({ setBacklink, filterValues, setFilterValues }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleStartDateChange = (e) => {
    setFilterValues({
      ...filterValues,
      startDate: e.toISOString(),
    });
  };

  const handleEndDateChange = (e) => {
    setFilterValues({
      ...filterValues,
      endDate: e.toISOString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBacklink(`${filterValues.startDate}|${filterValues.endDate}`);
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
            <>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper className={classes.filterBackground} elevation={8}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid item xs>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="dense"
                            id="date-picker-inline-start"
                            label="Start Date"
                            name="gte"
                            value={filterValues.startDate}
                            onChange={handleStartDateChange}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="dense"
                            id="date-picker-inline-end"
                            label="End Date"
                            name="lte"
                            minDate={new Date(filterValues.startDate)}
                            value={filterValues.endDate}
                            onChange={handleEndDateChange}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Button color="primary" onClick={() => setAnchorEl(null)}>
                        Cancel
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    </DialogActions>
                  </form>
                </Paper>
              </ClickAwayListener>
            </>
          </Grow>
        )}
      </Popper>
    </>
  );
};

FilterBacklinks.propTypes = {
  setBacklink: PropTypes.func.isRequired,
  setFilterValues: PropTypes.func.isRequired,
  filterValues: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FilterBacklinks;
