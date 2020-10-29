import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link as RouterLink } from 'react-router-dom';

import {
  Card,
  CardContent,
  TextField,
  Button,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import LoadingOverlay from './LoadingOverlay';
import { fb } from '../config/Fire';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  textInputs: {
    margin: '10px 0',
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
    width: '550px',
    padding: '1%',
  },
});

const FormLogin = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setError, errors } = useForm();
  const errorFieldMessage = (propName) =>
    errors[propName] ? errors[propName].message : '';
  const onSubmit = (data) => {
    setLoading(true);
    fb.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => history.push(`/home`))
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          setError('email', {
            type: 'manual',
            message: 'Usuário não encontrado',
          });
        } else if (err.code === 'auth/wrong-password') {
          setError('password', {
            type: 'manual',
            message: 'Senha incorreta',
          });
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <h2>Login</h2>
          <form
            id="form-login"
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={classes.textInputs}
              name="email"
              inputRef={register({
                required: { value: true, message: 'Email inválido' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email Inválido',
                },
              })}
              error={!!errors.email}
              helperText={errorFieldMessage('email')}
              label="Email"
              variant="outlined"
            />
            <TextField
              className={classes.textInputs}
              name="password"
              inputRef={register({
                required: { value: true, message: 'Senha Inválida' },
              })}
              error={errors.password}
              helperText={errorFieldMessage('password')}
              type="password"
              label="Senha"
              variant="outlined"
            />
          </form>
          <Typography>
            <Link component={RouterLink} to="/registration">
              Não possui uma conta? Cadastre-se aqui
            </Link>
          </Typography>

          <Button
            type="submit"
            form="form-login"
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
        </CardContent>
      </Card>
      {loading && <LoadingOverlay />}
    </>
  );
};

export default FormLogin;
