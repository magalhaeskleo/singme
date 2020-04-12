import React, { useState } from 'react';
import { Add, Face, WhatsApp, Fingerprint } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';

import {
  makeStyles,
  Grid,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

const style = makeStyles((theme) => ({
  paperSecundy: {
    minWidth: 300,
    borderRadius: 8,
    backgroundColor: 'rgba(252, 251, 250, 0.08)',
  },
  paperTerc: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginTop: -30,
    backgroundColor: theme.palette.primary.main,
  },
  gridContainer: {
    minHeight: 250,
    maxWidth: 280,
    marginBottom: 20,
  },
  marginField: {
    marginLeft: 10,
  },
}));

export default function ModalCadNome({ onClose, onSubmit, register }) {
  const classes = style();

  const initValue = {
    name: register ? register.name : '',
    whatsapp: register ? register.whatsapp : '',
    identification: register ? register.identification : '',
  };

  return (
    <Formik
      initialValues={initValue}
      onSubmit={onSubmit}
      render={({ values, handleChange, handleSubmit }) => (
        <Form>
          <DialogTitle id="nome-na-lista">
            <div className={classes.paperTerc}>
              <div>{register ? register.name : 'Add Nome'}</div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.paperSecundy}>
              <Grid
                container
                direction="column"
                justify="space-around"
                className={classes.gridContainer}
              >
                <Grid item>
                  <Grid container alignItems="flex-end" justify="center">
                    <Grid item>
                      <Face />
                    </Grid>
                    <Grid item xs>
                      <Field
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Nome"
                        component={TextField}
                        fullWidth
                        className={classes.marginField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <WhatsApp />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        id="whatsapp"
                        placeholder="Whatsapp"
                        name="whatsapp"
                        value={values.whatsapp}
                        onChange={handleChange}
                        fullWidth
                        className={classes.marginField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <Fingerprint />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        id="fingerprint"
                        placeholder="Identificador"
                        name="identification"
                        value={values.identification}
                        onChange={handleChange}
                        fullWidth
                        className={classes.marginField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={onClose}>
              Retornar
            </Button>

            <Button color="primary" onClick={handleSubmit}>
              {register ? 'Alterar' : 'Inserir'}
            </Button>
          </DialogActions>
        </Form>
      )}
    ></Formik>
  );
}
