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

/**
* Obtener el estado de una notificación por su ID
*
* id Integer Identificador único de la notificación
* returns Notificacion
* */
const notificacionesIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM notificacion WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Notificación no encontrada', 404));
      }
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);
/**
* Enviar una nueva notificación
* Envía una notificación a una lista de destinatarios. Usado transversalmente en todos los flujos.
*
* notificacionInput NotificacionInput 
* returns Notificacion
* */
const notificacionesPOST = ({ notificacionInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const data = notificacionInput || body;
      const fields = data && Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields || !fields.length) {
        return reject(Service.rejectResponse('Datos de notificación inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => data[field]);

      const [result] = await pool.execute(
        `INSERT INTO notificacion (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const [rows] = await pool.query('SELECT * FROM notificacion WHERE id = ?', [result.insertId]);
      resolve(Service.successResponse(rows[0]));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  },
);

module.exports = {
  notificacionesIdGET,
  notificacionesPOST,
};
