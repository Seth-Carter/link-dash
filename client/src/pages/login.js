import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

const initialLoginValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const useStyles = makeStyles((theme) => ({
  centerForm: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyles: {
    maxHeight: '350px',
    minWidth: '400px',
    padding: '12px 12px 12px 12px',
    '& div': {
      paddingBottom: '8px',
    },
    '& form': {
      paddingTop: '8px',
    },
    '& hr': {
      width: '40%',
      color: theme.palette.text.divider,
      marginTop: '12px',
      marginBottom: '12px',
    },
  },
  spacer: {
    height: '4px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [loginValues, setLoginValues] = useState(initialLoginValues);

  return (
    <>
      <div className={classes.spacer} />
      <div className={classes.centerForm}>
        <Paper elevation={4} className={classes.containerStyles}>
          <div>
            <Typography align="center" gutterBottom variant="h4" component="h1">
              Login
            </Typography>
          </div>
          <form>
            <div>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={loginValues.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                value={loginValues.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <Button fullWidth color="primary" variant="contained">
                Submit
              </Button>
            </div>
          </form>
          <hr />
          <Typography align="center" gutterBottom>
            Don&rsquo;t have an account? Create one here!
          </Typography>
        </Paper>
      </div>
    </>
  );
};

export default Login;
