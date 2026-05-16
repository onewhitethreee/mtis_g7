/* eslint-disable no-unused-vars */
const pool = require('./db');
const Service = require('./Service');

const formatDate = (val) => (val instanceof Date ? val.toISOString().split('T')[0] : val);

const formatCurso = async (curso) => {
  const [etiquetaRows] = await pool.query(
    `SELECT e.nombre FROM etiqueta e
     INNER JOIN curso_etiqueta ce ON e.id = ce.id_etiqueta
     WHERE ce.id_curso = ?`,
    [curso.id],
  );
  return {
    ...curso,
    etiquetas: etiquetaRows.map((r) => r.nombre),
    fecha_inicio: formatDate(curso.fecha_inicio),
    fecha_fin: formatDate(curso.fecha_fin),
  };
};

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

      const formatted = await Promise.all(rows.map(formatCurso));
      resolve(Service.successResponse(formatted));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
      resolve(Service.successResponse(await formatCurso(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

const cursosIdPUT = ({ id, cursoInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const raw = cursoInput || body;
      const { etiquetas, ...data } = raw || {};
      const fields = Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields.length && !etiquetas) {
        return reject(Service.rejectResponse('No hay datos para actualizar', 400));
      }

      if (fields.length) {
        const setClause = fields.map((field) => `${field} = ?`).join(', ');
        const values = fields.map((field) => data[field]);
        values.push(id);
        await pool.execute(`UPDATE curso SET ${setClause} WHERE id = ?`, values);
      }

      if (etiquetas) {
        await pool.execute('DELETE FROM curso_etiqueta WHERE id_curso = ?', [id]);
        if (etiquetas.length) {
          const [etiquetaRows] = await pool.query(
            `SELECT id FROM etiqueta WHERE nombre IN (${etiquetas.map(() => '?').join(',')})`,
            etiquetas,
          );
          if (etiquetaRows.length) {
            const etiquetaValues = etiquetaRows.map((e) => [id, e.id]);
            await pool.query('INSERT INTO curso_etiqueta (id_curso, id_etiqueta) VALUES ?', [etiquetaValues]);
          }
        }
      }

      const [rows] = await pool.query('SELECT * FROM curso WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Curso no encontrado', 404));
      }
      resolve(Service.successResponse(await formatCurso(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

const cursosPOST = ({ cursoInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const raw = cursoInput || body;
      if (!raw || !Object.keys(raw).length) {
        return reject(Service.rejectResponse('Datos de curso inválidos', 400));
      }

      const { etiquetas, ...data } = raw;
      const fields = Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields.length) {
        return reject(Service.rejectResponse('Datos de curso inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => data[field]);

      const [result] = await pool.execute(
        `INSERT INTO curso (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const insertId = result.insertId;

      if (etiquetas && etiquetas.length) {
        const [etiquetaRows] = await pool.query(
          `SELECT id FROM etiqueta WHERE nombre IN (${etiquetas.map(() => '?').join(',')})`,
          etiquetas,
        );
        if (etiquetaRows.length) {
          const etiquetaValues = etiquetaRows.map((e) => [insertId, e.id]);
          await pool.query('INSERT INTO curso_etiqueta (id_curso, id_etiqueta) VALUES ?', [etiquetaValues]);
        }
      }

      const [rows] = await pool.query('SELECT * FROM curso WHERE id = ?', [insertId]);
      resolve(Service.successResponse(await formatCurso(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
