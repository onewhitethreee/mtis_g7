/* eslint-disable no-unused-vars */
const pool = require('./db');
const Service = require('./Service');

const formatOferta = async (oferta) => {
  const [etiquetaRows] = await pool.query(
    `SELECT e.nombre FROM etiqueta e
     INNER JOIN oferta_etiqueta oe ON e.id = oe.id_etiqueta
     WHERE oe.id_oferta = ?`,
    [oferta.id],
  );
  return {
    ...oferta,
    etiquetas: etiquetaRows.map((r) => r.nombre),
    fecha_publicacion: oferta.fecha_publicacion instanceof Date
      ? oferta.fecha_publicacion.toISOString().split('T')[0]
      : oferta.fecha_publicacion,
  };
};

const filterMap = {
  estado: 'o.estado',
  cif_empresa: 'o.cif_empresa',
  duracion_contrato: 'o.duracion_contrato',
};

const buildFilterClause = (filters) => {
  const clauses = [];
  const values = [];
  let join = '';
  let groupBy = '';
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (key === 'search') {
      clauses.push('(o.titulo LIKE ? OR o.descripcion LIKE ?)');
      values.push(`%${value}%`, `%${value}%`);
    } else if (key === 'etiquetas') {
      const tags = String(value).split(',').map((tag) => tag.trim()).filter(Boolean);
      if (!tags.length) return;
      join = 'INNER JOIN oferta_etiqueta oe ON o.id = oe.id_oferta INNER JOIN etiqueta e ON oe.id_etiqueta = e.id';
      const placeholders = tags.map(() => '?').join(',');
      clauses.push(`e.nombre IN (${placeholders})`);
      values.push(...tags);
      groupBy = `GROUP BY o.id HAVING COUNT(DISTINCT e.nombre) = ${tags.length}`;
    } else {
      const column = filterMap[key] || `o.${key}`;
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

const ofertasGET = ({ p = 1, s = 10, q, search, etiquetas, estado, cif_empresa, duracion_contrato }) => new Promise(
  async (resolve, reject) => {
    try {
      const page = Number(p) > 0 ? Number(p) : 1;
      const size = Number(s) > 0 ? Number(s) : 10;
      const offset = (page - 1) * size;
      const order = q === 'descendente' ? 'DESC' : 'ASC';

      const filter = buildFilterClause({ search, etiquetas, estado, cif_empresa, duracion_contrato });
      const query = `SELECT o.* FROM oferta o ${filter.join} ${filter.clause} ${filter.groupBy} ORDER BY o.fecha_publicacion ${order} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [...filter.values, size, offset]);

      const formatted = await Promise.all(rows.map(formatOferta));
      resolve(Service.successResponse(formatted));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

const ofertasIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [result] = await pool.execute('DELETE FROM oferta WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return reject(Service.rejectResponse('Oferta no encontrada', 404));
      }
      resolve(Service.successResponse({ id }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

const ofertasIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM oferta WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Oferta no encontrada', 404));
      }
      resolve(Service.successResponse(await formatOferta(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

const ofertasIdPUT = ({ id, ofertaInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const data = ofertaInput || body;
      const fields = data && Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('No hay datos para actualizar', 400));
      }

      const setClause = fields.map((field) => `${field} = ?`).join(', ');
      const values = fields.map((field) => data[field]);
      values.push(id);

      await pool.execute(`UPDATE oferta SET ${setClause} WHERE id = ?`, values);
      const [rows] = await pool.query('SELECT * FROM oferta WHERE id = ?', [id]);

      if (!rows.length) {
        return reject(Service.rejectResponse('Oferta no encontrada', 404));
      }

      resolve(Service.successResponse(await formatOferta(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

const ofertasPOST = ({ ofertaInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const raw = ofertaInput || body;
      if (!raw || !Object.keys(raw).length) {
        return reject(Service.rejectResponse('Datos de oferta inválidos', 400));
      }

      const { etiquetas, ...data } = raw;

      if (!data.id) {
        const year = new Date().getFullYear();
        const [[{ count }]] = await pool.query(
          'SELECT COUNT(*) as count FROM oferta WHERE id LIKE ?',
          [`OFE-${year}-%`],
        );
        data.id = `OFE-${year}-${String(count + 1).padStart(3, '0')}`;
      }

      const fields = Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields.length) {
        return reject(Service.rejectResponse('Datos de oferta inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => data[field]);

      const [result] = await pool.execute(
        `INSERT INTO oferta (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const insertId = data.id || result.insertId;

      if (etiquetas && etiquetas.length) {
        const [etiquetaRows] = await pool.query(
          `SELECT id FROM etiqueta WHERE nombre IN (${etiquetas.map(() => '?').join(',')})`,
          etiquetas,
        );
        if (etiquetaRows.length) {
          const etiquetaValues = etiquetaRows.map((e) => [insertId, e.id]);
          await pool.query('INSERT INTO oferta_etiqueta (id_oferta, id_etiqueta) VALUES ?', [etiquetaValues]);
        }
      }

      const [rows] = await pool.query('SELECT * FROM oferta WHERE id = ?', [insertId]);
      resolve(Service.successResponse(await formatOferta(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
