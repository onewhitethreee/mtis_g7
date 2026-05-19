import {
  listarUsuarios, obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario,
  listarEmpresas, obtenerEmpresa, crearEmpresa, actualizarEmpresa, eliminarEmpresa,
  listarTodasOfertas, obtenerOferta, actualizarOferta, eliminarOferta,
  listarCursos, crearCurso, obtenerCurso, actualizarCurso, eliminarCurso,
  listarTodasCandidaturas, obtenerCandidatura, actualizarCandidatura, eliminarCandidatura,
  listarTodasSuscripciones, obtenerSuscripcion,
  validarUsuario, validarCertificado, validarEtiquetas, validarElegibilidad,
  enviarNotificacion, obtenerNotificacion
} from './api.js'
import { en, ir } from './router.js'

const $ = sel => document.querySelector(sel)
const $$ = sel => document.querySelectorAll(sel)

export function registrarRutas(guard) {
  en('/rest',                guard(renderInicio))
  en('/rest/usuarios',       guard(renderUsuarios))
  en('/rest/empresas',       guard(renderEmpresas))
  en('/rest/ofertas',        guard(renderOfertas))
  en('/rest/cursos',         guard(renderCursos))
  en('/rest/candidaturas',   guard(renderCandidaturas))
  en('/rest/suscripciones',  guard(renderSuscripciones))
  en('/rest/validaciones',   guard(renderValidaciones))
  en('/rest/notificaciones', guard(renderNotificaciones))
}

// ─── Panel de inicio ──────────────────────────────────────────────────────────

function renderInicio() {
  const secciones = [
    { id: 'usuarios',       label: 'Usuarios',       desc: 'GET · POST · GET/{id} · PUT · DELETE',                   color: '#0b4f71' },
    { id: 'empresas',       label: 'Empresas',        desc: 'GET · POST · GET/{cif} · PUT · DELETE',                  color: '#065f46' },
    { id: 'ofertas',        label: 'Ofertas',         desc: 'GET · GET/{id} · PUT · DELETE',                          color: '#7e22ce' },
    { id: 'cursos',         label: 'Cursos',          desc: 'GET · POST · GET/{id} · PUT · DELETE',                   color: '#b45309' },
    { id: 'candidaturas',   label: 'Candidaturas',    desc: 'GET · GET/{id} · PUT estado · DELETE',                   color: '#1d4ed8' },
    { id: 'suscripciones',  label: 'Suscripciones',   desc: 'GET · GET/{id}',                                         color: '#be185d' },
    { id: 'validaciones',   label: 'Validaciones',    desc: '/usuarios · /certificados · /etiquetas · /elegibilidad', color: '#dc2626' },
    { id: 'notificaciones', label: 'Notificaciones',  desc: 'POST · GET/{id}',                                        color: '#0891b2' },
  ]

  render(`
    <section class="card">
      <h2>Panel de Servicios REST</h2>
      <p>Acceso directo a todos los endpoints REST del servidor LABORA (puerto 3030).</p>

      <div class="rest-grid">
        ${secciones.map(s => `
          <button class="rest-card" data-id="${s.id}">
            <strong style="color:${s.color}">${s.label}</strong>
            <span>${s.desc}</span>
          </button>
        `).join('')}
      </div>

      <div class="botones" style="margin-top:24px">
        <button id="btnVolverMenu" class="secundario">Volver al menú</button>
      </div>
    </section>
  `)

  $('#btnVolverMenu').addEventListener('click', () => ir('/menu'))

  $$('.rest-card').forEach(btn =>
    btn.addEventListener('click', () => ir(`/rest/${btn.dataset.id}`))
  )
}

// ─── Helpers compartidos ──────────────────────────────────────────────────────

function render(html) {
  document.querySelector('#contenido').innerHTML = html
}

function nav(titulo, extraBotones = '') {
  return `
    <div class="rest-nav">
      <h2 style="margin:0">${titulo}</h2>
      <div class="botones" style="margin:0">
        ${extraBotones}
        <button id="btnVolverPanel" class="secundario">← Panel REST</button>
        <button id="btnVolverMenu"  class="secundario">Menú</button>
      </div>
    </div>
    <div id="resultado"></div>
  `
}

function wireNav() {
  $('#btnVolverPanel')?.addEventListener('click', () => ir('/rest'))
  $('#btnVolverMenu')?.addEventListener('click', () => ir('/menu'))
}

function ok(titulo, msg) {
  const r = $('#resultado')
  if (r) r.innerHTML = `<div class="ok"><h3>${titulo}</h3><p>${msg}</p></div>`
}

function err(msg) {
  const r = $('#resultado')
  if (r) r.innerHTML = `<div class="error"><h3>Error</h3><p>${msg}</p></div>`
}

function itemsHTML(lista, campos, accionesFn) {
  if (!lista.length) return '<p style="margin-top:10px">No hay registros.</p>'
  return lista.map(item => {
    const vals = campos.map(([k, label]) => {
      const v = item[k]
      return `<span><strong>${label}:</strong> ${Array.isArray(v) ? v.join(', ') : (v ?? '—')}</span>`
    }).join('')
    return `<div class="rest-item">${vals}${accionesFn(item)}</div>`
  }).join('')
}

function jsonBox(dato) {
  return `<div class="ok"><pre class="rest-pre">${JSON.stringify(dato, null, 2)}</pre></div>`
}

function resultBox(dato) {
  if (dato && dato.ok === false) return `<div class="error"><p>${dato.mensaje}</p></div>`
  return jsonBox(dato)
}

function selectOpts(opciones, valorActual) {
  return opciones.map(o => `<option value="${o}" ${valorActual === o ? 'selected' : ''}>${o}</option>`).join('')
}

// ─── USUARIOS ─────────────────────────────────────────────────────────────────

async function renderUsuarios() {
  render(`<section class="card"><p class="aviso">Cargando usuarios...</p></section>`)
  const lista = await listarUsuarios()

  render(`
    <section class="card">
      ${nav('Usuarios', `<button id="btnCrear">+ Crear usuario</button>`)}
      <div id="formulario"></div>
      <h3 class="rest-subtitulo">Lista (${lista.length})</h3>
      <div class="rest-lista">
        ${itemsHTML(lista,
          [['id_nie','NIF/NIE'], ['nombre','Nombre'], ['apellidos','Apellidos'], ['tipo','Tipo'], ['activo','Activo']],
          item => `
            <div class="rest-acciones">
              <button class="btnEditar" data-id="${item.id_nie}">Editar</button>
              <button class="btnEliminar secundario" data-id="${item.id_nie}">Eliminar</button>
            </div>`
        )}
      </div>
    </section>
  `)
  wireNav()

  $('#btnCrear').addEventListener('click', () => formUsuario(null))

  $$('.btnEditar').forEach(btn => btn.addEventListener('click', async () => {
    const d = await obtenerUsuario(btn.dataset.id)
    if (d.ok === false) return err(d.mensaje)
    formUsuario(d)
  }))

  $$('.btnEliminar').forEach(btn => btn.addEventListener('click', async () => {
    const r = await eliminarUsuario(btn.dataset.id)
    if (r && r.ok === false) err(r.mensaje)
    else { ok('Eliminado', `Usuario ${btn.dataset.id} eliminado.`); renderUsuarios() }
  }))
}

function formUsuario(item) {
  const es = !!item
  $('#formulario').innerHTML = `
    <div class="rest-form">
      <h3>${es ? 'Editar usuario' : 'Crear usuario'}</h3>
      <label>NIF/NIE ${es ? '' : '*'}</label>
      <input id="f_nie" value="${item?.id_nie ?? ''}" ${es ? 'disabled' : ''} placeholder="12345678A">
      <label>Nombre *</label>
      <input id="f_nombre" value="${item?.nombre ?? ''}">
      <label>Apellidos *</label>
      <input id="f_apellidos" value="${item?.apellidos ?? ''}">
      <label>Email *</label>
      <input id="f_email" type="email" value="${item?.email ?? ''}">
      <label>Tipo *</label>
      <select id="f_tipo">${selectOpts(['DEMANDANTE','REPRESENTANTE','ADMINISTRADOR'], item?.tipo)}</select>
      <label class="check" style="margin-top:12px">
        <input type="checkbox" id="f_activo" ${item?.activo !== false ? 'checked' : ''}> Activo
      </label>
      <div class="botones" style="margin-top:14px">
        <button id="btnGuardar">${es ? 'Guardar cambios' : 'Crear'}</button>
        <button id="btnCancelar" class="secundario">Cancelar</button>
      </div>
    </div>
  `
  $('#btnCancelar').addEventListener('click', () => { $('#formulario').innerHTML = '' })
  $('#btnGuardar').addEventListener('click', async () => {
    const datos = {
      id_nie: es ? item.id_nie : $('#f_nie').value.trim(),
      nombre: $('#f_nombre').value.trim(),
      apellidos: $('#f_apellidos').value.trim(),
      email: $('#f_email').value.trim(),
      tipo: $('#f_tipo').value,
      activo: $('#f_activo').checked,
    }
    const r = es ? await actualizarUsuario(item.id_nie, datos) : await crearUsuario(datos)
    if (r && r.ok === false) err(r.mensaje)
    else { ok(es ? 'Actualizado' : 'Creado', JSON.stringify(r)); $('#formulario').innerHTML = ''; renderUsuarios() }
  })
}

// ─── EMPRESAS ─────────────────────────────────────────────────────────────────

async function renderEmpresas() {
  render(`<section class="card"><p class="aviso">Cargando empresas...</p></section>`)
  const lista = await listarEmpresas()

  render(`
    <section class="card">
      ${nav('Empresas', `<button id="btnCrear">+ Crear empresa</button>`)}
      <div id="formulario"></div>
      <h3 class="rest-subtitulo">Lista (${lista.length})</h3>
      <div class="rest-lista">
        ${itemsHTML(lista,
          [['cif','CIF'], ['nombre','Nombre'], ['sector','Sector'], ['clasificacion','Clasificación']],
          item => `
            <div class="rest-acciones">
              <button class="btnEditar" data-id="${item.cif}">Editar</button>
              <button class="btnEliminar secundario" data-id="${item.cif}">Eliminar</button>
            </div>`
        )}
      </div>
    </section>
  `)
  wireNav()

  $('#btnCrear').addEventListener('click', () => formEmpresa(null))

  $$('.btnEditar').forEach(btn => btn.addEventListener('click', async () => {
    const d = await obtenerEmpresa(btn.dataset.id)
    if (d.ok === false) return err(d.mensaje)
    formEmpresa(d)
  }))

  $$('.btnEliminar').forEach(btn => btn.addEventListener('click', async () => {
    const r = await eliminarEmpresa(btn.dataset.id)
    if (r && r.ok === false) err(r.mensaje)
    else { ok('Eliminada', `Empresa ${btn.dataset.id} eliminada.`); renderEmpresas() }
  }))
}

function formEmpresa(item) {
  const es = !!item
  $('#formulario').innerHTML = `
    <div class="rest-form">
      <h3>${es ? 'Editar empresa' : 'Crear empresa'}</h3>
      <label>CIF ${es ? '' : '*'}</label>
      <input id="f_cif" value="${item?.cif ?? ''}" ${es ? 'disabled' : ''} placeholder="B12345678">
      <label>Nombre *</label>
      <input id="f_nombre" value="${item?.nombre ?? ''}">
      <label>Razón social *</label>
      <input id="f_razon" value="${item?.razon_social ?? ''}">
      <label>Correo *</label>
      <input id="f_correo" type="email" value="${item?.correo ?? ''}">
      <label>Teléfono *</label>
      <input id="f_tel" value="${item?.telefono ?? ''}">
      <label>Fecha constitución *</label>
      <input id="f_fecha" type="date" value="${item?.fecha_constitucion ?? ''}">
      <label>Sector *</label>
      <input id="f_sector" value="${item?.sector ?? ''}">
      <label>Clasificación *</label>
      <select id="f_clas">${selectOpts(['MICRO','PEQUEÑA','MEDIANA','GRANDE'], item?.clasificacion)}</select>
      <div class="botones" style="margin-top:14px">
        <button id="btnGuardar">${es ? 'Guardar cambios' : 'Crear'}</button>
        <button id="btnCancelar" class="secundario">Cancelar</button>
      </div>
    </div>
  `
  $('#btnCancelar').addEventListener('click', () => { $('#formulario').innerHTML = '' })
  $('#btnGuardar').addEventListener('click', async () => {
    const datos = {
      cif: es ? item.cif : $('#f_cif').value.trim(),
      nombre: $('#f_nombre').value.trim(),
      razon_social: $('#f_razon').value.trim(),
      correo: $('#f_correo').value.trim(),
      telefono: $('#f_tel').value.trim(),
      fecha_constitucion: $('#f_fecha').value,
      sector: $('#f_sector').value.trim(),
      clasificacion: $('#f_clas').value,
    }
    const r = es ? await actualizarEmpresa(item.cif, datos) : await crearEmpresa(datos)
    if (r && r.ok === false) err(r.mensaje)
    else { ok(es ? 'Actualizada' : 'Creada', JSON.stringify(r)); $('#formulario').innerHTML = ''; renderEmpresas() }
  })
}

// ─── OFERTAS ──────────────────────────────────────────────────────────────────

async function renderOfertas() {
  render(`<section class="card"><p class="aviso">Cargando ofertas...</p></section>`)
  const lista = await listarTodasOfertas()

  render(`
    <section class="card">
      ${nav('Ofertas', `<button id="btnBuscar">Buscar por ID</button>`)}
      <div id="formulario"></div>
      <h3 class="rest-subtitulo">Lista (${lista.length})</h3>
      <div class="rest-lista">
        ${itemsHTML(lista,
          [['id','ID'], ['titulo','Título'], ['cif_empresa','Empresa'], ['duracion_contrato','Contrato'], ['estado','Estado']],
          item => `
            <div class="rest-acciones">
              <button class="btnEditar" data-id="${item.id}">Editar</button>
              <button class="btnEliminar secundario" data-id="${item.id}">Eliminar</button>
            </div>`
        )}
      </div>
    </section>
  `)
  wireNav()

  $('#btnBuscar').addEventListener('click', () => {
    $('#formulario').innerHTML = `
      <div class="rest-form">
        <label>ID de oferta</label>
        <input id="f_busq" placeholder="OFE-2026-001">
        <div class="botones" style="margin-top:10px"><button id="btnIr">Buscar</button></div>
        <div id="resBusq" style="margin-top:12px"></div>
      </div>
    `
    $('#btnIr').addEventListener('click', async () => {
      const id = $('#f_busq').value.trim()
      if (!id) return
      const d = await obtenerOferta(id)
      $('#resBusq').innerHTML = resultBox(d)
    })
  })

  $$('.btnEditar').forEach(btn => btn.addEventListener('click', async () => {
    const d = await obtenerOferta(btn.dataset.id)
    if (d.ok === false) return err(d.mensaje)
    formOferta(d)
  }))

  $$('.btnEliminar').forEach(btn => btn.addEventListener('click', async () => {
    const r = await eliminarOferta(btn.dataset.id)
    if (r && r.ok === false) err(r.mensaje)
    else { ok('Eliminada', `Oferta ${btn.dataset.id} eliminada.`); renderOfertas() }
  }))
}

function formOferta(item) {
  const etiq = Array.isArray(item.etiquetas) ? item.etiquetas.join(', ') : (item.etiquetas ?? '')
  $('#formulario').innerHTML = `
    <div class="rest-form">
      <h3>Editar oferta: ${item.id}</h3>
      <label>Título</label>
      <input id="f_titulo" value="${item.titulo ?? ''}">
      <label>Descripción</label>
      <textarea id="f_desc">${item.descripcion ?? ''}</textarea>
      <label>Duración contrato</label>
      <select id="f_dur">${selectOpts(['INDEFINIDO','TEMPORAL','ALTERNANCIA','PRACTICAS'], item.duracion_contrato)}</select>
      <label>Estado</label>
      <select id="f_est">${selectOpts(['ACTIVA','CERRADA','PAUSADA'], item.estado)}</select>
      <label>Etiquetas (separadas por comas)</label>
      <input id="f_etiq" value="${etiq}">
      <div class="botones" style="margin-top:14px">
        <button id="btnGuardar">Guardar cambios</button>
        <button id="btnCancelar" class="secundario">Cancelar</button>
      </div>
    </div>
  `
  $('#btnCancelar').addEventListener('click', () => { $('#formulario').innerHTML = '' })
  $('#btnGuardar').addEventListener('click', async () => {
    const datos = {
      titulo: $('#f_titulo').value.trim(),
      descripcion: $('#f_desc').value.trim(),
      duracion_contrato: $('#f_dur').value,
      estado: $('#f_est').value,
      etiquetas: $('#f_etiq').value.split(',').map(e => e.trim()).filter(Boolean),
    }
    const r = await actualizarOferta(item.id, datos)
    if (r && r.ok === false) err(r.mensaje)
    else { ok('Actualizada', JSON.stringify(r)); $('#formulario').innerHTML = ''; renderOfertas() }
  })
}

// ─── CURSOS ───────────────────────────────────────────────────────────────────

async function renderCursos() {
  render(`<section class="card"><p class="aviso">Cargando cursos...</p></section>`)
  const lista = await listarCursos()

  render(`
    <section class="card">
      ${nav('Cursos', `<button id="btnCrear">+ Crear curso</button>`)}
      <div id="formulario"></div>
      <h3 class="rest-subtitulo">Lista (${lista.length})</h3>
      <div class="rest-lista">
        ${itemsHTML(lista,
          [['id','ID'], ['titulo','Título'], ['fecha_inicio','Inicio'], ['fecha_fin','Fin'], ['estado','Estado']],
          item => `
            <div class="rest-acciones">
              <button class="btnEditar" data-id="${item.id}">Editar</button>
              <button class="btnEliminar secundario" data-id="${item.id}">Eliminar</button>
            </div>`
        )}
      </div>
    </section>
  `)
  wireNav()

  $('#btnCrear').addEventListener('click', () => formCurso(null))

  $$('.btnEditar').forEach(btn => btn.addEventListener('click', async () => {
    const d = await obtenerCurso(btn.dataset.id)
    if (d.ok === false) return err(d.mensaje)
    formCurso(d)
  }))

  $$('.btnEliminar').forEach(btn => btn.addEventListener('click', async () => {
    const r = await eliminarCurso(btn.dataset.id)
    if (r && r.ok === false) err(r.mensaje)
    else { ok('Eliminado', `Curso ${btn.dataset.id} eliminado.`); renderCursos() }
  }))
}

function formCurso(item) {
  const es = !!item
  const etiq = Array.isArray(item?.etiquetas) ? item.etiquetas.join(', ') : (item?.etiquetas ?? '')
  $('#formulario').innerHTML = `
    <div class="rest-form">
      <h3>${es ? 'Editar curso' : 'Crear curso'}</h3>
      <label>Título *</label>
      <input id="f_titulo" value="${item?.titulo ?? ''}">
      <label>Descripción *</label>
      <textarea id="f_desc">${item?.descripcion ?? ''}</textarea>
      <label>Fecha inicio *</label>
      <input id="f_inicio" type="date" value="${item?.fecha_inicio ?? ''}">
      <label>Fecha fin *</label>
      <input id="f_fin" type="date" value="${item?.fecha_fin ?? ''}">
      <label>Etiquetas (separadas por comas)</label>
      <input id="f_etiq" value="${etiq}">
      <div class="botones" style="margin-top:14px">
        <button id="btnGuardar">${es ? 'Guardar cambios' : 'Crear'}</button>
        <button id="btnCancelar" class="secundario">Cancelar</button>
      </div>
    </div>
  `
  $('#btnCancelar').addEventListener('click', () => { $('#formulario').innerHTML = '' })
  $('#btnGuardar').addEventListener('click', async () => {
    const datos = {
      titulo: $('#f_titulo').value.trim(),
      descripcion: $('#f_desc').value.trim(),
      fecha_inicio: $('#f_inicio').value,
      fecha_fin: $('#f_fin').value,
      etiquetas: $('#f_etiq').value.split(',').map(e => e.trim()).filter(Boolean),
    }
    const r = es ? await actualizarCurso(item.id, datos) : await crearCurso(datos)
    if (r && r.ok === false) err(r.mensaje)
    else { ok(es ? 'Actualizado' : 'Creado', JSON.stringify(r)); $('#formulario').innerHTML = ''; renderCursos() }
  })
}

// ─── CANDIDATURAS ─────────────────────────────────────────────────────────────

async function renderCandidaturas() {
  render(`<section class="card"><p class="aviso">Cargando candidaturas...</p></section>`)
  const lista = await listarTodasCandidaturas()

  render(`
    <section class="card">
      ${nav('Candidaturas', `<button id="btnBuscar">Buscar por ID</button>`)}
      <div id="formulario"></div>
      <h3 class="rest-subtitulo">Lista (${lista.length})</h3>
      <div class="rest-lista">
        ${itemsHTML(lista,
          [['id','ID'], ['id_candidato','Candidato'], ['id_oferta','Oferta'], ['estado','Estado'], ['fecha_aplicacion','Fecha']],
          item => `
            <div class="rest-acciones">
              <button class="btnEstado" data-id="${item.id}" data-estado="${item.estado ?? 'PENDIENTE'}">Estado</button>
              <button class="btnEliminar secundario" data-id="${item.id}">Eliminar</button>
            </div>`
        )}
      </div>
    </section>
  `)
  wireNav()

  $('#btnBuscar').addEventListener('click', () => {
    $('#formulario').innerHTML = `
      <div class="rest-form">
        <label>ID de candidatura</label>
        <input id="f_busq" type="number" placeholder="1">
        <div class="botones" style="margin-top:10px"><button id="btnIr">Buscar</button></div>
        <div id="resBusq" style="margin-top:12px"></div>
      </div>
    `
    $('#btnIr').addEventListener('click', async () => {
      const id = $('#f_busq').value.trim()
      if (!id) return
      $('#resBusq').innerHTML = resultBox(await obtenerCandidatura(id))
    })
  })

  $$('.btnEstado').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.id
    const actual = btn.dataset.estado
    $('#formulario').innerHTML = `
      <div class="rest-form">
        <h3>Cambiar estado — Candidatura #${id}</h3>
        <label>Nuevo estado</label>
        <select id="f_est">${selectOpts(['PENDIENTE','PRESELECCIONADO','RECHAZADO','ACEPTADO'], actual)}</select>
        <div class="botones" style="margin-top:14px">
          <button id="btnGuardar">Guardar</button>
          <button id="btnCancelar" class="secundario">Cancelar</button>
        </div>
      </div>
    `
    $('#btnCancelar').addEventListener('click', () => { $('#formulario').innerHTML = '' })
    $('#btnGuardar').addEventListener('click', async () => {
      const r = await actualizarCandidatura(id, { estado: $('#f_est').value })
      if (r && r.ok === false) err(r.mensaje)
      else { ok('Estado actualizado', JSON.stringify(r)); $('#formulario').innerHTML = ''; renderCandidaturas() }
    })
  }))

  $$('.btnEliminar').forEach(btn => btn.addEventListener('click', async () => {
    const r = await eliminarCandidatura(btn.dataset.id)
    if (r && r.ok === false) err(r.mensaje)
    else { ok('Eliminada', `Candidatura #${btn.dataset.id} eliminada.`); renderCandidaturas() }
  }))
}

// ─── SUSCRIPCIONES ────────────────────────────────────────────────────────────

async function renderSuscripciones() {
  render(`<section class="card"><p class="aviso">Cargando suscripciones...</p></section>`)
  const lista = await listarTodasSuscripciones()

  render(`
    <section class="card">
      ${nav('Suscripciones', `<button id="btnBuscar">Buscar por ID</button>`)}
      <div id="formulario"></div>
      <h3 class="rest-subtitulo">Lista (${lista.length})</h3>
      <div class="rest-lista">
        ${itemsHTML(lista,
          [['id','ID'], ['id_usuario','Usuario'], ['tipo','Tipo'], ['etiquetas','Etiquetas'], ['activa','Activa']],
          () => ''
        )}
      </div>
    </section>
  `)
  wireNav()

  $('#btnBuscar').addEventListener('click', () => {
    $('#formulario').innerHTML = `
      <div class="rest-form">
        <label>ID de suscripción</label>
        <input id="f_busq" type="number" placeholder="1">
        <div class="botones" style="margin-top:10px"><button id="btnIr">Buscar</button></div>
        <div id="resBusq" style="margin-top:12px"></div>
      </div>
    `
    $('#btnIr').addEventListener('click', async () => {
      const id = $('#f_busq').value.trim()
      if (!id) return
      $('#resBusq').innerHTML = resultBox(await obtenerSuscripcion(id))
    })
  })
}

// ─── VALIDACIONES ─────────────────────────────────────────────────────────────

function renderValidaciones() {
  render(`
    <section class="card">
      ${nav('Validaciones')}
      <div class="validaciones-grid">

        <div class="rest-form">
          <h3>POST /validacion/usuarios</h3>
          <label>NIF/NIE</label><input id="vn_nie" value="12345678A">
          <label>Nombre</label><input id="vn_nom" value="María">
          <label>Apellidos</label><input id="vn_ape" value="García López">
          <label>Email</label><input id="vn_email" value="maria@email.com">
          <div class="botones" style="margin-top:10px"><button id="btnValUsr">Validar</button></div>
          <div id="resUsr" style="margin-top:10px"></div>
        </div>

        <div class="rest-form">
          <h3>POST /validacion/certificados</h3>
          <label>NIF/NIE usuario</label><input id="vc_nie" value="12345678A">
          <label>Tipo certificado</label><input id="vc_tipo" value="DEMANDANTE_ACTIVO">
          <label>Motivo</label><input id="vc_motivo" value="Presentación en convocatoria">
          <div class="botones" style="margin-top:10px"><button id="btnValCert">Validar</button></div>
          <div id="resCert" style="margin-top:10px"></div>
        </div>

        <div class="rest-form">
          <h3>POST /validacion/etiquetas</h3>
          <label>Etiquetas (separadas por comas)</label>
          <input id="ve_etiq" value="informatica, programacion">
          <div class="botones" style="margin-top:10px"><button id="btnValEtiq">Validar</button></div>
          <div id="resEtiq" style="margin-top:10px"></div>
        </div>

        <div class="rest-form">
          <h3>POST /validacion/elegibilidad</h3>
          <label>NIF/NIE usuario</label><input id="vel_nie" value="12345678A">
          <label>ID oferta</label><input id="vel_oferta" value="OFE-2026-001">
          <div class="botones" style="margin-top:10px"><button id="btnValEleg">Validar</button></div>
          <div id="resEleg" style="margin-top:10px"></div>
        </div>

      </div>
    </section>
  `)
  wireNav()

  $('#btnValUsr').addEventListener('click', async () => {
    const r = await validarUsuario({
      id_nie: $('#vn_nie').value.trim(),
      nombre: $('#vn_nom').value.trim(),
      apellidos: $('#vn_ape').value.trim(),
      email: $('#vn_email').value.trim(),
    })
    $('#resUsr').innerHTML = fmtVal(r)
  })

  $('#btnValCert').addEventListener('click', async () => {
    const r = await validarCertificado({
      id_usuario: $('#vc_nie').value.trim(),
      tipo_certificado: $('#vc_tipo').value.trim(),
      motivo: $('#vc_motivo').value.trim(),
    })
    $('#resCert').innerHTML = fmtVal(r)
  })

  $('#btnValEtiq').addEventListener('click', async () => {
    const etiquetas = $('#ve_etiq').value.split(',').map(e => e.trim()).filter(Boolean)
    const r = await validarEtiquetas(etiquetas)
    $('#resEtiq').innerHTML = fmtVal(r)
  })

  $('#btnValEleg').addEventListener('click', async () => {
    const r = await validarElegibilidad($('#vel_nie').value.trim(), $('#vel_oferta').value.trim())
    $('#resEleg').innerHTML = fmtVal(r)
  })
}

function fmtVal(r) {
  if (r && r.ok === false) return `<div class="error"><p>${r.mensaje}</p></div>`
  const cls = r?.valido ? 'ok' : 'error'
  const icono = r?.valido ? '✔ Válido' : '✘ No válido'
  const motivo = r?.motivo ? ` — ${r.motivo}` : ''
  return `<div class="${cls}"><p><strong>${icono}</strong>${motivo}</p></div>`
}

// ─── NOTIFICACIONES ───────────────────────────────────────────────────────────

function renderNotificaciones() {
  render(`
    <section class="card">
      ${nav('Notificaciones')}
      <div class="validaciones-grid">

        <div class="rest-form">
          <h3>POST /notificaciones</h3>
          <label>Destinatarios (separados por comas)</label>
          <input id="fn_dest" value="maria.garcia@email.com">
          <label>Asunto</label>
          <input id="fn_asunto" value="Notificación del sistema LABORA">
          <label>Mensaje</label>
          <textarea id="fn_msg">Tu solicitud ha sido procesada correctamente.</textarea>
          <label>Tipo</label>
          <select id="fn_tipo">${selectOpts(['OFERTA','CERTIFICADO','ESTADO_CANDIDATURA','SUSCRIPCION','ALERTA'], 'ALERTA')}</select>
          <div class="botones" style="margin-top:10px"><button id="btnEnviar">Enviar</button></div>
          <div id="resEnviar" style="margin-top:10px"></div>
        </div>

        <div class="rest-form">
          <h3>GET /notificaciones/{id}</h3>
          <label>ID de notificación</label>
          <input id="fn_id" type="number" placeholder="1">
          <div class="botones" style="margin-top:10px"><button id="btnBuscar">Consultar</button></div>
          <div id="resBuscar" style="margin-top:10px"></div>
        </div>

      </div>
    </section>
  `)
  wireNav()

  $('#btnEnviar').addEventListener('click', async () => {
    const r = await enviarNotificacion({
      destinatarios: $('#fn_dest').value.split(',').map(e => e.trim()).filter(Boolean),
      asunto: $('#fn_asunto').value.trim(),
      mensaje: $('#fn_msg').value.trim(),
      tipo: $('#fn_tipo').value,
    })
    $('#resEnviar').innerHTML = resultBox(r)
  })

  $('#btnBuscar').addEventListener('click', async () => {
    const id = $('#fn_id').value.trim()
    if (!id) return
    $('#resBuscar').innerHTML = resultBox(await obtenerNotificacion(id))
  })
}
