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

  if (!usuario) {
    return {
      ok: false,
      mensaje: 'Usuario de demo no válido.'
    }
  }

  return {
    ok: true,
    usuario
  }
}

export async function listarOfertas() {
  const datos = await llamarApi('/rest/ofertas?estado=ACTIVA&s=50')
  return normalizarLista(datos)
}

export async function listarCursos() {
  const datos = await llamarApi('/rest/cursos?s=50')
  return normalizarLista(datos)
}

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

  return {
    ok: true,
    mensaje: `Candidatura enviada correctamente para la oferta ${idOferta}.`
  }
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

  return {
    ok: true,
    mensaje: 'Solicitud de certificado enviada correctamente.'
  }
}

export async function suscribirseOfertas(etiquetas, usuario) {
  const respuesta = await llamarApi('/orquestacion/suscripciones', {
    method: 'POST',
    body: {
      id_usuario: usuario.nifnie,
      tipo: 'OFERTA',
      etiquetas,
      email_usuario: usuario.email
    }
  })

  if (respuesta.ok === false) return respuesta

  return {
    ok: true,
    mensaje: 'Suscripción a ofertas guardada correctamente.'
  }
}

export async function suscribirseCursos(etiquetas, usuario) {
  const respuesta = await llamarApi('/orquestacion/suscripciones', {
    method: 'POST',
    body: {
      id_usuario: usuario.nifnie,
      tipo: 'CURSO',
      etiquetas,
      email_usuario: usuario.email
    }
  })

  if (respuesta.ok === false) return respuesta

  return {
    ok: true,
    mensaje: 'Suscripción a cursos guardada correctamente.'
  }
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

  return {
    ok: true,
    mensaje: 'Oferta enviada a MuleSoft para su publicación.'
  }
}

export async function listarMisCandidaturas(nifnie) {
  const datos = await llamarApi(`/rest/candidaturas?id_candidato=${encodeURIComponent(nifnie)}`)
  return normalizarLista(datos)
}

export async function listarMisSuscripciones(nifnie) {
  const datos = await llamarApi(`/rest/suscripciones?id_usuario=${encodeURIComponent(nifnie)}`)
  return normalizarLista(datos)
}

export async function cancelarSuscripcion(id) {
  return await llamarApi(`/rest/suscripciones/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function listarOfertasEmpresa(cifEmpresa) {
  const datos = await llamarApi(`/rest/ofertas?cif_empresa=${encodeURIComponent(cifEmpresa)}&s=50`)
  return normalizarLista(datos)
}

export async function listarCandidaturasOferta(idOferta) {
  const datos = await llamarApi(`/rest/candidaturas?id_oferta=${encodeURIComponent(idOferta)}`)
  return normalizarLista(datos)
}

async function llamarApi(url, opciones = {}) {
  try {
    const config = {
      method: opciones.method || 'GET',
      headers: {
        Accept: 'application/json'
      }
    }

    if (opciones.body) {
      config.headers['Content-Type'] = 'application/json'
      config.body = JSON.stringify(opciones.body)
    }

    const respuesta = await fetch(url, config)
    const texto = await respuesta.text()

    let datos = {}

    if (texto) {
      try {
        datos = JSON.parse(texto)
      } catch {
        datos = { mensaje: texto }
      }
    }

    if (!respuesta.ok) {
      return {
        ok: false,
        mensaje: datos.mensaje || datos.error || `Error HTTP ${respuesta.status}`
      }
    }

    return datos
  } catch (error) {
    return {
      ok: false,
      mensaje: 'No se pudo conectar con el servidor. Revisa REST, SOAP y MuleSoft.'
    }
  }
}

function normalizarLista(datos) {
  if (Array.isArray(datos)) return datos
  if (Array.isArray(datos.resultados)) return datos.resultados
  if (Array.isArray(datos.payload)) return datos.payload
  if (Array.isArray(datos.data)) return datos.data
  return []
}
