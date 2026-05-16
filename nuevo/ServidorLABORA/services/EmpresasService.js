/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Eliminar una empresa por su CIF
*
* cif String CIF de la empresa
* no response value expected for this operation
* */
const empresasCifDELETE = ({ cif }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        cif,
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
* Obtener una empresa por su CIF
* Devuelve los datos completos de una empresa. Usado en el Flujo 1 para validar que la empresa está activa antes de publicar una oferta.
*
* cif String CIF de la empresa
* returns Empresa
* */
const empresasCifGET = ({ cif }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        cif,
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
* Modificar los datos de una empresa
*
* cif String CIF de la empresa
* empresaInput EmpresaInput 
* returns Empresa
* */
const empresasCifPUT = ({ cif, empresaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        cif,
        empresaInput,
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
* Listar empresas con filtros opcionales
* Devuelve una lista paginada de empresas con filtros opcionales por sector y clasificación.
*
* p Integer Número de página (optional)
* s Integer Número de entradas por página (optional)
* q String Orden de los resultados por fecha (optional)
* search String Filtrar por nombre o razón social (optional)
* sector String Filtrar por sector de actividad (optional)
* clasificacion String Filtrar por clasificación de empresa (optional)
* returns EmpresaListResponse
* */
const empresasGET = ({ p, s, q, search, sector, clasificacion }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        p,
        s,
        q,
        search,
        sector,
        clasificacion,
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
* Crear una nueva empresa
* Registra una nueva empresa en el sistema LABORA.
*
* empresaInput EmpresaInput 
* returns Empresa
* */
const empresasPOST = ({ empresaInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        empresaInput,
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
  empresasCifDELETE,
  empresasCifGET,
  empresasCifPUT,
  empresasGET,
  empresasPOST,
};
