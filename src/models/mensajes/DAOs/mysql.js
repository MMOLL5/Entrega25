import { sqliteDB } from '../../../services/db';

class MensajesPersistencia {
  async getAll() {
    return sqliteDB.from('mensajes').select();
  }

  async get(id) {
    return sqliteDB.from('mensajes').where({ id: id }).select();
  }

  async add(data) {
    return sqliteDB('mensajes').insert(data);
  }

}

export const Mensajes = new MensajesPersistencia();