import React, { useEffect, useState } from 'react';
import { Event } from '@material-ui/icons';
import api from '../../../../services/Api';
import moment from 'moment';
import AddEvents from '../../Action/AddEvents';
import Evento from './Evento';
import AlertSuccess from '../../../Components/AlertSuccess';
import LoadingPage from '../../../Components/LoadingPage';

import {
  makeStyles,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  Dialog,
} from '@material-ui/core';

const style = makeStyles((theme) => ({
  paperSecundy: {
    minWidth: 365,
    maxWidth: 365,
    minHeight: 390,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    backgroundColor: 'white',
  },
  paperTerc: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '100%',
    height: 80,
    borderRadius: 5,
    marginTop: -30,
    backgroundColor: '#d1b036',
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  list: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  typographyColor: {
    color: 'silver',
  },
  colorTextList: {
    color: '#55585c',
  },
}));

function formatDateDay(value) {
  const [date, dayName, dayNumber, monthName] = moment(value)
    .format('DD/MM/YYYY dddd DD MMMM')
    .split(' ');
  return { date, dayName, dayNumber, monthName };
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default function CardEventos({ daySelected, callbackHandleEvento }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [eventsDay, setEventsDay] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function callbackExcluir(status) {
    if (status) {
      setOpenAlert(true);
      getEventsDay();
    }
  }

  function callbackAddEvent(status) {
    if (status) {
      setOpenAlert(true);
      getEventsDay();
    }
  }

  function callbackEditEvent(status) {
    setOpenAlert(true);
    if (status) {
      getEventsDay();
    }
  }

  function getCardName() {
    const { dayName, dayNumber, monthName } = formatDateDay(daySelected);
    return `${dayName}, ${dayNumber} de ${monthName}`;
  }

  useEffect(() => {
    getEventsDay();
  }, [daySelected]);

  async function getEventsDay() {
    setLoading(true);
    await sleep(500);
    const { date } = formatDateDay(daySelected);
    const grupo_id = localStorage.getItem('grupo_id');
    const eventos = await api.post(
      '/eventos/day',
      { date },
      {
        headers: {
          Authorization: grupo_id,
        },
      }
    );

    if (eventos.data) {
      setEventsDay(eventos.data);
    }
    setLoading(false);
  }
  const classes = style();
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item>
        <div className={classes.paperSecundy}>
          <Grid container justify="space-between">
            <Grid item xs={4}>
              <div className={classes.paperTerc}>
                <Event fontSize="large" />
              </div>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    className={classes.typographyColor}
                    variant="body2"
                  >
                    {getCardName()}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography className={classes.typographyColor} variant="h5">
                    {eventsDay.length}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <AddEvents
                daySelected={daySelected}
                callbackAddEvent={callbackAddEvent}
              />
            </Grid>
          </Grid>

          <div>
            <Divider className={classes.divider} />
            <List className={classes.list}>
              {isLoading ? (
                <LoadingPage />
              ) : (
                eventsDay.map((el, index) => (
                  <div key={index}>
                    <ListItem button className={classes.colorTextList}>
                      <Evento
                        event={el}
                        callbackExcluir={callbackExcluir}
                        callbackHandleEvento={callbackHandleEvento}
                        callbackEditEvent={callbackEditEvent}
                      />
                    </ListItem>
                    <Divider variant="middle" />
                  </div>
                ))
              )}
            </List>
          </div>
        </div>
      </Grid>

      <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <AlertSuccess />
      </Dialog>
    </Grid>
  );
}
