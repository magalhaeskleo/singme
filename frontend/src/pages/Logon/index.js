import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import {
  TextField,
  Button,
  Grid,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';

import api from '../../services/Api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 20,
  },
}));

export default function Logon() {
  const classes = useStyles();
  const history = useHistory();

  function handleChange(value) {
    // setGrupoId(value);
  }

  async function submit(form) {
    console.log(form);

    const id = '33c58268615a19e3';
    const response = await api.post('/session', { id });

    try {
      if (response.data) {
        localStorage.setItem('grupo_id', id);
        //  localStorage.setItem('grupo_name', response.data.name);
        history.push('/home');
      }
    } catch (error) {
      alert('Falha no login tente novamente');
    }
  }

  const init = { email: '', password: '' };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Seja bem Vindo!
        </Typography>
        <Typography component="h1" variant="h4">
          SINGME
        </Typography>
        <Formik
          initialValues={init}
          onSubmit={submit}
          render={(props) => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                    onChange={props.handleChange}
                    value={props.values.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={props.handleChange}
                    value={props.values.name}
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid
                container
                justify="space-between"
                alignItems="flex-end"
                direction="column"
              >
                <Grid item>
                  <Link to="/forgot">Esqueceu a senha?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register">Ainda não tem cadastro?</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </div>
    </Container>
  );
}
