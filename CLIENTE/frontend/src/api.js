const API_BASE_URL = 'http://localhost:8081/api'

// De momento usamos mocks.
// Cuando MuleSoft esté listo, cambia esto a false.
const USAR_MOCKS = true

export async function login(correo, password) {
  if (USAR_MOCKS) {
    const esRepresentante = correo.includes('empresa') || correo.includes('representante')

    return esperar({
      ok: true,
      usuario: {
        id: esRepresentante ? 2 : 1,
        nombre: esRepresentante ? 'Representante Empresa' : 'Walter Bates',
        correo: correo,
        rol: esRepresentante ? 'REPRESENTANTE' : 'DEMANDANTE'
      }
    })
  }

  return llamarApi(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: {
      correo,
      password
    }
  })
}

export async function listarOfertas() {
  if (USAR_MOCKS) {
    return esperar([
      {
        id: 1,
        titulo: 'Desarrollador Java Junior',
        empresa: 'Empresa Demo',
        ubicacion: 'Alicante',
        sector: 'Informática'
      },
      {
        id: 2,
        titulo: 'Camarero/a',
        empresa: 'Hotel Demo',
        ubicacion: 'Valencia',
        sector: 'Hostelería'
      },
      {
        id: 3,
        titulo: 'Auxiliar administrativo',
        empresa: 'Gestoría Demo',
        ubicacion: 'Elche',
        sector: 'Administración'
      }
    ])
  }

  const respuesta = await llamarApi(`${API_BASE_URL}/ofertas`)

  if (Array.isArray(respuesta)) {
    return respuesta
  }

  return []
}

export async function aplicarOferta(idOferta, correoUsuario) {
  if (USAR_MOCKS) {
    return esperar({
      ok: true,
      mensaje: `Solicitud enviada correctamente para la oferta ${idOferta}`
    })
  }

  return llamarApi(`${API_BASE_URL}/ofertas/${idOferta}/aplicar`, {
    method: 'POST',
    body: {
      correoUsuario
    }
  })
}

export async function solicitarCertificado(datos) {
  if (USAR_MOCKS) {
    return esperar({
      ok: true,
      idCertificacion: 1001,
      estado: 'PENDIENTE',
      mensaje: 'La solicitud de certificado se ha enviado correctamente.'
    })
  }

  return llamarApi(`${API_BASE_URL}/certificaciones`, {
    method: 'POST',
    body: datos
  })
}

export async function suscribirseOfertas(datos) {
  if (USAR_MOCKS) {
    return esperar({
      ok: true,
      mensaje: 'Suscripción a ofertas guardada correctamente.'
    })
  }

  return llamarApi(`${API_BASE_URL}/suscripciones/ofertas`, {
    method: 'POST',
    body: datos
  })
}

export async function suscribirseCursos(datos) {
  if (USAR_MOCKS) {
    return esperar({
      ok: true,
      mensaje: 'Suscripción a cursos guardada correctamente.'
    })
  }

  return llamarApi(`${API_BASE_URL}/suscripciones/cursos`, {
    method: 'POST',
    body: datos
  })
}

export async function publicarOferta(datos) {
  if (USAR_MOCKS) {
    return esperar({
      ok: true,
      idOferta: 2001,
      mensaje: 'Oferta publicada correctamente.'
    })
  }

  return llamarApi(`${API_BASE_URL}/ofertas`, {
    method: 'POST',
    body: datos
  })
}

async function llamarApi(url, opciones = {}) {
  try {
    const config = {
      method: opciones.method || 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (opciones.body) {
      config.body = JSON.stringify(opciones.body)
    }

    const respuesta = await fetch(url, config)

    let datos = {}

    try {
      datos = await respuesta.json()
    } catch {
      datos = {}
    }

    if (!respuesta.ok) {
      return {
        ok: false,
        mensaje: datos.mensaje || `Error HTTP ${respuesta.status}`
      }
    }

    return datos
  } catch (error) {
    return {
      ok: false,
      mensaje: 'No se pudo conectar con MuleSoft. Comprueba que el servidor está iniciado.'
    }
  }
}

function esperar(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500)
  })
}