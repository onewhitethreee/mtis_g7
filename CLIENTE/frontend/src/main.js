import './style.css'
import {
  login,
  solicitarCertificado,
  listarOfertas,
  aplicarOferta,
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
      <h2>Inicio de sesión</h2>

      <label>Correo</label>
      <input id="correo" type="email" value="walter.bates@labora.es">

      <label>Contraseña</label>
      <input id="password" type="password" value="bpm">

      <button id="btnLogin">Entrar</button>

      <p id="mensaje" class="mensaje"></p>
    </section>
  `

  document.querySelector('#btnLogin').addEventListener('click', async () => {
    const correo = document.querySelector('#correo').value
    const password = document.querySelector('#password').value

    const respuesta = await login(correo, password)

    if (respuesta.ok) {
      usuarioActual = respuesta.usuario
      mostrarMenu()
    } else {
      document.querySelector('#mensaje').textContent = 'Error al iniciar sesión'
    }
  })
}

function mostrarMenu() {
  const contenido = document.querySelector('#contenido')

  const botonesDemandante = usuarioActual.rol === 'DEMANDANTE'
    ? `
      <button id="btnOfertas">Ver ofertas</button>
      <button id="btnCertificado">Solicitar certificado</button>
      <button id="btnSuscripcionOfertas">Suscribirse a ofertas</button>
      <button id="btnSuscripcionCursos">Suscribirse a cursos</button>
    `
    : ''

  const botonesRepresentante = usuarioActual.rol === 'REPRESENTANTE'
    ? `
      <button id="btnOfertas">Ver ofertas</button>
      <button id="btnPublicarOferta">Publicar oferta</button>
    `
    : ''

  contenido.innerHTML = `
    <section class="card">
      <h2>Menú principal</h2>

      <p><strong>Usuario:</strong> ${usuarioActual.nombre}</p>
      <p><strong>Correo:</strong> ${usuarioActual.correo}</p>
      <p><strong>Rol:</strong> ${usuarioActual.rol}</p>

      <div class="botones">
        ${botonesDemandante}
        ${botonesRepresentante}
        <button id="btnSalir" class="secundario">Cerrar sesión</button>
      </div>
    </section>
  `

  const btnOfertas = document.querySelector('#btnOfertas')
  if (btnOfertas) {
    btnOfertas.addEventListener('click', mostrarOfertas)
  }

  const btnCertificado = document.querySelector('#btnCertificado')
  if (btnCertificado) {
    btnCertificado.addEventListener('click', mostrarFormularioCertificado)
  }

  const btnSuscripcionOfertas = document.querySelector('#btnSuscripcionOfertas')
  if (btnSuscripcionOfertas) {
    btnSuscripcionOfertas.addEventListener('click', mostrarFormularioSuscripcionOfertas)
  }

  const btnSuscripcionCursos = document.querySelector('#btnSuscripcionCursos')
  if (btnSuscripcionCursos) {
    btnSuscripcionCursos.addEventListener('click', mostrarFormularioSuscripcionCursos)
  }

  const btnPublicarOferta = document.querySelector('#btnPublicarOferta')
  if (btnPublicarOferta) {
    btnPublicarOferta.addEventListener('click', mostrarFormularioPublicarOferta)
  }

  document.querySelector('#btnSalir').addEventListener('click', () => {
    usuarioActual = null
    mostrarLogin()
  })
}

function mostrarFormularioCertificado() {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>Solicitud de certificado</h2>

      <label>NIF/NIE</label>
      <input id="nifnie" type="text" value="12345678A">

      <label>Tipo de certificado</label>
      <select id="tipo">
        <option value="DEMANDANTE_ACTIVO">Demandante activo</option>
        <option value="INSCRIPCION_DEMANDA">Inscripción de demanda</option>
        <option value="SITUACION_LABORAL">Situación laboral</option>
        <option value="FORMACION_REALIZADA">Formación realizada</option>
      </select>

      <label>Motivo</label>
      <textarea id="motivo">Presentación en convocatoria pública</textarea>

      <div class="botones">
        <button id="btnEnviar">Enviar solicitud</button>
        <button id="btnVolver" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnEnviar').addEventListener('click', enviarSolicitudCertificado)
  document.querySelector('#btnVolver').addEventListener('click', mostrarMenu)
}

async function enviarSolicitudCertificado() {
  const boton = document.querySelector('#btnEnviar')

  if (campoVacio('#nifnie')) {
    mostrarError('El NIF/NIE es obligatorio.')
    return
  }

  if (campoVacio('#motivo')) {
    mostrarError('El motivo de la solicitud es obligatorio.')
    return
  }

  const datos = {
    nifnie: document.querySelector('#nifnie').value.trim(),
    tipo: document.querySelector('#tipo').value,
    motivo: document.querySelector('#motivo').value.trim(),
    correoUsuario: usuarioActual.correo
  }

  mostrarCargando('Enviando solicitud de certificado...')
  bloquearBoton(boton, 'Enviando...')

  const respuesta = await solicitarCertificado(datos)

  desbloquearBoton(boton, 'Enviar solicitud')

  const resultado = document.querySelector('#resultado')

  if (respuesta.ok) {
    resultado.innerHTML = `
      <div class="ok">
        <h3>Solicitud enviada correctamente</h3>
        <p><strong>ID certificación:</strong> ${respuesta.idCertificacion}</p>
        <p><strong>Estado:</strong> ${respuesta.estado}</p>
        <p>${respuesta.mensaje}</p>
      </div>
    `
  } else {
    mostrarError(respuesta.mensaje || 'No se pudo enviar la solicitud.')
  }
}

async function mostrarOfertas() {
  const contenido = document.querySelector('#contenido')
  const ofertas = await listarOfertas()

  const puedeAplicar = usuarioActual.rol === 'DEMANDANTE'

  contenido.innerHTML = `
    <section class="card">
      <h2>Ofertas de trabajo</h2>

      ${usuarioActual.rol === 'REPRESENTANTE'
        ? '<p class="aviso">Vista de representante: puedes consultar ofertas, pero no aplicar a ellas.</p>'
        : ''
      }

      <div class="lista-ofertas">
        ${ofertas.map(oferta => `
          <div class="oferta">
            <h3>${oferta.titulo}</h3>
            <p><strong>Empresa:</strong> ${oferta.empresa}</p>
            <p><strong>Ubicación:</strong> ${oferta.ubicacion}</p>
            <p><strong>Sector:</strong> ${oferta.sector}</p>

            ${puedeAplicar
              ? `<button class="btnAplicar" data-id="${oferta.id}">Aplicar</button>`
              : ''
            }
          </div>
        `).join('')}
      </div>

      <button id="btnVolverMenu" class="secundario">Volver</button>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolverMenu').addEventListener('click', mostrarMenu)

  if (puedeAplicar) {
    document.querySelectorAll('.btnAplicar').forEach(boton => {
      boton.addEventListener('click', async () => {
        const idOferta = boton.dataset.id
        const respuesta = await aplicarOferta(idOferta, usuarioActual.correo)

        document.querySelector('#resultado').innerHTML = `
          <div class="ok">
            <h3>Aplicación enviada</h3>
            <p>${respuesta.mensaje}</p>
          </div>
        `
      })
    })
  }
}

function mostrarFormularioSuscripcionOfertas() {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>Suscripción a ofertas de trabajo</h2>

      <p>Selecciona los sectores de ofertas que quieres recibir.</p>

      <label>
        <input type="checkbox" class="sectorOferta" value="Informática">
        Informática
      </label>

      <label>
        <input type="checkbox" class="sectorOferta" value="Hostelería">
        Hostelería
      </label>

      <label>
        <input type="checkbox" class="sectorOferta" value="Administración">
        Administración
      </label>

      <label>
        <input type="checkbox" class="sectorOferta" value="Sanidad">
        Sanidad
      </label>

      <div class="botones">
        <button id="btnGuardarSuscripcionOfertas">Guardar suscripción</button>
        <button id="btnVolverMenu" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolverMenu').addEventListener('click', mostrarMenu)

  document.querySelector('#btnGuardarSuscripcionOfertas').addEventListener('click', async () => {
    const sectores = Array.from(document.querySelectorAll('.sectorOferta:checked'))
      .map(check => check.value)

    if (sectores.length === 0) {
      mostrarError('Debes seleccionar al menos un sector.')
      return
    }

    const boton = document.querySelector('#btnGuardarSuscripcionOfertas')
    mostrarCargando('Guardando suscripción a ofertas...')
    bloquearBoton(boton, 'Guardando...')

    const datos = {
      correoUsuario: usuarioActual.correo,
      sectores: sectores
    }

    const respuesta = await suscribirseOfertas(datos)
    desbloquearBoton(boton, 'Guardar suscripción')

    document.querySelector('#resultado').innerHTML = `
      <div class="ok">
        <h3>Suscripción guardada</h3>
        <p>${respuesta.mensaje}</p>
        <p><strong>Sectores:</strong> ${sectores.join(', ') || 'Ninguno'}</p>
      </div>
    `
  })
}

function mostrarFormularioSuscripcionCursos() {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>Suscripción a cursos de formación</h2>

      <p>Selecciona las áreas de cursos que quieres recibir.</p>

      <label>
        <input type="checkbox" class="areaCurso" value="Programación">
        Programación
      </label>

      <label>
        <input type="checkbox" class="areaCurso" value="Idiomas">
        Idiomas
      </label>

      <label>
        <input type="checkbox" class="areaCurso" value="Ofimática">
        Ofimática
      </label>

      <label>
        <input type="checkbox" class="areaCurso" value="Atención al cliente">
        Atención al cliente
      </label>

      <div class="botones">
        <button id="btnGuardarSuscripcionCursos">Guardar suscripción</button>
        <button id="btnVolverMenu" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolverMenu').addEventListener('click', mostrarMenu)

  document.querySelector('#btnGuardarSuscripcionCursos').addEventListener('click', async () => {
    const areas = Array.from(document.querySelectorAll('.areaCurso:checked'))
      .map(check => check.value)

    if (areas.length === 0) {
      mostrarError('Debes seleccionar al menos un área de formación.')
      return
    }

    const boton = document.querySelector('#btnGuardarSuscripcionCursos')
    mostrarCargando('Guardando suscripción a cursos...')
    bloquearBoton(boton, 'Guardando...')

    const datos = {
      correoUsuario: usuarioActual.correo,
      areas: areas
    }

    const respuesta = await suscribirseCursos(datos)
    desbloquearBoton(boton, 'Guardar suscripción')

    document.querySelector('#resultado').innerHTML = `
      <div class="ok">
        <h3>Suscripción guardada</h3>
        <p>${respuesta.mensaje}</p>
        <p><strong>Áreas:</strong> ${areas.join(', ') || 'Ninguna'}</p>
      </div>
    `
  })
}

function mostrarFormularioPublicarOferta() {
  const contenido = document.querySelector('#contenido')

  contenido.innerHTML = `
    <section class="card">
      <h2>Publicar oferta de trabajo</h2>

      <label>Título</label>
      <input id="tituloOferta" type="text" value="Desarrollador Frontend Junior">

      <label>Empresa</label>
      <input id="empresaOferta" type="text" value="Empresa Demo">

      <label>Ubicación</label>
      <input id="ubicacionOferta" type="text" value="Alicante">

      <label>Sector</label>
      <select id="sectorOferta">
        <option value="Informática">Informática</option>
        <option value="Hostelería">Hostelería</option>
        <option value="Administración">Administración</option>
        <option value="Sanidad">Sanidad</option>
      </select>

      <label>Descripción</label>
      <textarea id="descripcionOferta">Oferta de trabajo para incorporación inmediata.</textarea>

      <div class="botones">
        <button id="btnGuardarOferta">Publicar oferta</button>
        <button id="btnVolverMenu" class="secundario">Volver</button>
      </div>

      <div id="resultado"></div>
    </section>
  `

  document.querySelector('#btnVolverMenu').addEventListener('click', mostrarMenu)

  document.querySelector('#btnGuardarOferta').addEventListener('click', async () => {
    const boton = document.querySelector('#btnGuardarOferta')

    if (campoVacio('#tituloOferta')) {
      mostrarError('El título de la oferta es obligatorio.')
      return
    }

    if (campoVacio('#empresaOferta')) {
      mostrarError('La empresa es obligatoria.')
      return
    }

    if (campoVacio('#ubicacionOferta')) {
      mostrarError('La ubicación es obligatoria.')
      return
    }

    if (campoVacio('#descripcionOferta')) {
      mostrarError('La descripción es obligatoria.')
      return
    }

    const datos = {
      titulo: document.querySelector('#tituloOferta').value.trim(),
      empresa: document.querySelector('#empresaOferta').value.trim(),
      ubicacion: document.querySelector('#ubicacionOferta').value.trim(),
      sector: document.querySelector('#sectorOferta').value,
      descripcion: document.querySelector('#descripcionOferta').value.trim(),
      correoRepresentante: usuarioActual.correo
    }

    mostrarCargando('Publicando oferta...')
    bloquearBoton(boton, 'Publicando...')

    const respuesta = await publicarOferta(datos)

    desbloquearBoton(boton, 'Publicar oferta')

    if (respuesta.ok) {
      document.querySelector('#resultado').innerHTML = `
        <div class="ok">
          <h3>Oferta publicada</h3>
          <p><strong>ID oferta:</strong> ${respuesta.idOferta}</p>
          <p>${respuesta.mensaje}</p>
        </div>
      `
    } else {
      mostrarError(respuesta.mensaje || 'No se pudo publicar la oferta.')
    }
  })
}

function campoVacio(id) {
  return document.querySelector(id).value.trim() === ''
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

function mostrarCargando(mensaje = 'Procesando solicitud...') {
  const resultado = document.querySelector('#resultado')
  if (resultado) {
    resultado.innerHTML = `
      <div class="aviso">
        <p>${mensaje}</p>
      </div>
    `
  }
}

function bloquearBoton(boton, texto = 'Procesando...') {
  boton.disabled = true
  boton.textContent = texto
}

function desbloquearBoton(boton, textoOriginal) {
  boton.disabled = false
  boton.textContent = textoOriginal
}