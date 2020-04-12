import React from 'react';

import { Grid, Typography, IconButton } from '@material-ui/core';

import EditarNome from './EditarNome';
import DeletarNome from './DeletarNome';

export default function ListaNomes({
  register,
  callbackEditarNome,
  callbackExcluir,
}) {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ maxHeight: 25 }}
    >
      <Grid item>
        <Typography variant="body2" align="center">
          {register.name}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            <EditarNome
              register={register}
              callbackEditarNome={callbackEditarNome}
            />
          </Grid>
          <Grid item>
            <DeletarNome
              register={register}
              callbackExcluir={callbackExcluir}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
