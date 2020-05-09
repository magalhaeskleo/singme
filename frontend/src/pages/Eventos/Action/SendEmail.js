import React, { useState } from 'react';
import { red } from '@material-ui/core/colors';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Fab, Dialog, withStyles, Typography } from '@material-ui/core';

import api from '../../../services/Api';

function SendEmail({ disabled, sendRegister }) {
  const [open, setOpen] = useState(false);

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Fab);

  return (
    <div>
      <ColorButton
        size="small"
        color="primary"
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <MailOutlineIcon style={{ color: 'white' }} />
      </ColorButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        Registros selecionados {sendRegister}
      </Dialog>
    </div>
  );
}

export default SendEmail;
