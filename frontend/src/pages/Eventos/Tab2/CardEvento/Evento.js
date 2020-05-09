import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import EditarEvents from '../../Action/EditarEvents';
import ExcluirEvents from '../../Action/ExcluirEvents';

export default function Evento({
  event,
  callbackHandleEvento,
  callbackExcluir,
  callbackEditEvent,
}) {
  const firstChar = event.name.toString().substring(0, 1).toUpperCase();

  function converte(letras) {
    const code = Buffer.from(letras, 'utf8');
    const color = code[0] + code[1] + code[2];
    return color;
  }

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <Avatar
          style={{
            backgroundColor: `#${converte(event.name)}`,
          }}
        >
          {firstChar}
        </Avatar>
      </Grid>
      <Grid
        item
        onClick={() => callbackHandleEvento(event)}
        xs
        style={{ marginLeft: 15 }}
      >
        <Grid container direction="column">
          <Grid item>
            <Typography variant="subtitle2">{event.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Show inicio:23:00</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        {event && (
          <EditarEvents event={event} callbackEditEvent={callbackEditEvent} />
        )}
      </Grid>
      <Grid item>
        {event && (
          <ExcluirEvents event={event} callbackExcluir={callbackExcluir} />
        )}
      </Grid>
    </Grid>
  );
}
