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
    const { id } = request.params;
    const grupo_id = request.headers.authorization;

    const nameBD = await connection('listas')
      .select('*')
      .where('id', id)
      .where('grupo_id', grupo_id);

    return response.json(nameBD);
  },

  async delete(request, response) {
    const { id } = request.params;
    const grupo_id = request.headers.authorization;

    const nameBD = await connection('listas')
      .where('id', id)
      .select('grupo_id')
      .first();

    const nameIsEmpty = !nameBD;

    if (nameIsEmpty === true || nameBD.grupo_id !== grupo_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }
    await connection('listas').where('id', id).delete();
    //  return response.json({ ok: 'operation has been completed' });
    return response.json({ ok: 'operation has been completed' });
  },

  async put(request, response) {
    const { id } = request.params;
    const grupo_id = request.headers.authorization;

    const { name, whatsapp, identification, evento_id } = request.body;

    const nameBD = await connection('listas')
      .where('id', id)
      .select('grupo_id')
      .first();

    const nameIsEmpty = !nameBD;

    if (nameIsEmpty === true || nameBD.grupo_id !== grupo_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }
    await connection('listas').where('id', id).update({
      name,
      whatsapp,
      identification,
      evento_id,
      grupo_id,
    });

    return response.json({ ok: 'operation has been completed' });
  },
};
