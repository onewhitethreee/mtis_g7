/* eslint-disable no-unused-vars */
const mysql = require('mysql2/promise');
const Service = require('./Service');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: 3307,
  database: 'labora',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const filterMap = {
  search: 'nombre',
  tipo: 'tipo',
  activo: 'activo',
};

const buildFilterClause = (filters) => {
  const clauses = [];
  const values = [];
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    const column = filterMap[key] || key;
    if (key === 'search') {
      clauses.push(`(${column} LIKE ? OR apellidos LIKE ? OR email LIKE ?)`);
      values.push(`%${value}%`, `%${value}%`, `%${value}%`);
    } else {
      clauses.push(`${column} = ?`);
      values.push(value);
    }
  });
  return {
    clause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values,
  };
};

const usuariosGET = ({ p = 1, s = 10, q, search, tipo, activo }) => new Promise(
  async (resolve, reject) => {
    try {
      const page = Number(p) > 0 ? Number(p) : 1;
      const size = Number(s) > 0 ? Number(s) : 10;
      const offset = (page - 1) * size;
      const order = q === 'descendente' ? 'DESC' : 'ASC';

      const filter = buildFilterClause({ search, tipo, activo });
      const query = `SELECT * FROM usuario ${filter.clause} ORDER BY nombre ${order} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [...filter.values, size, offset]);

      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const usuariosIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [result] = await pool.execute('DELETE FROM usuario WHERE id_nie = ?', [id]);
      if (result.affectedRows === 0) {
        return reject(Service.rejectResponse('Usuario no encontrado', 404));
      }
      resolve(Service.successResponse({ id }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const usuariosIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM usuario WHERE id_nie = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Usuario no encontrado', 404));
      }
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const usuariosIdPUT = ({ id, usuarioInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = usuarioInput && Object.keys(usuarioInput).filter((k) => usuarioInput[k] !== undefined && usuarioInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('No hay datos para actualizar', 400));
      }

      const setClause = fields.map((field) => `${field} = ?`).join(', ');
      const values = fields.map((field) => usuarioInput[field]);
      values.push(id);

      await pool.execute(`UPDATE usuario SET ${setClause} WHERE id_nie = ?`, values);
      const [rows] = await pool.query('SELECT * FROM usuario WHERE id_nie = ?', [id]);

      if (!rows.length) {
        return reject(Service.rejectResponse('Usuario no encontrado', 404));
      }

      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const usuariosPOST = ({ usuarioInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = usuarioInput && Object.keys(usuarioInput).filter((k) => usuarioInput[k] !== undefined && usuarioInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('Datos de usuario inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => usuarioInput[field]);

      const [result] = await pool.execute(
        `INSERT INTO usuario (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const insertId = usuarioInput.id_nie || result.insertId;
      const [rows] = await pool.query('SELECT * FROM usuario WHERE id_nie = ?', [insertId]);
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

module.exports = {
  usuariosGET,
  usuariosIdDELETE,
  usuariosIdGET,
  usuariosIdPUT,
  usuariosPOST,
};
