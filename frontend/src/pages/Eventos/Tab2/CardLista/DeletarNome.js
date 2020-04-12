import React, { useState } from 'react';
import { Delete } from '@material-ui/icons';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@material-ui/core';

import api from '../../../../services/Api';

function EditarEvents({ register, callbackExcluir }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    const grupo_id = localStorage.getItem('grupo_id');

    const response = await api.delete(`/listas/name/${register.id}`, {
      headers: {
        Authorization: grupo_id,
      },
    });

    if (response.data.ok) {
      setOpen(false);
      callbackExcluir(true);
    }
  }

  return (
    <div>
      <IconButton size="small" onClick={() => setOpen(!open)}>
        <Delete fontSize="small" />
      </IconButton>

      <Dialog open={open}>
        <DialogTitle id="nome-na-lista">{`Excluir '${register.name}' ?`}</DialogTitle>
        <DialogContent>Confirmar exclusão ?</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleSubmit}>
            Confirmar
          </Button>
          <Button color="primary" onClick={() => setOpen(!open)}>
            Retornar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditarEvents;
