import React from 'react';
import { Grid } from '@material-ui/core';
import Year from './Year';
import Month from './Month';
export default function Tab1() {
  return (
    <Grid
      container
      justify="space-between"
      direction="column"
      style={{ marginTop: -30 }}
    >
      <Grid item>
        <Grid container direction="row" justify="space-around">
          <Grid item>
            <Year />
          </Grid>
          <Grid item>
            <Month />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <div>Result</div>
      </Grid>
    </Grid>
  );
}
