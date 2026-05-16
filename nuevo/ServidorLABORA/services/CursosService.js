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
  estado: 'c.estado',
};

const buildFilterClause = (filters) => {
  const clauses = [];
  const values = [];
  let join = '';
  let groupBy = '';
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (key === 'etiqueta') {
      const tags = String(value).split(',').map((tag) => tag.trim()).filter(Boolean);
      if (!tags.length) return;
      join = 'INNER JOIN curso_etiqueta ce ON c.id = ce.id_curso INNER JOIN etiqueta e ON ce.id_etiqueta = e.id';
      const placeholders = tags.map(() => '?').join(',');
      clauses.push(`e.nombre IN (${placeholders})`);
      values.push(...tags);
      groupBy = `GROUP BY c.id HAVING COUNT(DISTINCT e.nombre) = ${tags.length}`;
    } else {
      const column = filterMap[key] || `c.${key}`;
      clauses.push(`${column} = ?`);
      values.push(value);
    }
  });
  return {
    join,
    clause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    groupBy,
    values,
  };
};

const cursosGET = ({ p = 1, s = 10, estado, etiqueta }) => new Promise(
  async (resolve, reject) => {
    try {
      const page = Number(p) > 0 ? Number(p) : 1;
      const size = Number(s) > 0 ? Number(s) : 10;
      const offset = (page - 1) * size;

      const filter = buildFilterClause({ estado, etiqueta });
      const query = `SELECT c.* FROM curso c ${filter.join} ${filter.clause} ${filter.groupBy} ORDER BY c.fecha_inicio ASC LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [...filter.values, size, offset]);

      resolve(Service.successResponse(rows));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const cursosIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [result] = await pool.execute('DELETE FROM curso WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return reject(Service.rejectResponse('Curso no encontrado', 404));
      }
      resolve(Service.successResponse({ id }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const cursosIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM curso WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Curso no encontrado', 404));
      }
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const cursosIdPUT = ({ id, cursoInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = cursoInput && Object.keys(cursoInput).filter((k) => cursoInput[k] !== undefined && cursoInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('No hay datos para actualizar', 400));
      }

      const setClause = fields.map((field) => `${field} = ?`).join(', ');
      const values = fields.map((field) => cursoInput[field]);
      values.push(id);

      await pool.execute(`UPDATE curso SET ${setClause} WHERE id = ?`, values);
      const [rows] = await pool.query('SELECT * FROM curso WHERE id = ?', [id]);

      if (!rows.length) {
        return reject(Service.rejectResponse('Curso no encontrado', 404));
      }

      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

const cursosPOST = ({ cursoInput }) => new Promise(
  async (resolve, reject) => {
    try {
      const fields = cursoInput && Object.keys(cursoInput).filter((k) => cursoInput[k] !== undefined && cursoInput[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('Datos de curso inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => cursoInput[field]);

      const [result] = await pool.execute(
        `INSERT INTO curso (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const [rows] = await pool.query('SELECT * FROM curso WHERE id = ?', [result.insertId]);
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

module.exports = {
  cursosGET,
  cursosIdDELETE,
  cursosIdGET,
  cursosIdPUT,
  cursosPOST,
};
