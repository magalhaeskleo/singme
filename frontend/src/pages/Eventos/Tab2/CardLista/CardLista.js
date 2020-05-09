import React, { useEffect, useState } from 'react';
import { People } from '@material-ui/icons';
import { Dialog } from '@material-ui/core';
import api from '../../../../services/Api';
import ListaNomes from './ListaNomes';
import AddNome from './AddNome';
import LoadingPage from '../../../Components/LoadingPage';
import AlertSuccess from '../../../Components/AlertSuccess';

import {
  makeStyles,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
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
    backgroundColor: '#a84632',
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

const sleep = () => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export default function CardLista({ event }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = style();

  useEffect(() => {
    if (event) {
      getNamesForTheEvent();
    } else {
      setNames([]);
    }
  }, [event]);

  function callbackAddNome(status) {
    if (status) {
      setOpenAlert(true);
      getNamesForTheEvent();
    }
  }

  function callbackEditarNome(status) {
    if (status) {
      setOpenAlert(true);
      getNamesForTheEvent();
    }
  }

  function callbackExcluir(status) {
    if (status) {
      setOpenAlert(true);
      getNamesForTheEvent();
    }
  }

  async function getNamesForTheEvent() {
    setLoading(true);
    await sleep();
    const grupo_id = localStorage.getItem('grupo_id');

    const nameList = await api.get(`/listas/${event.id}`, {
      headers: {
        Authorization: grupo_id,
      },
    });

    if (nameList.data) {
      setNames(nameList.data);
    }
    setLoading(false);
  }

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
                <People fontSize="large" />
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
                    {event ? event.name : 'Selecione um evento'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.typographyColor} variant="h5">
                    {names.length}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              {event && (
                <AddNome event={event} callbackAddNome={callbackAddNome} />
              )}
            </Grid>
          </Grid>

          <div>
            <Divider className={classes.divider} />
            <List className={classes.list}>
              {loading ? (
                <LoadingPage />
              ) : (
                names.map((el, index) => (
                  <div key={index}>
                    <ListItem button className={classes.colorTextList}>
                      <ListaNomes
                        register={el}
                        callbackEditarNome={callbackEditarNome}
                        callbackExcluir={callbackExcluir}
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
