import { Box } from '@mui/material';
import './App.css'
import Header from './components/Header';
import Screens from './components/Screens';
import Footer from './components/Footer';

function App() {
  return (
    <Box display="flex" flexDirection="column">
      <Header />
      <Screens />
      <Footer />
    </Box>
  );
}

export default App;
