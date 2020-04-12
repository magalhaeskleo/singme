const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { id } = request.body;
    console.log('chegou aqui ', id);
    const grupo = await connection('grupos')
      .where('id', id)
      .select('*')
      .first();
    if (!grupo) {
      return response
        .status(400)
        .json({ error: 'No Groups found with this ID' });
    }
    return response.json(grupo);
  },
  /*
  async index(request, response) {
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
  */
};
