-- ═══════════════════════════════════════════════════════════════
-- LABORA - Datos de Prueba
-- Compatible con el script de BD de la compañera
-- ═══════════════════════════════════════════════════════════════

USE labora;

-- ─────────────────────────────────────────
-- USUARIO
-- ─────────────────────────────────────────
INSERT INTO usuario (id_nie, nombre, apellidos, email, tipo, activo, contrasena_hash) VALUES
('12345678A', 'María',   'García López',   'maria.garcia@email.com',    'DEMANDANTE',    1, SHA2('pass1234', 256)),
('87654321B', 'Carlos',  'Martínez Ruiz',  'carlos.martinez@email.com', 'DEMANDANTE',    1, SHA2('pass1234', 256)),
('11223344C', 'Laura',   'Sánchez Pérez',  'laura.sanchez@email.com',   'DEMANDANTE',    1, SHA2('pass1234', 256)),
('99887766D', 'Admin',   'LABORA Sistema', 'admin@labora.gva.es',       'ADMINISTRADOR', 1, SHA2('admin1234', 256)),
('55443322E', 'Pedro',   'Ramírez Gil',    'pedro.ramirez@email.com',   'REPRESENTANTE', 1, SHA2('pass1234', 256));

-- ─────────────────────────────────────────
-- EMPRESA
-- ─────────────────────────────────────────
INSERT INTO empresa (cif, nombre, razon_social, correo, telefono, fecha_constitucion, sector, clasificacion, activo) VALUES
('B12345678', 'TechSolutions SL', 'TechSolutions Sociedad Limitada', 'contacto@techsolutions.es', '965123456', '2010-03-15', 'Tecnología', 'PEQUEÑA', 1),
('A87654321', 'LogiTrans SA',     'LogiTrans Sociedad Anónima',      'info@logitrans.es',          '963456789', '2005-07-20', 'Logística',  'MEDIANA', 1),
('B11223344', 'RestauBar SL',     'RestauBar Sociedad Limitada',     'hola@restaurbar.es',         '961234567', '2018-01-10', 'Hostelería', 'MICRO',   1);

-- ─────────────────────────────────────────
-- ETIQUETA
-- ─────────────────────────────────────────
INSERT INTO etiqueta (nombre, categoria) VALUES
('informatica',    'Tecnología'),
('programacion',   'Tecnología'),
('fullstack',      'Tecnología'),
('python',         'Tecnología'),
('hosteleria',     'Servicios'),
('cocina',         'Servicios'),
('logistica',      'Transporte'),
('administracion', 'Gestión'),
('contabilidad',   'Gestión'),
('marketing',      'Comunicación');

-- ─────────────────────────────────────────
-- OFERTA
-- ─────────────────────────────────────────
INSERT INTO oferta (id, cif_empresa, titulo, descripcion, duracion_contrato, estado, fecha_publicacion) VALUES
('OFE-2026-001', 'B12345678', 'Desarrollador Full Stack',  'Buscamos desarrollador con experiencia en React y Node.js', 'INDEFINIDO', 'ACTIVA', '2026-05-01'),
('OFE-2026-002', 'A87654321', 'Responsable de Logística',  'Coordinación de rutas y gestión de almacén',               'INDEFINIDO', 'ACTIVA', '2026-05-05'),
('OFE-2026-003', 'B11223344', 'Cocinero/a',                'Cocinero con experiencia en cocina mediterránea',           'TEMPORAL',   'ACTIVA', '2026-05-10');

-- ─────────────────────────────────────────
-- OFERTA_ETIQUETA
-- ─────────────────────────────────────────
INSERT INTO oferta_etiqueta (id_oferta, id_etiqueta) VALUES
('OFE-2026-001', 1), ('OFE-2026-001', 2), ('OFE-2026-001', 3),
('OFE-2026-002', 7),
('OFE-2026-003', 5), ('OFE-2026-003', 6);

-- ─────────────────────────────────────────
-- CURSO
-- ─────────────────────────────────────────
INSERT INTO curso (titulo, descripcion, fecha_inicio, fecha_fin, estado) VALUES
('Introducción a la Programación', 'Curso básico de programación orientado a desempleados',  '2026-06-01', '2026-09-30', 'activo'),
('Python para Data Science',       'Análisis de datos con Python, Pandas y visualización',   '2026-06-15', '2026-10-15', 'activo'),
('Gestión de Almacén',             'Logística, inventario y gestión de stocks',              '2026-07-01', '2026-10-31', 'activo');

-- ─────────────────────────────────────────
-- CURSO_ETIQUETA
-- ─────────────────────────────────────────
INSERT INTO curso_etiqueta (id_curso, id_etiqueta) VALUES
(1, 1), (1, 2),
(2, 2), (2, 4),
(3, 7);

-- ─────────────────────────────────────────
-- CANDIDATURA
-- ─────────────────────────────────────────
INSERT INTO candidatura (id_candidato, id_oferta, estado, fecha_aplicacion) VALUES
('12345678A', 'OFE-2026-001', 'PENDIENTE',       '2026-05-14'),
('87654321B', 'OFE-2026-001', 'PRESELECCIONADO', '2026-05-13'),
('11223344C', 'OFE-2026-002', 'PENDIENTE',       '2026-05-14');

-- ─────────────────────────────────────────
-- CERTIFICADO
-- ─────────────────────────────────────────
INSERT INTO certificado (nifnie, tipo, motivo, estado, fecha_emision, codigo_verificacion, observaciones) VALUES
('12345678A', 'CERTIFICADO_PROFESIONALIDAD', 'Acreditación para proceso de selección', 'GENERADO',  '2026-04-01', 'COD-2026-AAA-001', 'Aprobado sin incidencias'),
('87654321B', 'CERTIFICADO_PROFESIONALIDAD', 'Acreditación formativa',                 'PENDIENTE', NULL,          NULL,               NULL),
('11223344C', 'CERTIFICADO_PROFESIONALIDAD', 'Solicitud empleo público',               'RECHAZADO', NULL,          NULL,               'Documentación incompleta');

-- ─────────────────────────────────────────
-- SUSCRIPCION
-- ─────────────────────────────────────────
INSERT INTO suscripcion (id_usuario, tipo, fecha_suscripcion, activa) VALUES
('12345678A', 'OFERTA', '2026-05-01', 1),
('12345678A', 'CURSO',  '2026-05-01', 1),
('87654321B', 'OFERTA', '2026-05-03', 1);

-- ─────────────────────────────────────────
-- SUSCRIPCION_ETIQUETA
-- ─────────────────────────────────────────
INSERT INTO suscripcion_etiqueta (id_suscripcion, id_etiqueta) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 2),
(3, 7);

-- ─────────────────────────────────────────
-- NOTIFICACION
-- ─────────────────────────────────────────
INSERT INTO notificacion (asunto, mensaje, tipo, estado, fecha_envio) VALUES
('Bienvenida a LABORA',        'Su registro en LABORA se ha completado correctamente.',                     'ALERTA',             'ENVIADO', '2026-05-01 10:00:00'),
('Nueva oferta compatible',    'Hay una nueva oferta que coincide con sus preferencias.',                   'OFERTA',             'ENVIADO', '2026-05-05 09:00:00'),
('Estado de su certificado',   'Su certificado de profesionalidad ha sido aprobado y está disponible.',    'CERTIFICADO',        'ENVIADO', '2026-04-01 12:00:00');

-- ─────────────────────────────────────────
-- NOTIFICACION_DESTINATARIO
-- ─────────────────────────────────────────
INSERT INTO notificacion_destinatario (id_notificacion, email) VALUES
(1, 'maria.garcia@email.com'),
(2, 'maria.garcia@email.com'),
(2, 'carlos.martinez@email.com'),
(3, 'maria.garcia@email.com');

-- ─────────────────────────────────────────
-- MATCHING_RESULTADO
-- ─────────────────────────────────────────
INSERT INTO matching_resultado (id_oferta, nifnie, puntuacion, max_candidatos, punt_minima, fecha_calculo) VALUES
('OFE-2026-001', '12345678A', 87.50, 10, 60.00, '2026-05-01 10:30:00'),
('OFE-2026-001', '87654321B', 72.00, 10, 60.00, '2026-05-01 10:30:00'),
('OFE-2026-002', '11223344C', 65.25, 10, 60.00, '2026-05-05 09:15:00');

-- ─────────────────────────────────────────
-- VALIDACION
-- ─────────────────────────────────────────
INSERT INTO validacion (tipo, id_referencia, valido, motivo, fecha_validacion) VALUES
('USUARIO',      '12345678A',    1, 'Datos correctos y NIF no duplicado',              '2026-05-01 09:55:00'),
('ELEGIBILIDAD', 'OFE-2026-001', 1, 'El demandante cumple los requisitos de la oferta','2026-05-14 10:55:00'),
('CERTIFICADO',  '12345678A',    1, 'Tipo de certificado válido para el demandante',   '2026-04-01 11:00:00');
