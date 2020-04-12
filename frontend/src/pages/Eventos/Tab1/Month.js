import React from 'react';
import {
  CardActionArea,
  Card,
  makeStyles,
  CardHeader,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyItems: 'center',

    maxWidth: 420,
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
      width: theme.spacing(12),
      height: theme.spacing(11),
    },
  },
}));

export default function Month() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Card style={{ backgroundColor: '#198536' }}>
          <CardActionArea>
            <CardHeader title="34" subheader="Janeiro" />
          </CardActionArea>
        </Card>
        <Card style={{ backgroundColor: '#440d63' }}>
          <CardHeader title="22" subheader="Fevereiro" />
        </Card>
        <Card style={{ backgroundColor: '#910f0f' }}>
          <CardHeader title="26" subheader="Março" />
        </Card>
        <Card style={{ backgroundColor: '#bfbd2e' }}>
          <CardHeader title="12" subheader="Abril" />
        </Card>
        <Card style={{ backgroundColor: '#753940' }}>
          <CardHeader title="7" subheader="Maio" />
        </Card>
        <Card style={{ backgroundColor: '#434343' }}>
          <CardHeader title="10" subheader="Junho" />
        </Card>

        <Card style={{ backgroundColor: '#878787' }}>
          <CardActionArea>
            <CardHeader title="34" subheader="Julho" />
          </CardActionArea>
        </Card>
        <Card style={{ backgroundColor: '#232323' }}>
          <CardHeader title="22" subheader="Agosto" />
        </Card>
        <Card style={{ backgroundColor: '#2586b0' }}>
          <CardHeader title="26" subheader="Setembro" />
        </Card>
        <Card style={{ backgroundColor: '#bf1f7c' }}>
          <CardHeader title="12" subheader="Outubro" />
        </Card>
        <Card style={{ backgroundColor: '#843246' }}>
          <CardHeader title="7" subheader="Novembro" />
        </Card>
        <Card style={{ backgroundColor: '#de0700' }}>
          <CardHeader title="10" subheader="Dezembro" />
        </Card>
      </div>
    </div>
  );
}
