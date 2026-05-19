const _rutas = new Map()

export function en(path, fn) {
  _rutas.set(path, fn)
}

export function ir(path) {
  window.location.hash = '#' + path
}

export function rutaActual() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function iniciar() {
  window.addEventListener('hashchange', _resolver)
  _resolver()
}

function _resolver() {
  const path = window.location.hash.replace(/^#/, '') || '/'
  if (_rutas.has(path)) {
    _rutas.get(path)()
    return
  }
  _rutas.get('/')?.()
}
