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
  search: 'titulo',
  etiquetas: 'etiquetas',
  estado: 'estado',
  cifUnderscoreempresa: 'cif_empresa',
  duracionUnderscorecontrato: 'duracion_contrato',
};

const buildFilterClause = (filters) => {
  const clauses = [];
  const values = [];
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    const column = filterMap[key] || key;
    if (key === 'search') {
      clauses.push(`(${column} LIKE ? OR descripcion LIKE ?)`);
      values.push(`%${value}%`, `%${value}%`);
    } else if (key === 'etiquetas') {
      const tags = value.split(',').map((tag) => tag.trim());
      const placeholders = tags.map(() => 'etiquetas LIKE ?').join(' OR ');
      clauses.push(`(${placeholders})`);
      tags.forEach((tag) => values.push(`%${tag}%`));
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

const ofertasGET = ({ p = 1, s = 10, q, search, etiquetas, estado, cifUnderscoreempresa, duracionUnderscorecontrato }) => new Promise(
  async (resolve, reject) => {
    try {
      const page = Number(p) > 0 ? Number(p) : 1;
      const size = Number(s) > 0 ? Number(s) : 10;
      const offset = (page - 1) * size;
      const order = q === 'desc' ? 'DESC' : 'ASC';

      const filter = buildFilterClause({ search, etiquetas, estado, cifUnderscoreempresa, duracionUnderscorecontrato });
      const query = `SELECT * FROM ofertas ${filter.clause} ORDER BY fecha_creacion ${order} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [...filter.values, size, offset]);

      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const ofertasIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [result] = await pool.execute('DELETE FROM ofertas WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return reject(Service.rejectResponse('Oferta no encontrada', 404));
      }
      resolve(Service.successResponse({ id }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const ofertasIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM ofertas WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Oferta no encontrada', 404));
      }
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const ofertasIdPUT = ({ id, ofertaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = ofertaInput && Object.keys(ofertaInput).filter((k) => ofertaInput[k] !== undefined && ofertaInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('No hay datos para actualizar', 400));
      }

      const setClause = fields.map((field) => `${field} = ?`).join(', ');
      const values = fields.map((field) => ofertaInput[field]);
      values.push(id);

      await pool.execute(`UPDATE ofertas SET ${setClause} WHERE id = ?`, values);
      const [rows] = await pool.query('SELECT * FROM ofertas WHERE id = ?', [id]);

      if (!rows.length) {
        return reject(Service.rejectResponse('Oferta no encontrada', 404));
      }

      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const ofertasPOST = ({ ofertaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = ofertaInput && Object.keys(ofertaInput).filter((k) => ofertaInput[k] !== undefined && ofertaInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('Datos de oferta inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => ofertaInput[field]);

      const [result] = await pool.execute(
        `INSERT INTO ofertas (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const [rows] = await pool.query('SELECT * FROM ofertas WHERE id = ?', [result.insertId]);
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

module.exports = {
  ofertasGET,
  ofertasIdDELETE,
  ofertasIdGET,
  ofertasIdPUT,
  ofertasPOST,
};
