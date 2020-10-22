import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link as LinkStyled,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  textInputs: {
    margin: '10px 0',
  },
  link: {
    cursor: 'pointer',
  },
  button: {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    fontSize: '18px',
  },
  container: {
    display: 'flex',
    paddingTop: '5vh',
  },
  card: {
    padding: '5%',
    width: '100%',
  },
});

const FormLogin = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <h2>Login</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className={classes.textInputs}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            className={classes.textInputs}
            id="outlined-basic"
            type="password"
            label="Senha"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox checked />}
            label="Lembrar de mim"
          />
        </form>

        <Typography>
          <Link to="/registration">
            <LinkStyled className={classes.link} href>
              Cadastre-se
            </LinkStyled>
          </Link>
        </Typography>

        <Button className={classes.button} variant="contained" color="primary">
          Entrar
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormLogin;
