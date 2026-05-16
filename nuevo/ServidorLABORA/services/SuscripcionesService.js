/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Listar suscripciones con filtros opcionales
*
* p Integer Número de página (optional)
* s Integer Número de entradas por página (optional)
* idUnderscoreusuario String Filtrar suscripciones por usuario (optional)
* tipo String Filtrar por tipo de suscripción (optional)
* returns SuscripcionListResponse
* */
const suscripcionesGET = ({ p, s, idUnderscoreusuario, tipo }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        p,
        s,
        idUnderscoreusuario,
        tipo,
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
* Eliminar una suscripción por su ID
* Cancela una suscripción activa del demandante.
*
* id Integer Identificador único de la suscripción
* no response value expected for this operation
* */
const suscripcionesIdDELETE = ({ id }) => new Promise(
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
* Obtener una suscripción por su ID
*
* id Integer Identificador único de la suscripción
* returns Suscripcion
* */
const suscripcionesIdGET = ({ id }) => new Promise(
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
* Registrar una nueva suscripción
* Registra las preferencias de un demandante por etiquetas para recibir notificaciones de nuevas ofertas o cursos. Usado en el Flujo 5.
*
* suscripcionInput SuscripcionInput 
* returns Suscripcion
* */
const suscripcionesPOST = ({ suscripcionInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        suscripcionInput,
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
  suscripcionesGET,
  suscripcionesIdDELETE,
  suscripcionesIdGET,
  suscripcionesPOST,
};
