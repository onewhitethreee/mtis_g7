import './style.css'
import {
  loginDemo,
  listarOfertas,
  listarCursos,
  aplicarOferta,
  solicitarCertificado,
  suscribirseOfertas,
  suscribirseCursos,
  publicarOferta
} from './api.js'

let usuarioActual = null

document.querySelector('#app').innerHTML = `
  <div class="app">
    <header>
      <h1>LABORA</h1>
      <p>Cliente web de integración con MuleSoft</p>
    </header>

    <main id="contenido"></main>
  </div>
`

mostrarLogin()

function mostrarLogin() {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>Acceso al sistema</h2>
      <p>Selecciona un usuario de demostración para probar los flujos del proyecto.</p>

      <div class="botones">
        <button id="btnDemandante">Entrar como demandante</button>
        <button id="btnRepresentante">Entrar como representante</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnDemandante').addEventListener('click', async () => {
    const respuesta = await loginDemo('demandante')
    if (respuesta.ok) {
      usuarioActual = respuesta.usuario
      mostrarMenu()
    } else {
      mostrarError(respuesta.mensaje)
    }
  })

  document.querySelector('#btnRepresentante').addEventListener('click', async () => {
    const respuesta = await loginDemo('representante')
    if (respuesta.ok) {
      usuarioActual = respuesta.usuario
      mostrarMenu()
    } else {
      mostrarError(respuesta.mensaje)
    }
  })
}

function mostrarMenu() {
  const contenido = document.querySelector('#contenido')

  const botonesDemandante = usuarioActual.rol === 'DEMANDANTE'
    ? `
      <button id="btnVerOfertas">Ver ofertas</button>
      <button id="btnVerCursos">Ver cursos</button>
      <button id="btnCertificado">Solicitar certificado</button>
      <button id="btnSuscripcionOfertas">Suscribirse a ofertas</button>
      <button id="btnSuscripcionCursos">Suscribirse a cursos</button>
    `
    : ''

  const botonesRepresentante = usuarioActual.rol === 'REPRESENTANTE'
    ? `
      <button id="btnVerOfertas">Ver ofertas</button>
      <button id="btnPublicarOferta">Publicar oferta</button>
    `
    : ''

  contenido.innerHTML = `
    <section class="card">
      <h2>Menú principal</h2>

      <div class="usuario">
        <p><strong>Nombre:</strong> ${usuarioActual.nombre}</p>
        <p><strong>Email:</strong> ${usuarioActual.email}</p>
        <p><strong>Rol:</strong> ${usuarioActual.rol}</p>
      </div>

      <div class="botones">
        ${botonesDemandante}
        ${botonesRepresentante}
        <button id="btnSalir" class="secundario">Cerrar sesión</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  activarSiExiste('#btnVerOfertas', mostrarOfertas)
  activarSiExiste('#btnVerCursos', mostrarCursos)
  activarSiExiste('#btnCertificado', mostrarFormularioCertificado)
  activarSiExiste('#btnSuscripcionOfertas', mostrarFormularioSuscripcionOfertas)
  activarSiExiste('#btnSuscripcionCursos', mostrarFormularioSuscripcionCursos)
  activarSiExiste('#btnPublicarOferta', mostrarFormularioPublicarOferta)

  document.querySelector('#btnSalir').addEventListener('click', () => {
    usuarioActual = null
    mostrarLogin()
  })
}

async function mostrarOfertas() {
  const contenido = document.querySelector('#contenido')
  contenido.innerHTML = pantallaCargando('Cargando ofertas de trabajo...')

  const ofertas = await listarOfertas()

  const puedeAplicar = usuarioActual.rol === 'DEMANDANTE'

  contenido.innerHTML = `
    <section class="card">
      <h2>Ofertas de trabajo</h2>

      ${usuarioActual.rol === 'REPRESENTANTE'
        ? '<p class="aviso">Vista de representante: puedes consultar ofertas, pero no aplicar a ellas.</p>'
        : ''
      }

      <div class="lista">
        ${ofertas.length === 0 ? '<p>No hay ofertas disponibles o el servicio REST no está iniciado.</p>' : ''}
        ${ofertas.map(oferta => {
          const id = oferta.id || oferta.id_oferta || oferta.idOferta
          const titulo = oferta.titulo || oferta.nombre || 'Oferta sin título'
          const empresa = oferta.empresa || oferta.nombre_empresa || oferta.cif_empresa || 'Empresa no indicada'
          const ubicacion = oferta.ubicacion || oferta.localidad || 'Ubicación no indicada'
          const sector = oferta.sector || oferta.etiquetas || oferta.categoria || 'Sin sector'

          return `
            <div class="item">
              <h3>${titulo}</h3>
              <p><strong>Empresa:</strong> ${empresa}</p>
              <p><strong>Ubicación:</strong> ${ubicacion}</p>
              <p><strong>Sector/Etiquetas:</strong> ${sector}</p>

              ${puedeAplicar
                ? `<button class="btnAplicar" data-id="${id}">Aplicar</button>`
                : ''
              }
            </div>
          `
        }).join('')}
      </div>

      <div class="botones">
        <button id="btnVolver" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolver').addEventListener('click', mostrarMenu)

  if (puedeAplicar) {
    document.querySelectorAll('.btnAplicar').forEach(boton => {
      boton.addEventListener('click', async () => {
        const idOferta = boton.dataset.id

        if (!idOferta || idOferta === 'undefined') {
          mostrarError('No se puede aplicar porque la oferta no tiene ID válido.')
          return
        }

        mostrarCargando('Enviando candidatura...')
        bloquearBoton(boton, 'Enviando...')

        const respuesta = await aplicarOferta(idOferta, usuarioActual)

        desbloquearBoton(boton, 'Aplicar')

        if (respuesta.ok === false) {
          mostrarError(respuesta.mensaje)
        } else {
          mostrarOk('Candidatura enviada', respuesta.mensaje)
        }
      })
    })
  }
}

async function mostrarCursos() {
  const contenido = document.querySelector('#contenido')
  contenido.innerHTML = pantallaCargando('Cargando cursos de formación...')

  const cursos = await listarCursos()

  contenido.innerHTML = `
    <section class="card">
      <h2>Cursos de formación</h2>

      <div class="lista">
        ${cursos.length === 0 ? '<p>No hay cursos disponibles o el servicio REST no está iniciado.</p>' : ''}
        ${cursos.map(curso => {
          const nombre = curso.nombre || curso.titulo || 'Curso sin nombre'
          const area = curso.area || curso.categoria || curso.etiquetas || 'Sin área'
          const plazas = curso.plazas || curso.plazas_disponibles || 'No indicado'

          return `
            <div class="item">
              <h3>${nombre}</h3>
              <p><strong>Área:</strong> ${area}</p>
              <p><strong>Plazas:</strong> ${plazas}</p>
            </div>
          `
        }).join('')}
      </div>

      <div class="botones">
        <button id="btnVolver" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolver').addEventListener('click', mostrarMenu)
}

function mostrarFormularioCertificado() {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>Solicitud de certificado</h2>

      <label>NIF/NIE</label>
      <input id="nifnie" type="text" value="${usuarioActual.nifnie}">

      <label>Tipo de certificado</label>
      <select id="tipoCertificado">
        <option value="DEMANDANTE_ACTIVO">Demandante activo</option>
        <option value="INSCRIPCION_DEMANDA">Inscripción de demanda</option>
        <option value="SITUACION_LABORAL">Situación laboral</option>
        <option value="FORMACION_REALIZADA">Formación realizada</option>
      </select>

      <label>Motivo</label>
      <textarea id="motivo">Presentación en convocatoria pública</textarea>

      <div class="botones">
        <button id="btnEnviarCertificado">Enviar solicitud</button>
        <button id="btnVolver" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolver').addEventListener('click', mostrarMenu)

  document.querySelector('#btnEnviarCertificado').addEventListener('click', async () => {
    const boton = document.querySelector('#btnEnviarCertificado')

    if (campoVacio('#nifnie')) {
      mostrarError('El NIF/NIE es obligatorio.')
      return
    }

    if (campoVacio('#motivo')) {
      mostrarError('El motivo es obligatorio.')
      return
    }

    const datos = {
      tipoCertificado: document.querySelector('#tipoCertificado').value,
      motivo: document.querySelector('#motivo').value.trim()
    }

    mostrarCargando('Solicitando certificado mediante MuleSoft...')
    bloquearBoton(boton, 'Enviando...')

    const respuesta = await solicitarCertificado(datos, usuarioActual)

    desbloquearBoton(boton, 'Enviar solicitud')

    if (respuesta.ok === false) {
      mostrarError(respuesta.mensaje)
    } else {
      mostrarOk('Solicitud enviada', respuesta.mensaje)
    }
  })
}

function mostrarFormularioSuscripcionOfertas() {
  mostrarFormularioSuscripcion(
    'Suscripción a ofertas de trabajo',
    'Selecciona las etiquetas de ofertas que quieres recibir.',
    'btnGuardarSuscripcionOfertas',
    suscribirseOfertas
  )
}

function mostrarFormularioSuscripcionCursos() {
  mostrarFormularioSuscripcion(
    'Suscripción a cursos de formación',
    'Selecciona las etiquetas de cursos que quieres recibir.',
    'btnGuardarSuscripcionCursos',
    suscribirseCursos
  )
}

function mostrarFormularioSuscripcion(titulo, descripcion, idBoton, funcionApi) {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>${titulo}</h2>
      <p>${descripcion}</p>

      ${crearCheckboxEtiqueta('informatica', 'Informática')}
      ${crearCheckboxEtiqueta('hosteleria', 'Hostelería')}
      ${crearCheckboxEtiqueta('administracion', 'Administración')}
      ${crearCheckboxEtiqueta('sanidad', 'Sanidad')}
      ${crearCheckboxEtiqueta('idiomas', 'Idiomas')}

      <div class="botones">
        <button id="${idBoton}">Guardar suscripción</button>
        <button id="btnVolver" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolver').addEventListener('click', mostrarMenu)

  document.querySelector(`#${idBoton}`).addEventListener('click', async () => {
    const boton = document.querySelector(`#${idBoton}`)
    const etiquetas = Array.from(document.querySelectorAll('.etiqueta:checked'))
      .map(check => check.value)

    if (etiquetas.length === 0) {
      mostrarError('Debes seleccionar al menos una etiqueta.')
      return
    }

    mostrarCargando('Guardando suscripción mediante MuleSoft...')
    bloquearBoton(boton, 'Guardando...')

    const respuesta = await funcionApi(etiquetas, usuarioActual)

    desbloquearBoton(boton, 'Guardar suscripción')

    if (respuesta.ok === false) {
      mostrarError(respuesta.mensaje)
    } else {
      mostrarOk('Suscripción guardada', `${respuesta.mensaje}<br><strong>Etiquetas:</strong> ${etiquetas.join(', ')}`)
    }
  })
}

function mostrarFormularioPublicarOferta() {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>Publicar oferta de trabajo</h2>

      <label>Título</label>
      <input id="tituloOferta" type="text" value="Desarrollador Frontend Junior">

      <label>Descripción</label>
      <textarea id="descripcionOferta">Oferta de trabajo para incorporación inmediata.</textarea>

      <label>Duración del contrato</label>
      <input id="duracionContrato" type="text" value="6 meses">

      <p class="subtitulo">Etiquetas</p>
      ${crearCheckboxEtiqueta('informatica', 'Informática')}
      ${crearCheckboxEtiqueta('programacion', 'Programación')}
      ${crearCheckboxEtiqueta('frontend', 'Frontend')}
      ${crearCheckboxEtiqueta('administracion', 'Administración')}

      <div class="botones">
        <button id="btnGuardarOferta">Publicar oferta</button>
        <button id="btnVolver" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolver').addEventListener('click', mostrarMenu)

  document.querySelector('#btnGuardarOferta').addEventListener('click', async () => {
    const boton = document.querySelector('#btnGuardarOferta')

    if (campoVacio('#tituloOferta')) {
      mostrarError('El título de la oferta es obligatorio.')
      return
    }

    if (campoVacio('#descripcionOferta')) {
      mostrarError('La descripción de la oferta es obligatoria.')
      return
    }

    if (campoVacio('#duracionContrato')) {
      mostrarError('La duración del contrato es obligatoria.')
      return
    }

    const etiquetas = Array.from(document.querySelectorAll('.etiqueta:checked'))
      .map(check => check.value)

    if (etiquetas.length === 0) {
      mostrarError('Debes seleccionar al menos una etiqueta.')
      return
    }

    const datos = {
      titulo: document.querySelector('#tituloOferta').value.trim(),
      descripcion: document.querySelector('#descripcionOferta').value.trim(),
      duracionContrato: document.querySelector('#duracionContrato').value.trim(),
      etiquetas
    }

    mostrarCargando('Publicando oferta mediante MuleSoft...')
    bloquearBoton(boton, 'Publicando...')

    const respuesta = await publicarOferta(datos, usuarioActual)

    desbloquearBoton(boton, 'Publicar oferta')

    if (respuesta.ok === false) {
      mostrarError(respuesta.mensaje)
    } else {
      mostrarOk('Oferta publicada', respuesta.mensaje)
    }
  })
}

function crearCheckboxEtiqueta(valor, texto) {
  return `
    <label class="check">
      <input type="checkbox" class="etiqueta" value="${valor}">
      ${texto}
    </label>
  `
}

function activarSiExiste(selector, funcion) {
  const elemento = document.querySelector(selector)
  if (elemento) {
    elemento.addEventListener('click', funcion)
  }
}

function campoVacio(selector) {
  return document.querySelector(selector).value.trim() === ''
}

function pantallaCargando(mensaje) {
  return `
    <section class="card">
      <h2>${mensaje}</h2>
      <p class="aviso">Conectando con servicios...</p>
    </section>
  `
}

function mostrarCargando(mensaje) {
  const resultado = document.querySelector('#resultado')
  if (resultado) {
    resultado.innerHTML = `
      <div class="aviso">
        <p>${mensaje}</p>
      </div>
    `
  }
}

function mostrarOk(titulo, mensaje) {
  const resultado = document.querySelector('#resultado')
  if (resultado) {
    resultado.innerHTML = `
      <div class="ok">
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
      </div>
    `
  }
}

function mostrarError(mensaje) {
  const resultado = document.querySelector('#resultado')
  if (resultado) {
    resultado.innerHTML = `
      <div class="error">
        <h3>Error</h3>
        <p>${mensaje}</p>
      </div>
    `
  }
}

function bloquearBoton(boton, texto) {
  boton.disabled = true
  boton.textContent = texto
}

function desbloquearBoton(boton, texto) {
  boton.disabled = false
  boton.textContent = texto
}
