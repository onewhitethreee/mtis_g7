/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Listar cursos con filtros opcionales
* Devuelve el catálogo de cursos disponibles. Usado en el Flujo 5 para que el demandante consulte las etiquetas disponibles antes de suscribirse.
*
* p Integer Número de página (optional)
* s Integer Número de entradas por página (optional)
* estado String Filtrar por estado del curso (optional)
* etiqueta String Filtrar por etiqueta asociada al curso (optional)
* returns CursoListResponse
* */
const cursosGET = ({ p, s, estado, etiqueta }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        p,
        s,
        estado,
        etiqueta,
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
* Eliminar un curso por su ID
*
* id Integer Identificador único del curso
* no response value expected for this operation
* */
const cursosIdDELETE = ({ id }) => new Promise(
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
* Obtener un curso por su ID
*
* id Integer Identificador único del curso
* returns Curso
* */
const cursosIdGET = ({ id }) => new Promise(
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
* Modificar los datos de un curso
*
* id Integer Identificador único del curso
* cursoInput CursoInput 
* returns Curso
* */
const cursosIdPUT = ({ id, cursoInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        cursoInput,
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
* Crear un nuevo curso de formación
*
* cursoInput CursoInput 
* returns Curso
* */
const cursosPOST = ({ cursoInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        cursoInput,
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
  cursosGET,
  cursosIdDELETE,
  cursosIdGET,
  cursosIdPUT,
  cursosPOST,
};
