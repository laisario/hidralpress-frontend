import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 20, 
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1.5rem',
    },
    body2: {
      fontSize: '1.25rem',
    },
    button: {
      fontSize: '1.5rem',
    },
  },
  palette: {
    background: {
      default: '#C4C1C1',
    },
    primary: {
      main: '#003366',
    },
    secondary: {
      main: '#03A9F4',
    },
    success: {
      main: '#4CAF50',
    },
    camera: {
      main: "#ffffff"
    },
    text: {
      primary: '#757575',
      secondary: '#424242',
    },
  },
});

export default theme;