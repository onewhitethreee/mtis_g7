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
  sector: 'sector',
  clasificacion: 'clasificacion',
};

const buildFilterClause = (filters) => {
  const clauses = [];
  const values = [];
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    const column = filterMap[key] || key;
    if (key === 'search') {
      clauses.push(`(${column} LIKE ? OR razon_social LIKE ?)`);
      values.push(`%${value}%`, `%${value}%`);
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

const empresasCifDELETE = ({ cif }) => new Promise(
  async (resolve, reject) => {
    try {
      const [result] = await pool.execute('DELETE FROM empresas WHERE cif = ?', [cif]);
      if (result.affectedRows === 0) {
        return reject(Service.rejectResponse('Empresa no encontrada', 404));
      }
      resolve(Service.successResponse({ cif }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const empresasCifGET = ({ cif }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM empresas WHERE cif = ?', [cif]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Empresa no encontrada', 404));
      }
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const empresasCifPUT = ({ cif, empresaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = empresaInput && Object.keys(empresaInput).filter((k) => empresaInput[k] !== undefined && empresaInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('No hay datos para actualizar', 400));
      }

      const setClause = fields.map((field) => `${field} = ?`).join(', ');
      const values = fields.map((field) => empresaInput[field]);
      values.push(cif);

      await pool.execute(`UPDATE empresas SET ${setClause} WHERE cif = ?`, values);
      const [rows] = await pool.query('SELECT * FROM empresas WHERE cif = ?', [cif]);

      if (!rows.length) {
        return reject(Service.rejectResponse('Empresa no encontrada', 404));
      }

      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const empresasGET = ({ p = 1, s = 10, q, search, sector, clasificacion }) => new Promise(
  async (resolve, reject) => {
    try {
      const page = Number(p) > 0 ? Number(p) : 1;
      const size = Number(s) > 0 ? Number(s) : 10;
      const offset = (page - 1) * size;
      const order = q === 'desc' ? 'DESC' : 'ASC';

      const filter = buildFilterClause({ search, sector, clasificacion });
      const query = `SELECT * FROM empresas ${filter.clause} ORDER BY fecha_creacion ${order} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [...filter.values, size, offset]);

      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const empresasPOST = ({ empresaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = empresaInput && Object.keys(empresaInput).filter((k) => empresaInput[k] !== undefined && empresaInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('Datos de empresa inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => empresaInput[field]);

      const [result] = await pool.execute(
        `INSERT INTO empresas (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const [rows] = await pool.query('SELECT * FROM empresas WHERE cif = ?', [result.insertId]);
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

module.exports = {
  empresasCifDELETE,
  empresasCifGET,
  empresasCifPUT,
  empresasGET,
  empresasPOST,
};
