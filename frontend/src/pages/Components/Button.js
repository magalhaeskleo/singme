import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const style = makeStyles((theme) => ({
  button: {
    background: '#eb7c0e',
    marginTop: '5px',
    '&:hover': {
      backgroundColor: '#e8b90e',
    },
  },
}));

export default function ButtonSimple({ description, ...rest }) {
  const classes = style();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      {...rest}
    >
      {description}
    </Button>
  );
}
