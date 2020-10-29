import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ScopedCssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import FormLogin from './components/FormLogin';
import FormRegistration from './components/FormRegistration';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { fb } from './config/Fire';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    paddingTop: '5vh',
    justifyContent: 'center',
    '@media (max-width:600px)': {
      // eslint-disable-line no-useless-computed-key
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <ScopedCssBaseline>
        <div className={classes.container}>
          <AuthProvider>
            <Router>
              <Redirect exact from="/" to="/login" />
              <Route exact path="/login" component={FormLogin} />
              <Route exact path="/registration" component={FormRegistration} />
              {/* <Route exact path="/home" component={Home} /> */}
              <PrivateRoute exact path="/home" component={Home} />
            </Router>
          </AuthProvider>
        </div>
      </ScopedCssBaseline>
      <ToastContainer />
    </>
  );
}

export default App;
