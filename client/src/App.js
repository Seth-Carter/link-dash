import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/home';
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
        <Navbar />
        <Home />
      </>
    </MuiThemeProvider>
  );
}

export default App;
