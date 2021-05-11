export const handleClickOpen = (setOpen) => {
  setOpen(true);
};

export const handleClose = (setOpen) => {
  setOpen(false);
};

export const handleInputChange = (e, state, stateSetter) => {
  stateSetter(() => ({
    ...state,
    [e.target.name]: e.target.value,
  }));
};

export const handleDateChange = (e, state, stateSetter) => {
  stateSetter(() => ({
    ...state,
    dateOrdered: e.toISOString(),
  }));
};
