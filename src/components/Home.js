import React from 'react';
import { Button } from '@material-ui/core';
import { fb } from '../config/Fire';

const Home = () => {
  return (
    <div>
      <h3>Você está logado</h3>
      <Button
        onClick={() => fb.auth().signOut()}
        variant="contained"
        color="primary"
      >
        Deslogar
      </Button>
    </div>
  );
};

export default Home;
