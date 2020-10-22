import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import ScopedCssBaseline from '@material-ui/core/CssBaseline';
import { Container, makeStyles } from '@material-ui/core';
import FormLogin from './components/FormLogin';
import FormRegistration from './components/FormRegistration';
import Home from './components/Home';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    paddingTop: '5vh',
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <ScopedCssBaseline>
        <Container className={classes.container} maxWidth="sm">
          <Router>
            <Switch>
              <Redirect exact from="/" to="/login" />
              <Route path="/login" component={FormLogin} />
              <Route path="/registration" component={FormRegistration} />
              <Route path="/home" component={Home} />
            </Switch>
          </Router>
        </Container>
      </ScopedCssBaseline>
    </>
  );
}

export default App;
