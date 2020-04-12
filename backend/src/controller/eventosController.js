const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const {
      name,
      date,
      location,
      soundcheck,
      showstart,
      showtime,
      comments,
    } = request.body;

    const grupo_id = request.headers.authorization;

    const [id] = await connection('eventos').insert({
      name,
      date,
      location,
      soundcheck,
      showstart,
      showtime,
      comments,
      grupo_id,
    });
    return response.json({ id });
  },
  async list(request, response) {
    const { page = 1 } = request.query;
    const [count] = await connection('eventos').count();
    const grupo_id = request.headers.authorization;

    const eventos = await connection('eventos')
      .select('*')
      .where('grupo_id', grupo_id)
      .limit(5)
      .offset((page - 1) * 5);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(eventos);
  },
  async index(request, response) {
    const grupo_id = request.headers.authorization;
    const { id } = request.params;

    const evento = await connection('eventos')
      .select('*')
      .where('id', id)
      .where('grupo_id', grupo_id)
      .first();

    return response.json(evento);
  },

  async delete(request, response) {
    const { id } = request.params;
    const grupo_id = request.headers.authorization;

    const eventos = await connection('eventos')
      .where('id', id)
      .select('grupo_id')
      .first();

    if (eventos.grupo_id !== grupo_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }
    await connection('eventos').where('id', id).delete();

    return response.json({ ok: 'operation has been completed' });
  },

  async put(request, response) {
    const { id } = request.params;

    const {
      name,
      date,
      location,
      soundcheck,
      showstart,
      showtime,
      comments,
    } = request.body;

    const grupo_id = request.headers.authorization;

    const evento = await connection('eventos')
      .where('id', id)
      .select('grupo_id')
      .first();

    if (evento.grupo_id !== grupo_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('eventos').where('id', id).update({
      name,
      date,
      location,
      soundcheck,
      showstart,
      showtime,
      comments,
      grupo_id,
    });

    return response.json({ ok: 'operation has been completed' });
  },
};
