import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Typography,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { handleInputChange } from '../utils/handlers/handlers';

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
  focusedInput: {
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: theme.palette.text.disabled,
    },
    '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

const initialLoginValues = {
  email: '',
  password: '',
  showPassword: false,
};

const Login = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [loginValues, setLoginValues] = useState(initialLoginValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    axios
      .post('/api/user/login', {
        email: loginValues.email,
        password: loginValues.password,
      })
      .then((res) => {
        sessionStorage.setItem('linkDashToken', res.headers.authorization);
        window.location.href = '/';
      })
      .catch((err) => {
        const loginErrors = {};
        loginErrors.error = err.response.data;
        setErrors(loginErrors);
      });
  };

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
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                error={Boolean(errors.error)}
                required
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={loginValues.email}
                className={classes.focusedInput}
                onChange={(e) =>
                  handleInputChange(e, loginValues, setLoginValues)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                helperText={errors.error}
                error={Boolean(errors.error)}
                required
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type={loginValues.showPassword ? 'text' : 'password'}
                value={loginValues.password}
                className={classes.focusedInput}
                onChange={(e) =>
                  handleInputChange(e, loginValues, setLoginValues)
                }
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
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
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
