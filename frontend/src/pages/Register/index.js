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
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 20,
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [grupoId, setGrupoId] = useState();

  function handleChange(value) {
    setGrupoId(value);
  }

  async function handleLogon() {
    const id = grupoId;
    const response = await api.post('/users', { id });

    try {
      if (response.data) {
        // localStorage.setItem('grupo_id', grupoId);
        // localStorage.setItem('grupo_name', response.data.name);
        history.push('/');
      }
    } catch (error) {
      alert('Falha no login tente novamente');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Cadastra-se
        </Typography>
        <Typography component="h1" variant="h4">
          SINGME
        </Typography>
        <Formik
          render={(props) => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="tokenEmpresa"
                    label="Token empresa"
                    name="tokenEmpresa"
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
                alignItems="flex-start"
                direction="column"
              >
                <Grid item>
                  <Link to="/">Retornar</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        />
      </div>
    </Container>
  );
}
