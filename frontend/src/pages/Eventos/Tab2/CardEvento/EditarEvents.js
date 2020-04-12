import React, { useState } from 'react';
import { Edit } from '@material-ui/icons';
import { IconButton, Dialog, Snackbar, Fade } from '@material-ui/core';

import ModalCadEvento from './ModalCadEvento';
import api from '../../../../services/Api';

function EditarEvents({ event, callbackEditEvent }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(form) {
    const grupo_id = localStorage.getItem('grupo_id');

    const response = await api.put(`/eventos/${event.id}`, form, {
      headers: {
        Authorization: grupo_id,
      },
    });

    if (response.data) {
      callbackEditEvent(true);
      setOpen(false);
    }
  }

  return (
    <div>
      <IconButton size="small" onClick={() => setOpen(!open)}>
        <Edit fontSize="small" />
      </IconButton>

      <Dialog open={open}>
        <ModalCadEvento
          onClose={() => setOpen(!open)}
          onSubmit={handleSubmit}
          event={event}
        />
      </Dialog>
    </div>
  );
}

export default EditarEvents;
