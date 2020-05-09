import React, { useState } from 'react';
import SendWhatsapp from '../../Action/SendWhatsapp';
import SendEmail from '../../Action/SendEmail';

import {
  Paper,
  Typography,
  makeStyles,
  Grid,
  Toolbar,
  AppBar,
  IconButton,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Divider,
  Checkbox,
} from '@material-ui/core';
import BarStatus from '../../../Components/BarProgress';
import { Search } from '@material-ui/icons';
import AddEvents from '../../Action/AddEvents';
import EditarEvents from '../../Action/EditarEvents';
import ExcluirEvents from '../../Action/ExcluirEvents';
import moment from 'moment';

const constMonth = {
  '01': { BR: 'Janeiro', sigla: 'Jan', index: 1 },
  '02': { BR: 'Fevereiro', sigla: 'Fev', index: 2 },
  '03': { BR: 'Março', sigla: 'Mar', index: 3 },
  '04': { BR: 'Abril', sigla: 'Abr', index: 4 },
  '05': { BR: 'Maio', sigla: 'Mai', index: 5 },
  '06': { BR: 'Junho', sigla: 'Jun', index: 6 },
  '07': { BR: 'Julho', sigla: 'Jul', index: 7 },
  '08': { BR: 'Agosto', sigla: 'Ago', index: 8 },
  '09': { BR: 'Setembro', sigla: 'Set', index: 9 },
  '10': { BR: 'Outubro', sigla: 'Out', index: 10 },
  '11': { BR: 'Novembro', sigla: 'Nov', index: 11 },
  '12': { BR: 'Dezembro', sigla: 'Dez', index: 12 },
};

const styles = makeStyles((theme) => ({
  paper: {
    marginTop: 10,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
}));

function converte(letras) {
  const code = Buffer.from(letras, 'utf8');
  const color = code[0] + code[1] + code[2];
  return color;
}

export default function TableItem({ month, setReload }) {
  const classes = styles();
  const [sendRegister, setSendRegister] = useState([]);
  const paperName = constMonth[month.group.split('/')[0]];
  const [mes, ano] = month.group.split('/');

  function firstChar(name) {
    return name.toString().substring(0, 1).toUpperCase();
  }

  function handleClickSenRegister(id) {
    if (sendRegister.length == 0) {
      return setSendRegister([...sendRegister, id]);
    }
    if (sendRegister.includes(id)) {
      const newArray = sendRegister.filter((el) => el !== id);
      setSendRegister(newArray);
    } else {
      setSendRegister([...sendRegister, id]);
    }
  }

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography variant="subTitle1">{paperName.BR}</Typography>
            </Grid>

            <Grid item>
              <Search className={classes.block} color="inherit" />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                placeholder="Nome do evento"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
              <IconButton>
                <AddEvents
                  daySelected={moment(`${ano}/${mes}`)}
                  callbackAddEvent={(ok) => ok && setReload(true)}
                />
              </IconButton>
              <IconButton>
                <SendWhatsapp
                  disabled={sendRegister.length == 0}
                  sendRegister={sendRegister}
                />
              </IconButton>
              <IconButton>
                <SendEmail
                  disabled={sendRegister.length == 0}
                  sendRegister={sendRegister}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell>Dia</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {month &&
              month.list.map((row, index) => (
                <TableRow button key={index} hover>
                  <TableCell style={{ maxWidth: 80 }} variant="footer">
                    <div
                      container
                      style={{
                        display: 'flex',
                        direction: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: `#${converte(row.name)}`,
                          marginRight: 8,
                        }}
                      >
                        {firstChar(row.name)}
                      </Avatar>
                      {row.name}
                    </div>
                  </TableCell>

                  <TableCell variant="footer">{row.day}</TableCell>
                  <TableCell>
                    <BarStatus status={row.status} />
                  </TableCell>
                  <TableCell variant="footer" align="right">
                    <div
                      container
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox
                        onClick={() => handleClickSenRegister(row.id)}
                      />
                      <ExcluirEvents
                        event={row}
                        callbackExcluir={(ok) => ok && setReload(true)}
                      />
                      <EditarEvents
                        event={row}
                        callbackEditEvent={(ok) => ok && setReload(true)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider variant="middle" light />
    </Paper>
  );
}
