import React, { useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import InputMask from 'react-input-mask';

import {
  TextField,
  Button,
  Link,
  makeStyles,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import database, { fb } from '../config/Fire';
import LoadingOverlay from './LoadingOverlay';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  textInputs: {
    margin: '10px',
  },
  link: {
    display: 'flex',
    justifyContent: 'flex-end',
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
    width: '100%',
    maxWidth: '550px',
    display: 'flex',
    justifyContent: 'center',
  },
});

const FormRegistration = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    fb.auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userData) => {
        fb.auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(() => {
            const { user } = userData;
            database
              .collection('users')
              .doc(user.uid)
              .set({
                name: data.name,
                phone: data.phone,
              })
              .then(() => {
                history.push(`/home`);
                toast.success('Cadastro realizado com sucesso!');
              })
              .catch((e) => toast.error(e.message));
          })
          .catch((e) => toast.error(e.message));
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  };
  const requiredField = { value: true, message: 'Campo obrigatório' };
  const errorFieldMessage = (propName) =>
    errors[propName] ? errors[propName].message : '';

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <h2>Cadastro</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={classes.textInputs}
              name="name"
              autoComplete="name"
              label="Nome Completo"
              variant="outlined"
              autoFocus
              error={!!errors.name}
              helperText={errorFieldMessage('name')}
              required
            />
            <div className={classes.divEmailPhone}>
              <TextField
                className={classes.textInputs}
                name="email"
                autoComplete="email"
                label="Email"
                variant="outlined"
                inputRef={register({
                  required: requiredField,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Email Inválido',
                  },
                })}
                error={!!errors.email}
                helperText={errorFieldMessage('email')}
                required
              />
              <InputMask mask="(99) 99999-9999">
                {() => (
                  <TextField
                    className={classes.textInputs}
                    name="phone"
                    autoComplete="tel-national"
                    label="Telefone"
                    type="text"
                    error={!!errors.phone}
                    inputRef={register({
                      pattern: {
                        value: /(\(\d{2}\)\s)(\d{4,5}\-\d{4})/,
                        message: 'Telefone Inválido',
                      },
                    })}
                    helperText={errorFieldMessage('phone')}
                    variant="outlined"
                  />
                )}
              </InputMask>
            </div>

            <div>
              <TextField
                className={classes.textInputs}
                name="password"
                type="password"
                autoComplete="new-password"
                label="Senha"
                variant="outlined"
                inputRef={register({
                  required: requiredField,
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? errorFieldMessage('password')
                    : 'Mínimo 6 caracteres'
                }
                required
              />
              <TextField
                className={classes.textInputs}
                name="confirmPass"
                type="password"
                label="Confirme sua senha"
                variant="outlined"
                error={!!errors.confirmPass}
                inputRef={register({
                  required: requiredField,
                  validate: (value) => value === watch('password'),
                })}
                helperText={
                  errors.confirmPass?.type === 'validate'
                    ? 'Senhas não Coincidem'
                    : errorFieldMessage('confirmPass')
                }
                required
              />
            </div>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Cadastrar
            </Button>
          </form>
          <Typography className={classes.link}>
            <Link component={RouterLink} to="/login">
              <span>Já Possui uma conta? Faça Login</span>
            </Link>
          </Typography>
        </CardContent>
      </Card>
      {loading && <LoadingOverlay />}
    </>
  );
};

export default FormRegistration;
