import React from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Link as LinkStyled,
  makeStyles,
  Card,
  CardContent,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  textInputs: {
    margin: '10px',
  },
  link: {
    cursor: 'default',
    display: 'flex',
    justifyContent: 'flex-end',
    '& span': {
      cursor: 'pointer',
    },
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    width: '100%',
    marginBottom: '10px',
    fontSize: '18px',
  },
  divEmailPhone: {
    display: 'flex',
    '& div:first-child': {
      flexBasis: '70%',
    },
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

const FormRegistration = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <h2>Cadastro</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            className={classes.textInputs}
            id="name"
            label="Nome Completo"
            variant="outlined"
            required
          />
          <div className={classes.divEmailPhone}>
            <TextField
              className={classes.textInputs}
              id="email"
              label="Email"
              variant="outlined"
              required
            />
            <TextField
              className={classes.textInputs}
              id="phone"
              label="Telefone"
              variant="outlined"
            />
          </div>

          <div>
            <TextField
              className={classes.textInputs}
              id="password"
              type="password"
              label="Senha"
              variant="outlined"
              required
            />
            <TextField
              className={classes.textInputs}
              id="confirm-pass"
              type="password"
              label="Confirme sua senha"
              variant="outlined"
              required
            />
          </div>
        </form>

        <Button className={classes.button} variant="contained" color="primary">
          Cadastrar
        </Button>

        <Typography>
          <Link to="/login">
            <LinkStyled className={classes.link} href>
              <span>Já Possui uma conta? Faça Login</span>
            </LinkStyled>
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FormRegistration;
