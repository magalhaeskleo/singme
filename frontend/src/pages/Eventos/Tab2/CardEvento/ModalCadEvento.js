import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { Title, CalendarToday, LocationOn, Timer } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';

import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';

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
  paperSec: {
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
  paperTer: {
    minWidth: 300,
    borderRadius: 8,
    backgroundColor: 'rgba(252, 251, 250, 0.08)',
  },
  timePicker: {
    maxWidth: 115,
    marginLeft: 10,
  },
}));

const BR = 'DD/MM/YYYY';

function formatDateBR(date) {
  const unixParseDate = new Date(date);
  const formatMoment = moment(unixParseDate).format('DD/MM/YYYY');
  return moment(formatMoment, BR);
}

export default function ModalCadEvento({
  daySelected,
  event,
  onClose,
  onSubmit,
}) {
  function clear() {
    // setDate(moment());
    // setSoundCheckValue(moment().subtract(1.5, 'hours'));
    // setShowTimeValue(moment('01:30', 'HH:mm'));
    // setShowStartValue(moment());
  }

  function submit(form) {
    const date = form.date['_i'];
    const showstart = form.showstart['_i'];
    const soundcheck = form.soundcheck['_i'];
    const showtime = form.showtime['_i'];

    const formAlt = { ...form, date, showstart, soundcheck, showtime };

    onSubmit(formAlt);
  }

  const initialValues = {
    cardName: event ? event.name : 'Add Evento',
    name: event ? event.name : '',
    location: event ? event.location : '',

    date: event
      ? formatDateBR(event.date)
      : moment({
          ...moment(daySelected),
          _i: moment(daySelected).format('DD/MM/YYYY'),
          _f: 'DD/MM/YYYY',
        }),

    showstart: event
      ? moment(event.showstart, 'HH:mm')
      : moment({ ...moment(), _i: moment().format('HH:mm'), _f: 'HH:mm' }),

    soundcheck: event
      ? moment(event.soundcheck, 'HH:mm')
      : moment({
          ...moment().subtract(1.5, 'Hours'),
          _i: moment().subtract(1.5, 'Hours').format('HH:mm'),
          _f: 'HH:mm',
        }),

    showtime: event
      ? moment(event.showtime, 'HH:mm')
      : moment('01:30', 'HH:mm'),

    comments: event ? event.comments : '',
  };

  const classes = style();

  function change(value, setFieldValue, name) {
    const { _d, _f } = value;
    setFieldValue(name, { ...value, _i: moment(_d).format(_f) }, false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      render={(props) => (
        <Form>
          <DialogTitle id="nome-na-lista">
            <div className={classes.paperSec}>
              <div>{props.values.cardName}</div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.paperTer}>
              <Grid
                container
                direction="column"
                justify="space-between"
                style={{ minHeight: 250, maxWidth: 280, marginBottom: 20 }}
              >
                <Grid item>
                  <Grid container alignItems="flex-end" justify="center">
                    <Grid item>
                      <Title />
                    </Grid>
                    <Grid item xs>
                      <Field
                        id="name"
                        name="name"
                        component={TextField}
                        value={props.values.name}
                        onChange={props.handleChange}
                        placeholder="Descrição"
                        fullWidth
                        style={{ marginLeft: 10 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <LocationOn />
                    </Grid>
                    <Grid item xs>
                      <Field
                        id="location"
                        name="location"
                        component={TextField}
                        placeholder="Localização"
                        value={props.values.location}
                        onChange={props.handleChange}
                        fullWidth
                        style={{ marginLeft: 10 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <CalendarToday />
                    </Grid>
                    <Grid item>
                      <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        locale={'pt'}
                      >
                        <DatePicker
                          autoOk
                          label="Data"
                          ampm={false}
                          format={BR}
                          inputVariant="outlined"
                          value={props.values.date}
                          onChange={(e) =>
                            change(e, props.setFieldValue, 'date')
                          }
                          className={classes.timePicker}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item>
                      <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        locale={'pt'}
                      >
                        <TimePicker
                          autoOk
                          label="Início"
                          format={'HH:mm'}
                          ampm={false}
                          inputVariant="outlined"
                          value={props.values.showstart}
                          onChange={(e) =>
                            change(e, props.setFieldValue, 'showstart')
                          }
                          className={classes.timePicker}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Timer />
                    </Grid>
                    <Grid item>
                      <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        locale={'pt'}
                      >
                        <TimePicker
                          autoOk
                          label="Passagem"
                          ampm={false}
                          inputVariant="outlined"
                          value={props.values.soundcheck}
                          onChange={(e) =>
                            change(e, props.setFieldValue, 'soundcheck')
                          }
                          className={classes.timePicker}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item>
                      <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        locale={'pt'}
                      >
                        <TimePicker
                          autoOk
                          label="Show Time"
                          ampm={false}
                          inputVariant="outlined"
                          value={props.values.showtime}
                          onChange={(e) =>
                            change(e, props.setFieldValue, 'showtime')
                          }
                          className={classes.timePicker}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Field
                  id="comments"
                  name="comments"
                  multiline
                  component={TextField}
                  rows={2}
                  value={props.values.comments}
                  onChange={props.handleChange}
                  variant="outlined"
                  placeholder="Observações"
                  fullWidth
                />
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={onClose}>
              Retornar
            </Button>
            {!event && (
              <Button color="primary" onClick={clear}>
                Limpar
              </Button>
            )}
            <Button color="primary" onClick={props.handleSubmit}>
              {event ? 'Alterar' : 'Inserir'}
            </Button>
          </DialogActions>
        </Form>
      )}
    ></Formik>
  );
}
