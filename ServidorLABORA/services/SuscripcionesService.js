/* eslint-disable no-unused-vars */
const pool = require('./db');
const Service = require('./Service');

const formatSuscripcion = async (suscripcion) => {
  const [etiquetaRows] = await pool.query(
    `SELECT e.nombre FROM etiqueta e
     INNER JOIN suscripcion_etiqueta se ON e.id = se.id_etiqueta
     WHERE se.id_suscripcion = ?`,
    [suscripcion.id],
  );
  return {
    ...suscripcion,
    etiquetas: etiquetaRows.map((r) => r.nombre),
    fecha_suscripcion: suscripcion.fecha_suscripcion instanceof Date
      ? suscripcion.fecha_suscripcion.toISOString().split('T')[0]
      : suscripcion.fecha_suscripcion,
  };
};

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

      const formatted = await Promise.all(rows.map(formatSuscripcion));
      resolve(Service.successResponse(formatted));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
      resolve(Service.successResponse(await formatSuscripcion(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

const suscripcionesPOST = ({ suscripcionInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const raw = suscripcionInput || body;
      if (!raw || !Object.keys(raw).length) {
        return reject(Service.rejectResponse('Datos de suscripción inválidos', 400));
      }

      const { etiquetas, ...data } = raw;
      const fields = Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields.length) {
        return reject(Service.rejectResponse('Datos de suscripción inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => data[field]);

      const [result] = await pool.execute(
        `INSERT INTO suscripcion (${fields.join(', ')}) VALUES (${placeholders})`,
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
          await pool.query('INSERT INTO suscripcion_etiqueta (id_suscripcion, id_etiqueta) VALUES ?', [etiquetaValues]);
        }
      }

      const [rows] = await pool.query('SELECT * FROM suscripcion WHERE id = ?', [insertId]);
      resolve(Service.successResponse(await formatSuscripcion(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

module.exports = {
  suscripcionesGET,
  suscripcionesIdDELETE,
  suscripcionesIdGET,
  suscripcionesPOST,
};
