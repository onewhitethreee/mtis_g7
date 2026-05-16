/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Listar usuarios con filtros opcionales
* Devuelve una lista paginada de usuarios con filtros opcionales por tipo y estado.
*
* p Integer Número de página (optional)
* s Integer Número de entradas por página (optional)
* q String Orden de los resultados por fecha (optional)
* search String Filtrar por nombre, apellidos o email (optional)
* tipo String Filtrar por tipo de usuario (optional)
* activo Boolean Filtrar por estado activo/inactivo (optional)
* returns UsuarioListResponse
* */
const usuariosGET = ({ p, s, q, search, tipo, activo }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        p,
        s,
        q,
        search,
        tipo,
        activo,
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
* Eliminar un usuario por su NIF/NIE
* Elimina permanentemente un usuario del sistema.
*
* id String NIF o NIE del usuario
* no response value expected for this operation
* */
const usuariosIdDELETE = ({ id }) => new Promise(
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
* Obtener un usuario por su NIF/NIE
* Devuelve los datos completos de un usuario a partir de su NIF o NIE.
*
* id String NIF o NIE del usuario
* returns Usuario
* */
const usuariosIdGET = ({ id }) => new Promise(
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
* Modificar los datos de un usuario
* Actualiza los datos de un usuario existente. También se usa para activar o desactivar el perfil.
*
* id String NIF o NIE del usuario
* usuarioInput UsuarioInput 
* returns Usuario
* */
const usuariosIdPUT = ({ id, usuarioInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        usuarioInput,
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
* Crear un nuevo usuario
* Registra un nuevo ciudadano en el sistema LABORA como demandante de empleo activo.
*
* usuarioInput UsuarioInput 
* returns Usuario
* */
const usuariosPOST = ({ usuarioInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        usuarioInput,
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
  usuariosGET,
  usuariosIdDELETE,
  usuariosIdGET,
  usuariosIdPUT,
  usuariosPOST,
};
