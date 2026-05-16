/* eslint-disable no-unused-vars */
require('dotenv').config();
const nodemailer = require('nodemailer');
const pool = require('./db');
const Service = require('./Service');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || '127.0.0.1',
  port: Number(process.env.MAIL_PORT) || 2525,
  secure: false,
  ignoreTLS: true,
});

/**
* Obtener el estado de una notificación por su ID
*
* id Integer Identificador único de la notificación
* returns Notificacion
* */
const formatNotificacion = async (notificacion) => {
  const [destinatarioRows] = await pool.query(
    'SELECT email FROM notificacion_destinatario WHERE id_notificacion = ?',
    [notificacion.id],
  );
  return {
    ...notificacion,
    destinatarios: destinatarioRows.map((r) => r.email),
    fecha_envio: notificacion.fecha_envio instanceof Date
      ? notificacion.fecha_envio.toISOString().replace('T', ' ').substring(0, 19)
      : notificacion.fecha_envio,
  };
};

const notificacionesIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const [rows] = await pool.query('SELECT * FROM notificacion WHERE id = ?', [id]);
      if (!rows.length) {
        return reject(Service.rejectResponse('Notificación no encontrada', 404));
      }
      resolve(Service.successResponse(await formatNotificacion(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
      const raw = notificacionInput || body;
      if (!raw || !Object.keys(raw).length) {
        return reject(Service.rejectResponse('Datos de notificación inválidos', 400));
      }

      const { destinatarios, ...data } = raw;
      const fields = Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== null);
      if (!fields.length) {
        return reject(Service.rejectResponse('Datos de notificación inválidos', 400));
      }

      const placeholders = fields.map(() => '?').join(', ');
      const values = fields.map((field) => data[field]);

      const [result] = await pool.execute(
        `INSERT INTO notificacion (${fields.join(', ')}) VALUES (${placeholders})`,
        values,
      );

      const insertId = result.insertId;

      if (destinatarios && destinatarios.length) {
        const destinatarioValues = destinatarios.map((email) => [insertId, email]);
        await pool.query(
          'INSERT INTO notificacion_destinatario (id_notificacion, email) VALUES ?',
          [destinatarioValues],
        );

        await Promise.all(destinatarios.map((email) =>
          transporter.sendMail({
            from: process.env.MAIL_FROM || 'labora@labora.gva.es',
            to: email,
            subject: data.asunto,
            text: data.mensaje,
          }),
        ));
      }

      const [rows] = await pool.query('SELECT * FROM notificacion WHERE id = ?', [insertId]);
      resolve(Service.successResponse(await formatNotificacion(rows[0])));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

module.exports = {
  notificacionesIdGET,
  notificacionesPOST,
};
