const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(request, response) {
    const { name, email, password, city, uf } = request.body;
    const id = crypto.randomBytes(8).toString('HEX');

    const createdAt = new Date();

    await connection('grupos').insert({
      id,
      name,
      email,
      city,
      uf,
      password,
      createdAt,
    });

    return response.json({ id });
  },
  async index(request, response) {
    const grupos = await connection('grupos').select('*');
    return response.json(grupos);
  },
};
