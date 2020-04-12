const express = require('express');
const grupoController = require('./controller/gruposController');
const eventosController = require('./controller/eventosController');
const listasController = require('./controller/listasController');
const sessionController = require('./controller/sessionController');
const eventosDayController = require('./controller/eventosDayController');
const nameController = require('./controller/nameController');

const routes = express.Router();
// sobre entrar no app
routes.post('/session', sessionController.index);

// sobre a tabela de grupos
routes.post('/grupos', grupoController.create);
routes.get('/grupos', grupoController.index);

// sobre a tabela de eventos
routes.post('/eventos', eventosController.create);
routes.get('/eventos', eventosController.list);

routes.get('/eventos/:id', eventosController.index);
routes.put('/eventos/:id', eventosController.put);

routes.delete('/eventos/:id', eventosController.delete);
routes.post('/eventos/day', eventosDayController.index);

// sobre a tabela de listas
routes.post('/listas/:evento_id', listasController.create);
routes.get('/listas/:evento_id', listasController.index);
routes.delete('/listas/:id', listasController.delete);

//sobre os nomes
routes.post('/listas/name/:evento_id', nameController.create);
routes.get('/listas/name/:id', nameController.index);
routes.delete('/listas/name/:id', nameController.delete);
routes.put('/listas/name/:id', nameController.put);

module.exports = routes;
