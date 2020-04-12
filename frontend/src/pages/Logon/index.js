import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, Button, Grid } from '@material-ui/core';
import api from '../../services/Api';
import { stylePage } from '../styles';

export default function Logon() {
  const classes = stylePage();
  const history = useHistory();
  const [grupoId, setGrupoId] = useState();

  function handleChange(value) {
    setGrupoId(value);
  }

  async function handleLogon() {
    const id = grupoId;
    const response = await api.post('/session', { id });

    try {
      if (response.data) {
        localStorage.setItem('grupo_id', grupoId);
        localStorage.setItem('grupo_name', response.data.name);
        history.push('/home');
      }
    } catch (error) {
      alert('Falha no login tente novamente');
    }
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ color: 'white' }}
      spacing={2}
    >
      <Grid item>
        <h1 className={classes.logo}>SINGME</h1>
      </Grid>
      <Grid item>
        <h2>Seja bem vindo!</h2>
      </Grid>

      <Grid container style={{ maxWidth: 500 }}>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            fullWidth
            id="name"
            variant="outlined"
            name="name"
            onChange={(e) => handleChange(e.target.value)}
            value={grupoId}
            size="small"
            placeholder="Nome"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            fullWidth
            id="email"
            variant="outlined"
            name="email"
            value="email"
            onChange={() => console.log('email')}
            size="small"
            placeholder="E-mail"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleLogon}
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
          >
            Entrar
          </Button>
        </Grid>
      </Grid>

      <Link to="/register" className={classes.link}>
        Ainda não tem cadastro? Clique aqui.
      </Link>
    </Grid>
  );
}
