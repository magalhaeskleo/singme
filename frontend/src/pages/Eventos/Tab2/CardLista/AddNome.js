import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import { Fab, Dialog, Snackbar, Fade } from '@material-ui/core';

import ModalCadNome from './ModalCadNome';
import api from '../../../../services/Api';

function AddNome({ event, callbackAddNome }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(form) {
    const grupo_id = localStorage.getItem('grupo_id');
    try {
      const response = await api.post(`/listas/name/${event.id}`, form, {
        headers: {
          Authorization: grupo_id,
        },
      });

      if (response.data) {
        callbackAddNome(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Fab size="small" color="primary" onClick={() => setOpen(!open)}>
        <Add />
      </Fab>

      <Dialog open={open}>
        <ModalCadNome
          onClose={() => setOpen(!open)}
          onSubmit={handleSubmit}
          nameCard={event.name}
        />
      </Dialog>
    </div>
  );
}

export default AddNome;
