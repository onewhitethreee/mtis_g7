/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Listar ofertas filtradas por etiquetas y otros criterios
* Devuelve una lista paginada de ofertas. Permite filtrar por etiquetas para el matching y las suscripciones.
*
* p Integer Número de página (optional)
* s Integer Número de entradas por página (optional)
* q String Orden de los resultados por fecha (optional)
* search String Filtrar por título o descripción (optional)
* etiquetas String Filtrar por etiquetas separadas por comas (optional)
* estado String Filtrar por estado de la oferta (optional)
* cifUnderscoreempresa String Filtrar por empresa publicadora (optional)
* duracionUnderscorecontrato String Filtrar por tipo de contrato (optional)
* returns OfertaListResponse
* */
const ofertasGET = ({ p, s, q, search, etiquetas, estado, cifUnderscoreempresa, duracionUnderscorecontrato }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        p,
        s,
        q,
        search,
        etiquetas,
        estado,
        cifUnderscoreempresa,
        duracionUnderscorecontrato,
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
* Eliminar una oferta por su ID
*
* id String Identificador único de la oferta
* no response value expected for this operation
* */
const ofertasIdDELETE = ({ id }) => new Promise(
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
* Obtener una oferta por su ID
* Devuelve los datos de una oferta. Usado en el Flujo 2 para obtener los requisitos antes de validar la candidatura.
*
* id String Identificador único de la oferta
* returns Oferta
* */
const ofertasIdGET = ({ id }) => new Promise(
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
* Modificar los datos de una oferta
*
* id String Identificador único de la oferta
* ofertaInput OfertaInput 
* returns Oferta
* */
const ofertasIdPUT = ({ id, ofertaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        ofertaInput,
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
* Publicar una nueva oferta de trabajo
* Crea y publica una oferta de trabajo. Usado en el Flujo 1 tras validar la empresa.
*
* ofertaInput OfertaInput 
* returns Oferta
* */
const ofertasPOST = ({ ofertaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        ofertaInput,
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
  ofertasGET,
  ofertasIdDELETE,
  ofertasIdGET,
  ofertasIdPUT,
  ofertasPOST,
};
