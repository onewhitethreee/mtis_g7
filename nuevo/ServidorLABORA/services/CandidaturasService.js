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
  id_oferta: 'id_oferta',
  id_candidato: 'id_candidato',
  estado: 'estado',
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

const candidaturasGET = ({ p = 1, s = 10, id_oferta, id_candidato, estado }) => new Promise(
  async (resolve, reject) => {
    try {
      const page = Number(p) > 0 ? Number(p) : 1;
      const size = Number(s) > 0 ? Number(s) : 10;
      const offset = (page - 1) * size;

      const filter = buildFilterClause({ id_oferta, id_candidato, estado });
      const query = `SELECT * FROM candidatura ${filter.clause} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [...filter.values, size, offset]);

      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const candidaturasIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [result] = await pool.execute('DELETE FROM candidatura WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return reject(Service.rejectResponse('Candidatura no encontrada', 404));
      }
      resolve(Service.successResponse({ id }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const candidaturasIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM candidatura WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Candidatura no encontrada', 404));
      }
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const candidaturasIdPUT = ({ id, candidaturaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = candidaturaInput && Object.keys(candidaturaInput).filter((k) => candidaturaInput[k] !== undefined && candidaturaInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('No hay datos para actualizar', 400));
      }

      const setClause = fields.map((field) => `${field} = ?`).join(', ');
      const values = fields.map((field) => candidaturaInput[field]);
      values.push(id);

      await pool.execute(`UPDATE candidatura SET ${setClause} WHERE id = ?`, values);
      const [rows] = await pool.query('SELECT * FROM candidatura WHERE id = ?', [id]);

      if (!rows.length) {
        return reject(Service.rejectResponse('Candidatura no encontrada', 404));
      }

      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const candidaturasPOST = ({ candidaturaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = candidaturaInput && Object.keys(candidaturaInput).filter((k) => candidaturaInput[k] !== undefined && candidaturaInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('Datos de candidatura inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => candidaturaInput[field]);

      const [result] = await pool.execute(
        `INSERT INTO candidatura (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const [rows] = await pool.query('SELECT * FROM candidatura WHERE id = ?', [result.insertId]);
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

module.exports = {
  candidaturasGET,
  candidaturasIdDELETE,
  candidaturasIdGET,
  candidaturasIdPUT,
  candidaturasPOST,
};
