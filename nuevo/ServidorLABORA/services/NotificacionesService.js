/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Obtener el estado de una notificación por su ID
*
* id Integer Identificador único de la notificación
* returns Notificacion
* */
const notificacionesIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
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
const notificacionesPOST = ({ notificacionInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        notificacionInput,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  notificacionesIdGET,
  notificacionesPOST,
};
