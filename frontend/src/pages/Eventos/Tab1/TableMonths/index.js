import React, { useState } from 'react';
import TableItem from './Table';
import api from '../../../../services/Api';
import { useEffect } from 'react';
import moment from 'moment';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import LoadingPage from '../../../Components/LoadingPage';

const styles = makeStyles((theme) => ({
  paper: {
    marginTop: 10,
    margin: 'auto',
    overflow: 'hidden',
    height: 500,
  },
}));

function dateFormat(date) {
  const dataParse = new Date(date);
  return moment(dataParse).format('MM/YYYY');
}

function dayFormat(date) {
  const dataParse = new Date(date);
  return moment(dataParse).format('DD');
}

function createData(event, group, day, status) {
  return { ...event, group, day, status };
}
function createMonth(group, list) {
  return { group, list };
}

async function formatListEvents(dataGet) {
  let listYear = [];

  if (dataGet.length == 1) {
    return (listYear = [
      createMonth(dateFormat(dataGet[0].date), [
        createData(
          dataGet[0],
          dateFormat(dataGet[0].date),
          dayFormat(dataGet[0].date),
          'Agendado'
        ),
      ]),
    ]);
  }

  listYear = await dataGet.reduce((acc, current, index) => {
    const currentItem = {
      ...current,
      group: dateFormat(current.date),
      day: dayFormat(current.date),
    };

    if (index == 1) {
      acc = [
        createMonth(dateFormat(acc.date), [
          createData(
            acc,
            dateFormat(acc.date),
            dayFormat(acc.date),
            'Agendado'
          ),
        ]),
      ];
    }

    if (!!acc.filter((el) => el.group === currentItem.group).length) {
      const newArray = acc;
      const dataSelect = newArray.find((el) => el.group === currentItem.group);
      const arrayAccSemOElemento = acc.filter(
        (el) => el.group !== currentItem.group
      );

      return [
        ...arrayAccSemOElemento,
        createMonth(dataSelect.group, [
          ...dataSelect.list,
          createData(
            currentItem,
            currentItem.date,
            currentItem.day,
            'Agendado'
          ),
        ]),
      ];
    } else {
      return [
        ...acc,
        createMonth(currentItem.group, [
          createData(
            currentItem,
            currentItem.date,
            currentItem.day,
            'Agendado'
          ),
        ]),
      ];
    }
  });

  return listYear;
}

const sleep = () => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export default function TableList({ year, listForYear }) {
  const classes = styles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  async function getListEventos() {
    setLoading(true);

    const grupo_id = localStorage.getItem('grupo_id');
    try {
      const res = await api.get(`/eventos/${year}`, {
        headers: {
          authorization: grupo_id,
        },
      });
      if (res.data.length > 0) {
        const listFormat = await formatListEvents(res.data);
        setData(listFormat);
        listForYear(listFormat);
      } else {
        listForYear([]);
        setData([]);
      }
    } catch (error) {
      console.log('Não há registros', error);
    }
    await sleep();
    setLoading(false);
  }

  useEffect(() => {
    getListEventos();
    setReload(false);
  }, [reload, year]);

  return (
    <div>
      {loading && data.length < 0 && <LoadingPage />}

      {data.length > 0 ? (
        data.map((list, index) => (
          <TableItem month={list} key={index} setReload={setReload} />
        ))
      ) : (
        <Paper className={classes.paper}>
          <Typography align="center" variant="subtitle1">
            Não ha registros para os parametros informados
          </Typography>
        </Paper>
      )}
    </div>
  );
}
