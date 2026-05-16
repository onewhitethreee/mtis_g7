/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Listar candidaturas con filtros opcionales
*
* p Integer Número de página (optional)
* s Integer Número de entradas por página (optional)
* idUnderscoreoferta String Filtrar candidaturas por oferta (optional)
* idUnderscorecandidato String Filtrar candidaturas por candidato (optional)
* estado String Filtrar por estado de la candidatura (optional)
* returns CandidaturaListResponse
* */
const candidaturasGET = ({ p, s, idUnderscoreoferta, idUnderscorecandidato, estado }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        p,
        s,
        idUnderscoreoferta,
        idUnderscorecandidato,
        estado,
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
* Eliminar una candidatura por su ID
*
* id Integer Identificador único de la candidatura
* no response value expected for this operation
* */
const candidaturasIdDELETE = ({ id }) => new Promise(
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
* Obtener una candidatura por su ID
*
* id Integer Identificador único de la candidatura
* returns Candidatura
* */
const candidaturasIdGET = ({ id }) => new Promise(
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
* Modificar el estado de una candidatura
* Permite actualizar el estado de una candidatura. Usado para marcar una candidatura como aceptada o rechazada.
*
* id Integer Identificador único de la candidatura
* candidaturaInput CandidaturaInput 
* returns Candidatura
* */
const candidaturasIdPUT = ({ id, candidaturaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        candidaturaInput,
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
* Registrar una nueva candidatura
* Registra la candidatura de un demandante a una oferta de trabajo. Usado en el Flujo 2 tras verificar la elegibilidad.
*
* candidaturaInput CandidaturaInput 
* returns Candidatura
* */
const candidaturasPOST = ({ candidaturaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        candidaturaInput,
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
  candidaturasGET,
  candidaturasIdDELETE,
  candidaturasIdGET,
  candidaturasIdPUT,
  candidaturasPOST,
};
