const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(request, response) {
    const { name, email, password, grupo_id } = request.body;
    const id = crypto.randomBytes(8).toString('HEX');

    const createdAt = new Date();
    const updateAt = new Date();

    await connection('users').insert({
      id,
      name,
      email,
      password,
      grupo_id,
      updateAt,
      createdAt,
    });

    return response.json({ ok: true });
  },
  async list(request, response) {
    const users = await connection('users').select('*');
    return response.json(users);
  },
};
