/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Validar tipo de certificado solicitado
* Verifica que el tipo de certificado solicitado existe y es válido para el demandante. Usado en el Flujo 3.
*
* validacionCertificadoInput ValidacionCertificadoInput 
* returns ValidacionResponse
* */
const validacionCertificadosPOST = ({ validacionCertificadoInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        validacionCertificadoInput,
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
* Validar elegibilidad de un demandante para una oferta
* Verifica si un demandante cumple los requisitos de una oferta de trabajo antes de registrar su candidatura. Usado en el Flujo 2.
*
* validacionElegibilidadInput ValidacionElegibilidadInput 
* returns ValidacionResponse
* */
const validacionElegibilidadPOST = ({ validacionElegibilidadInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        validacionElegibilidadInput,
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
* Validar etiquetas de suscripción
* Verifica que las etiquetas seleccionadas por el demandante existen en el sistema. Usado en el Flujo 5.
*
* validacionEtiquetasInput ValidacionEtiquetasInput 
* returns ValidacionResponse
* */
const validacionEtiquetasPOST = ({ validacionEtiquetasInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        validacionEtiquetasInput,
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
* Validar datos de un usuario
* Valida el formato y completitud de los datos de un nuevo usuario antes de su registro. Usado en el Flujo 4.
*
* validacionUsuarioInput ValidacionUsuarioInput 
* returns ValidacionResponse
* */
const validacionUsuariosPOST = ({ validacionUsuarioInput }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        validacionUsuarioInput,
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
  validacionCertificadosPOST,
  validacionElegibilidadPOST,
  validacionEtiquetasPOST,
  validacionUsuariosPOST,
};
