import React, { useState } from 'react';
import { green } from '@material-ui/core/colors';

import { Fab, Dialog, withStyles } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import api from '../../../services/Api';

function SendWhatsapp({ disabled, events }) {
  const [open, setOpen] = useState(false);

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Fab);

  return (
    <div>
      <ColorButton
        size="small"
        disabled={disabled}
        color="primary"
        onClick={() => setOpen(!open)}
      >
        <WhatsAppIcon style={{ color: 'white' }} />
      </ColorButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        "colocar modal"
      </Dialog>
    </div>
  );
}

export default SendWhatsapp;
