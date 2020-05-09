import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import Dashboard from './Dashboard';
import TableList from './TableMonths';
import moment from 'moment';

export default function Tab1() {
  const dateNow = moment().format('YYYY');
  const [year, setYear] = useState(dateNow);
  const [listGraphic, setListGraphic] = useState([]);

  function callbackPagination(year) {
    setYear(year);
  }
  function listForYear(list) {
    setListGraphic(list);
  }

  return (
    <Grid
      container
      justify="space-between"
      direction="column"
      style={{ marginTop: -30 }}
    >
      <Grid item>
        <Dashboard
          callbackPagination={callbackPagination}
          listGraphic={listGraphic}
        />
      </Grid>

      <Grid item>
        <TableList year={year} listForYear={listForYear} />
      </Grid>
    </Grid>
  );
}
