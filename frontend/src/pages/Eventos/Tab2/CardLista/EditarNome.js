import React, { useState } from 'react';
import { Edit } from '@material-ui/icons';
import { IconButton, Dialog } from '@material-ui/core';

import ModalCadNome from './ModalCadNome';
import api from '../../../../services/Api';

function EditarNome({ register, callbackEditarNome }) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(form) {
    const grupo_id = localStorage.getItem('grupo_id');
    const evento_id = register.evento_id;

    try {
      const response = await api.put(
        `/listas/name/${register.id}`,
        { ...form, evento_id },
        {
          headers: {
            Authorization: grupo_id,
          },
        }
      );

      if (response.data) {
        callbackEditarNome(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <IconButton size="small" onClick={() => setOpen(!open)}>
        <Edit fontSize="small" />
      </IconButton>

      <Dialog open={open}>
        <ModalCadNome
          onClose={() => setOpen(!open)}
          onSubmit={handleSubmit}
          register={register}
        />
      </Dialog>
    </div>
  );
}

export default EditarNome;
