/* eslint-disable no-unused-vars */
const pool = require('./db');
const Service = require('./Service');

/**
* Validar tipo de certificado solicitado
* Verifica que el tipo de certificado solicitado existe y es válido para el demandante. Usado en el Flujo 3.
*
* validacionCertificadoInput ValidacionCertificadoInput 
* returns ValidacionResponse
* */
const validacionCertificadosPOST = ({ validacionCertificadoInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const data = validacionCertificadoInput || body;
      const { id_usuario, tipo_certificado } = data;
      
      if (!id_usuario || !tipo_certificado) {
        return reject(Service.rejectResponse('Datos de validación incompletos', 400));
      }

      const [usuario] = await pool.query('SELECT * FROM usuario WHERE id_nie = ?', [id_usuario]);
      if (!usuario.length) {
        return reject(Service.rejectResponse('Usuario no encontrado', 404));
      }

      const [certificado] = await pool.query('SELECT * FROM certificado WHERE tipo = ?', [tipo_certificado]);
      if (!certificado.length) {
        return reject(Service.rejectResponse('Tipo de certificado no válido', 400));
      }

      resolve(Service.successResponse({
        valido: true,
        mensaje: 'Usuario elegible para certificado',
      }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
const validacionElegibilidadPOST = ({ validacionElegibilidadInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const data = validacionElegibilidadInput || body;
      const { id_usuario, id_oferta } = data;

      if (!id_usuario || !id_oferta) {
        return reject(Service.rejectResponse('Datos de validación incompletos', 400));
      }

      const [usuario] = await pool.query('SELECT * FROM usuario WHERE id_nie = ?', [id_usuario]);
      if (!usuario.length) {
        return reject(Service.rejectResponse('Usuario no encontrado', 404));
      }

      const [oferta] = await pool.query('SELECT * FROM oferta WHERE id = ?', [id_oferta]);
      if (!oferta.length) {
        return reject(Service.rejectResponse('Oferta no encontrada', 404));
      }

      const [ofertaEtiquetas] = await pool.query(
        'SELECT e.nombre FROM etiqueta e INNER JOIN oferta_etiqueta oe ON e.id = oe.id_etiqueta WHERE oe.id_oferta = ?',
        [id_oferta],
      );
      const [usuarioEtiquetas] = await pool.query(
        'SELECT e.nombre FROM etiqueta e INNER JOIN suscripcion_etiqueta se ON e.id = se.id_etiqueta INNER JOIN suscripcion s ON se.id_suscripcion = s.id WHERE s.id_usuario = ? AND s.activa = 1',
        [id_usuario],
      );

      const ofertaTags = ofertaEtiquetas.map((row) => row.nombre);
      const usuarioTags = usuarioEtiquetas.map((row) => row.nombre);
      const cumpleRequisitos = ofertaTags.some((tag) => usuarioTags.includes(tag));

      resolve(Service.successResponse({
        valido: cumpleRequisitos,
        mensaje: cumpleRequisitos ? 'Usuario cumple requisitos' : 'Usuario no cumple requisitos',
      }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
const validacionEtiquetasPOST = ({ validacionEtiquetasInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const data = validacionEtiquetasInput || body;
      const { etiquetas } = data;

      if (!etiquetas || etiquetas.length === 0) {
        return reject(Service.rejectResponse('Etiquetas no proporcionadas', 400));
      }

      const etiquetasArray = Array.isArray(etiquetas) ? etiquetas : etiquetas.split(',');
      const placeholders = etiquetasArray.map(() => '?').join(',');
      const [rows] = await pool.query(`SELECT * FROM etiqueta WHERE nombre IN (${placeholders})`, etiquetasArray);

      const etiquetasValidas = rows.length === etiquetasArray.length;

      resolve(Service.successResponse({
        valido: etiquetasValidas,
        mensaje: etiquetasValidas ? 'Todas las etiquetas son válidas' : 'Algunas etiquetas no son válidas',
      }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
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
const validacionUsuariosPOST = ({ validacionUsuarioInput, body }) => new Promise(
  async (resolve, reject) => {
    try {
      const data = validacionUsuarioInput || body;
      const { nombre, apellidos, email, id_nie } = data;

      const errores = [];
      if (!nombre || nombre.trim() === '') errores.push('Nombre requerido');
      if (!apellidos || apellidos.trim() === '') errores.push('Apellidos requeridos');
      if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errores.push('Email inválido');
      if (!id_nie || id_nie.trim() === '') errores.push('NIF/NIE requerido');

      if (errores.length > 0) {
        return reject(Service.rejectResponse(errores.join(', '), 400));
      }

      const [usuarioExistente] = await pool.query('SELECT * FROM usuario WHERE id_nie = ? OR email = ?', [id_nie, email]);
      if (usuarioExistente.length > 0) {
        return reject(Service.rejectResponse('Usuario o email ya existe', 400));
      }

      resolve(Service.successResponse({
        valido: true,
        mensaje: 'Datos de usuario válidos',
      }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 500));
    }
  },
);

module.exports = {
  validacionCertificadosPOST,
  validacionElegibilidadPOST,
  validacionEtiquetasPOST,
  validacionUsuariosPOST,
};
