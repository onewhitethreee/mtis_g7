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
  id_usuario: 'id_usuario',
  tipo: 'tipo',
};

const buildFilterClause = (filters) => {
  const clauses = [];
  const values = [];
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    const column = filterMap[key] || key;
    clauses.push(`${column} = ?`);
    values.push(value);
  });
  return {
    clause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values,
  };
};

const suscripcionesGET = ({ p = 1, s = 10, id_usuario, tipo }) => new Promise(
  async (resolve, reject) => {
    try {
      const page = Number(p) > 0 ? Number(p) : 1;
      const size = Number(s) > 0 ? Number(s) : 10;
      const offset = (page - 1) * size;

      const filter = buildFilterClause({ id_usuario, tipo });
      const query = `SELECT * FROM suscripcion ${filter.clause} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [...filter.values, size, offset]);

      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const suscripcionesIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [result] = await pool.execute('DELETE FROM suscripcion WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return reject(Service.rejectResponse('Suscripción no encontrada', 404));
      }
      resolve(Service.successResponse({ id }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const suscripcionesIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM suscripcion WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Suscripción no encontrada', 404));
      }
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const suscripcionesPOST = ({ suscripcionInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const data = suscripcionInput || body;
      const fields = data && Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('Datos de suscripción inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => data[field]);

      const [result] = await pool.execute(
        `INSERT INTO suscripcion (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const [rows] = await pool.query('SELECT * FROM suscripcion WHERE id = ?', [result.insertId]);
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

module.exports = {
  suscripcionesGET,
  suscripcionesIdDELETE,
  suscripcionesIdGET,
  suscripcionesPOST,
};
