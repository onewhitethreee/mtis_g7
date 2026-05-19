const DEMO_USERS = {
  demandante: {
    nifnie: '12345678A',
    nombre: 'María García López',
    email: 'maria.garcia@email.com',
    rol: 'DEMANDANTE',
    contrasenaSoap: '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz01'
  },
  representante: {
    nifnie: '77665544H',
    nombre: 'Roberto Díaz Herrera',
    email: 'roberto.diaz@email.com',
    rol: 'REPRESENTANTE',
    cifEmpresa: 'B12345678',
    correoEmpresa: 'contacto@techsolutions.es',
    empresa: 'TechSolutions',
    contrasenaSoap: '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz08'
  }
}

export async function loginDemo(tipoUsuario) {
  const usuario = DEMO_USERS[tipoUsuario]
  if (!usuario) return { ok: false, mensaje: 'Usuario de demo no válido.' }
  return { ok: true, usuario }
}

// ─── OFERTAS ──────────────────────────────────────────────────────────────────

export async function listarOfertas() {
  const datos = await llamarApi('/rest/ofertas?estado=ACTIVA&s=50')
  return normalizarLista(datos)
}

export async function listarTodasOfertas() {
  const datos = await llamarApi('/rest/ofertas?s=50')
  return normalizarLista(datos)
}

export async function listarOfertasEmpresa(cifEmpresa) {
  const datos = await llamarApi(`/rest/ofertas?cif_empresa=${encodeURIComponent(cifEmpresa)}&s=50`)
  return normalizarLista(datos)
}

export async function obtenerOferta(id) {
  return await llamarApi(`/rest/ofertas/${encodeURIComponent(id)}`)
}

export async function actualizarOferta(id, datos) {
  return await llamarApi(`/rest/ofertas/${encodeURIComponent(id)}`, { method: 'PUT', body: datos })
}

export async function eliminarOferta(id) {
  return await llamarApi(`/rest/ofertas/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

// ─── CURSOS ───────────────────────────────────────────────────────────────────

export async function listarCursos() {
  const datos = await llamarApi('/rest/cursos?s=50')
  return normalizarLista(datos)
}

export async function crearCurso(datos) {
  return await llamarApi('/rest/cursos', { method: 'POST', body: datos })
}

export async function obtenerCurso(id) {
  return await llamarApi(`/rest/cursos/${encodeURIComponent(id)}`)
}

export async function actualizarCurso(id, datos) {
  return await llamarApi(`/rest/cursos/${encodeURIComponent(id)}`, { method: 'PUT', body: datos })
}

export async function eliminarCurso(id) {
  return await llamarApi(`/rest/cursos/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

// ─── USUARIOS ─────────────────────────────────────────────────────────────────

export async function listarUsuarios(tipo = '') {
  const q = tipo ? `?tipo=${encodeURIComponent(tipo)}&s=50` : '?s=50'
  const datos = await llamarApi(`/rest/usuarios${q}`)
  return normalizarLista(datos)
}

export async function obtenerUsuario(nifnie) {
  return await llamarApi(`/rest/usuarios/${encodeURIComponent(nifnie)}`)
}

export async function crearUsuario(datos) {
  return await llamarApi('/rest/usuarios', { method: 'POST', body: datos })
}

export async function actualizarUsuario(nifnie, datos) {
  return await llamarApi(`/rest/usuarios/${encodeURIComponent(nifnie)}`, { method: 'PUT', body: datos })
}

export async function eliminarUsuario(nifnie) {
  return await llamarApi(`/rest/usuarios/${encodeURIComponent(nifnie)}`, { method: 'DELETE' })
}

// ─── EMPRESAS ─────────────────────────────────────────────────────────────────

export async function listarEmpresas() {
  const datos = await llamarApi('/rest/empresas?s=50')
  return normalizarLista(datos)
}

export async function obtenerEmpresa(cif) {
  return await llamarApi(`/rest/empresas/${encodeURIComponent(cif)}`)
}

export async function crearEmpresa(datos) {
  return await llamarApi('/rest/empresas', { method: 'POST', body: datos })
}

export async function actualizarEmpresa(cif, datos) {
  return await llamarApi(`/rest/empresas/${encodeURIComponent(cif)}`, { method: 'PUT', body: datos })
}

export async function eliminarEmpresa(cif) {
  return await llamarApi(`/rest/empresas/${encodeURIComponent(cif)}`, { method: 'DELETE' })
}

// ─── CANDIDATURAS ─────────────────────────────────────────────────────────────

export async function listarMisCandidaturas(nifnie) {
  const datos = await llamarApi(`/rest/candidaturas?id_candidato=${encodeURIComponent(nifnie)}`)
  return normalizarLista(datos)
}

export async function listarCandidaturasOferta(idOferta) {
  const datos = await llamarApi(`/rest/candidaturas?id_oferta=${encodeURIComponent(idOferta)}`)
  return normalizarLista(datos)
}

export async function listarTodasCandidaturas() {
  const datos = await llamarApi('/rest/candidaturas?s=50')
  return normalizarLista(datos)
}

export async function obtenerCandidatura(id) {
  return await llamarApi(`/rest/candidaturas/${encodeURIComponent(id)}`)
}

export async function actualizarCandidatura(id, datos) {
  return await llamarApi(`/rest/candidaturas/${encodeURIComponent(id)}`, { method: 'PUT', body: datos })
}

export async function eliminarCandidatura(id) {
  return await llamarApi(`/rest/candidaturas/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

// ─── SUSCRIPCIONES ────────────────────────────────────────────────────────────

export async function listarMisSuscripciones(nifnie) {
  const datos = await llamarApi(`/rest/suscripciones?id_usuario=${encodeURIComponent(nifnie)}`)
  return normalizarLista(datos)
}

export async function cancelarSuscripcion(id) {
  return await llamarApi(`/rest/suscripciones/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function listarTodasSuscripciones() {
  const datos = await llamarApi('/rest/suscripciones?s=50')
  return normalizarLista(datos)
}

export async function obtenerSuscripcion(id) {
  return await llamarApi(`/rest/suscripciones/${encodeURIComponent(id)}`)
}

// ─── VALIDACIONES ─────────────────────────────────────────────────────────────

export async function validarUsuario(datos) {
  return await llamarApi('/rest/validacion/usuarios', { method: 'POST', body: datos })
}

export async function validarCertificado(datos) {
  return await llamarApi('/rest/validacion/certificados', { method: 'POST', body: datos })
}

export async function validarEtiquetas(etiquetas) {
  return await llamarApi('/rest/validacion/etiquetas', { method: 'POST', body: { etiquetas } })
}

export async function validarElegibilidad(id_usuario, id_oferta) {
  return await llamarApi('/rest/validacion/elegibilidad', { method: 'POST', body: { id_usuario, id_oferta } })
}

// ─── NOTIFICACIONES ───────────────────────────────────────────────────────────

export async function enviarNotificacion(datos) {
  return await llamarApi('/rest/notificaciones', { method: 'POST', body: datos })
}

export async function obtenerNotificacion(id) {
  return await llamarApi(`/rest/notificaciones/${encodeURIComponent(id)}`)
}

// ─── ORQUESTACIÓN MULESOFT ────────────────────────────────────────────────────

export async function aplicarOferta(idOferta, usuario) {
  const respuesta = await llamarApi('/orquestacion/candidaturas', {
    method: 'POST',
    body: {
      nifnie: usuario.nifnie,
      contrasena: usuario.contrasenaSoap,
      id_oferta: idOferta,
      email_usuario: usuario.email
    }
  })
  if (respuesta.ok === false) return respuesta
  return { ok: true, mensaje: `Candidatura enviada correctamente para la oferta ${idOferta}.` }
}

export async function solicitarCertificado(datos, usuario) {
  const respuesta = await llamarApi('/orquestacion/certificados', {
    method: 'POST',
    body: {
      nifnie: usuario.nifnie,
      contrasena: usuario.contrasenaSoap,
      tipo_certificado: datos.tipoCertificado,
      motivo: datos.motivo,
      email_usuario: usuario.email
    }
  })
  if (respuesta.ok === false) return respuesta
  return { ok: true, mensaje: 'Solicitud de certificado enviada correctamente.' }
}

export async function suscribirseOfertas(etiquetas, usuario) {
  const respuesta = await llamarApi('/orquestacion/suscripciones', {
    method: 'POST',
    body: { id_usuario: usuario.nifnie, tipo: 'OFERTA', etiquetas, email_usuario: usuario.email }
  })
  if (respuesta.ok === false) return respuesta
  return { ok: true, mensaje: 'Suscripción a ofertas guardada correctamente.' }
}

export async function suscribirseCursos(etiquetas, usuario) {
  const respuesta = await llamarApi('/orquestacion/suscripciones', {
    method: 'POST',
    body: { id_usuario: usuario.nifnie, tipo: 'CURSO', etiquetas, email_usuario: usuario.email }
  })
  if (respuesta.ok === false) return respuesta
  return { ok: true, mensaje: 'Suscripción a cursos guardada correctamente.' }
}

export async function publicarOferta(datos, usuario) {
  const respuesta = await llamarApi('/orquestacion/ofertas', {
    method: 'POST',
    body: {
      cif_empresa: usuario.cifEmpresa,
      correo_empresa: usuario.correoEmpresa,
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      duracion_contrato: datos.duracionContrato,
      etiquetas: datos.etiquetas
    }
  })
  if (respuesta.ok === false) return respuesta
  return { ok: true, mensaje: 'Oferta enviada a MuleSoft para su publicación.' }
}

// ─── Internos ─────────────────────────────────────────────────────────────────

async function llamarApi(url, opciones = {}) {
  try {
    const config = {
      method: opciones.method || 'GET',
      headers: { Accept: 'application/json' }
    }
    if (opciones.body) {
      config.headers['Content-Type'] = 'application/json'
      config.body = JSON.stringify(opciones.body)
    }
    const respuesta = await fetch(url, config)
    const texto = await respuesta.text()
    let datos = {}
    if (texto) {
      try { datos = JSON.parse(texto) } catch { datos = { mensaje: texto } }
    }
    if (!respuesta.ok) {
      return { ok: false, mensaje: datos.mensaje || datos.error || `Error HTTP ${respuesta.status}` }
    }
    return datos
  } catch {
    return { ok: false, mensaje: 'No se pudo conectar con el servidor. Revisa REST, SOAP y MuleSoft.' }
  }
}

function normalizarLista(datos) {
  if (Array.isArray(datos)) return datos
  if (Array.isArray(datos.resultados)) return datos.resultados
  if (Array.isArray(datos.payload)) return datos.payload
  if (Array.isArray(datos.data)) return datos.data
  return []
}
