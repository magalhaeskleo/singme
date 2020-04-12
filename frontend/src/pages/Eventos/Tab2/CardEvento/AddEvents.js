import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import { Fab, Dialog, Snackbar, Fade } from '@material-ui/core';

import ModalCadEvento from './ModalCadEvento';
import api from '../../../../services/Api';

function AddEvents({ daySelected, callbackAddEvent }) {
  const [open, setOpen] = useState(false);
  const [openSnk, setOpenSnk] = useState(false);

  async function handleSubmit(form) {
    const grupo_id = localStorage.getItem('grupo_id');
    const response = await api.post('/eventos', form, {
      headers: {
        Authorization: grupo_id,
      },
    });

    if (response.data) {
      setOpenSnk(true);
      setOpen(false);
      callbackAddEvent(true);
    }
  }

  const handleClose = () => {
    setOpenSnk(false);
  };

  return (
    <div>
      <Fab size="small" color="primary" onClick={() => setOpen(!open)}>
        <Add />
      </Fab>

      <Dialog open={open}>
        <ModalCadEvento
          onClose={() => setOpen(!open)}
          onSubmit={handleSubmit}
          daySelected={daySelected}
        />
      </Dialog>
    </div>
  );
}

export default AddEvents;
