const connection = require('../database/connection');

function parseToDateFormat(date) {
  const [dia, mes, ano] = date.split('/');
  return Date.parse(`${ano}/${mes}/${dia}`);
}

module.exports = {
  async index(request, response) {
    const { date } = request.body;

    const parseToDate = parseToDateFormat(date);
    const grupo_id = request.headers.authorization;

    const eventosDay = await connection('eventos')
      .select('*')
      .where('grupo_id', grupo_id)
      .where('date', parseToDate);

    return response.json(eventosDay);
  },
};

/**
 * module.exports = {
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
};

 */
