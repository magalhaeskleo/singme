import React, { useState } from 'react';
import moment from 'moment';

import { Grid } from '@material-ui/core';

import CardLista from './CardLista/CardLista';
import CardEventos from './CardEvento/CardEventos';
import Semana from './CardSemana/Semana';

export default function Eventos() {
  const now = moment();
  const [daySelected, setDaySelected] = useState(now);
  const [eventSelected, setEventsSelected] = useState();

  function callbackDate(callbackDate) {
    setDaySelected(callbackDate);
    setEventsSelected();
  }

  function callbackHandleEvento(evento) {
    setEventsSelected(evento);
  }

  return (
    <Grid container justify="space-between" style={{ marginTop: -30 }}>
      <Grid item>
        <Semana callbackDate={callbackDate} />
      </Grid>
      <Grid item>
        <CardEventos
          daySelected={daySelected}
          callbackHandleEvento={callbackHandleEvento}
        />
      </Grid>
      <Grid item>
        <CardLista event={eventSelected} />
      </Grid>
    </Grid>
  );
}
