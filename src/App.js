import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import CoinPage from './pages/CoinPage';
import Homepage from './pages/Homepage';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#282c34",
    color: "white",
    minHeight: "100vh"
  },
}));
function App() {

  const classes = useStyles()
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
