import React, { useState } from 'react';
import Graphic from './Graphic';

import {
  Paper,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import PaginationDate from '../../../Components/PaginationDate';

const styles = (theme) => ({
  paper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  iconColor: {
    color: '#646464',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  itemActivit: {
    color: 'blue',
  },
});

function Dashboard(props) {
  const { classes, callbackPagination, listGraphic } = props;
  let total = 0;

  const dataSet = listGraphic.map((el) => el.list.length);

  if (dataSet.length > 0) {
    total = dataSet.reduce((acc, cur) => {
      return acc + cur;
    });
  }

  return (
    <Paper className={classes.paper}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar align="center">
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" className={classes.iconColor}>
                Shows
              </Typography>
            </Grid>
            <Grid item>
              <PaginationDate callbackPagination={callbackPagination} />
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.iconColor}>
                Total : {total}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={11}>
            <Graphic
              type="Bar"
              title="Mêses"
              legend="Agendados"
              labelsList={[
                '',
                'Jan',
                'Fev ',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez',
                '',
              ]}
              dataList={[0, ...dataSet, 0]}
              backgroundColorslist={'rgba(151, 187, 193, 0.8)'}
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
