import React from 'react';
import { withStyles, LinearProgress } from '@material-ui/core';

export default function BarStatus({ status }) {
  const color = {
    Agendado: {
      primary: '#3a75b0',
      back: '#6099d1',
      variant: 'indeterminate',
    },
    Concluido: {
      primary: '#1f945b',
      back: '#56c48f',
      variant: 'determinate',
    },
    Cancelado: {
      primary: '#bd1e39',
      back: '#e35f76',
      variant: 'determinate',
    },
  };

  const BarProgress = withStyles({
    root: {
      maxWidth: 100,
    },

    colorPrimary: {
      backgroundColor: color[status].primary,
    },

    barColorPrimary: {
      backgroundColor: color[status].back,
    },
  })(LinearProgress);
  return <BarProgress variant={color[status].variant} />;
}
