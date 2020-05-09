import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

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

export default function RegisterGroup() {
  const classes = useStyles();
  const history = useHistory();
  const [grupoId, setGrupoId] = useState();

  function handleChange(value) {
    setGrupoId(value);
  }

  async function submit(form) {
    const response = await api.post('/grupos', form);

    try {
      if (response.data) {
        history.push('/');
      }
    } catch (error) {
      alert('Falha ao tentar realizar o cadastro');
    }
  }
  const initiValue = { name: '', email: '', city: '', uf: '', password: '' };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registro de Grupo
        </Typography>
        <Typography component="h1" variant="h4">
          SINGME
        </Typography>
        <Formik
          onSubmit={submit}
          initialValues={initiValue}
          render={(props) => (
            <Form
              onChange={() => console.log(props)}
              className={classes.form}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    id="name"
                    label="Nome do grupo"
                    name="name"
                    component={TextField}
                    onChange={props.handleChange}
                    value={props.values.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                    component={TextField}
                    onChange={props.handleChange}
                    value={props.values.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    fullWidth
                    id="city"
                    label="Cidade"
                    name="city"
                    component={TextField}
                    onChange={props.handleChange}
                    value={props.values.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    fullWidth
                    id="uf"
                    label="UF"
                    name="uf"
                    component={TextField}
                    onChange={props.handleChange}
                    value={props.values.uf}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    component={TextField}
                    autoComplete="current-password"
                    onChange={props.handleChange}
                    value={props.values.password}
                  />
                </Grid>
              </Grid>
              <Button
                onClick={props.handleSubmit}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Registrar
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
