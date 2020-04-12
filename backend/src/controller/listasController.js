const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { name, whatsapp, identification } = request.body;
    const grupo_id = request.headers.authorization;

    const { evento_id } = request.params;

    const [id] = await connection('listas').insert({
      name,
      whatsapp,
      identification,
      evento_id,
      grupo_id,
    });

    return response.json({ id });
  },
  async index(request, response) {
    const { page = 1 } = request.query;
    const [count] = await connection('listas').count();
    const grupo_id = request.headers.authorization;
    const { evento_id } = request.params;

    const listas = await connection('listas')
      .select('*')
      .where('evento_id', evento_id)
      .where('grupo_id', grupo_id)
      .limit(5)
      .offset((page - 1) * 10);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(listas);
  },

  async delete(request, response) {
    const { id } = request.params;
    const grupo_id = request.headers.authorization;

    const listas = await connection('listas')
      .where('id', id)
      .select('grupo_id')
      .first();

    const listasIsEmpty = !listas;

    if (listasIsEmpty === true || listas.grupo_id !== grupo_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }
    await connection('listas').where('id', id).delete();

    return response.status(204).send();
  },
};
