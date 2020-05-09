import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import { useState } from 'react';
import moment from 'moment';

const styles = (theme) => ({
  iconColor: {
    color: '#646464',
  },
  itemActiveItem: {
    color: '#006db3',
  },
});

export default function PaginationDate({ callbackPagination }) {
  const classes = styles();
  const now = Number(moment().format('YYYY'));
  const [date, setDate] = useState(now);
  const [dateSelected, setDateSelectd] = useState(now);

  function handleClick(year) {
    setDate(Number(year));
    setDateSelectd(Number(year));
    callbackPagination(Number(year));
  }

  function handleBefore() {
    const newYear = date - 1;
    setDate(newYear);
  }
  function handleNext() {
    const newYear = date + 1;
    setDate(newYear);
  }

  return (
    <Grid container>
      <Grid item>
        <IconButton onClick={() => handleBefore()}>
          <NavigateBefore />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton value={date - 1} onClick={() => handleClick(date - 1)}>
          {date - 1}
        </IconButton>
        <IconButton
          style={
            dateSelected === date ? classes.itemActiveItem : classes.iconColor
          }
          value={date}
          onClick={() => handleClick(date)}
        >
          {date}
        </IconButton>
        <IconButton value={date + 1} onClick={() => handleClick(date + 1)}>
          {date + 1}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={() => handleNext()}>
          <NavigateNext />
        </IconButton>
      </Grid>
    </Grid>
  );
}
