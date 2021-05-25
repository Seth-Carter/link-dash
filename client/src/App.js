import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './components/navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#169c78',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </>
    </MuiThemeProvider>
  );
}

export default App;
