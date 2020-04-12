const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(request, response) {
    const { name, email, password, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('grupos').insert({
      id,
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },
  async index(request, response) {
    const grupos = await connection('grupos').select('*');
    return response.json(grupos);
  },
};
