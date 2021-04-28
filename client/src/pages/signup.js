import { Grid, Typography, TextField } from '@material-ui/core';

const Signup = () => (
  <Grid container>
    <Grid item sm />
    <Grid item sm>
      <Typography component="h1">Sign Up</Typography>
      <form noValidate>
        <TextField fullWidth id="name" name="name" type="name" label="Name" />
        <TextField
          fullWidth
          id="email"
          name="email"
          type="email"
          label="Email"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Password"
        />
      </form>
    </Grid>
    <Grid item sm />
  </Grid>
);

export default Signup;
