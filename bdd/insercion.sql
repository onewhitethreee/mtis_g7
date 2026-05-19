USE labora;
SET FOREIGN_KEY_CHECKS = 0;



INSERT INTO usuario (id_nie, nombre, apellidos, email, tipo, activo, contrasena_hash) VALUES
('12345678A', 'María',     'García López',      'maria.garcia@email.com',      'DEMANDANTE',    1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz01'),
('87654321B', 'Carlos',    'Martínez Pérez',    'carlos.martinez@email.com',   'DEMANDANTE',    1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz02'),
('11223344C', 'Laura',     'Sánchez Ruiz',      'laura.sanchez@email.com',     'DEMANDANTE',    1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz03'),
('44332211D', 'Javier',    'López Fernández',   'javier.lopez@email.com',      'DEMANDANTE',    0, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz04'),
('55667788E', 'Ana',       'Romero Castillo',   'ana.romero@email.com',        'DEMANDANTE',    1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz05'),
('99887766F', 'Pedro',     'Jiménez Moreno',    'pedro.jimenez@email.com',     'DEMANDANTE',    1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz06'),
('33445566G', 'Elena',     'Torres Navarro',    'elena.torres@email.com',      'DEMANDANTE',    1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz07'),
('77665544H', 'Roberto',   'Díaz Herrera',      'roberto.diaz@email.com',      'REPRESENTANTE', 1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz08'),
('22334455I', 'Sofía',     'Molina Vega',       'sofia.molina@email.com',      'REPRESENTANTE', 1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz09'),
('00112233J', 'Administrador', 'LABORA Sistema','admin@labora.gva.es',         'ADMINISTRADOR', 1, '$2b$12$KIX1234hashejemplo1234abcdefghijklmnopqrstuvwxyz10');


-- ============================================================
-- 2. EMPRESAS
-- ============================================================

INSERT INTO empresa (cif, nombre, razon_social, correo, telefono, fecha_constitucion, sector, clasificacion, activo) VALUES
('B12345678', 'TechSolutions',    'TechSolutions Sociedad Limitada',         'contacto@techsolutions.es',    '965123456', '2010-03-15', 'Tecnología',       'PEQUEÑA',  1),
('A87654321', 'IndustrialGVA',   'Industrial GVA Sociedad Anónima',         'info@industrialgva.es',        '963456789', '2005-07-22', 'Industria',        'MEDIANA',  1),
('B55544433', 'LogisTrans',      'LogisTrans Logística SL',                 'rrhh@logistrans.es',           '961234567', '2015-11-10', 'Logística',        'PEQUEÑA',  1),
('C11122233', 'SaludPlus',       'SaludPlus Servicios Sanitarios SL',       'empleo@saludplus.es',          '964567890', '2008-04-05', 'Sanidad',          'MEDIANA',  1),
('A99988877', 'ConstrucVLC',     'ConstrucVLC Edificaciones SA',            'obras@construcvlc.es',         '962345678', '2001-09-30', 'Construcción',     'GRANDE',   1),
('B33322211', 'DataSoft',        'DataSoft Desarrollo y Consultoría SL',    'trabajo@datasoft.es',          '965987654', '2018-01-20', 'Tecnología',       'MICRO',    1),
('C77788899', 'AlimentaCV',      'AlimentaCV Distribución Alimentaria SL',  'personal@alimentacv.es',       '963789012', '2012-06-14', 'Alimentación',     'PEQUEÑA',  0);


-- ============================================================
-- 3. ETIQUETAS
-- ============================================================

INSERT INTO etiqueta (nombre, categoria) VALUES
('informatica',        'Tecnología'),
('programacion',       'Tecnología'),
('fullstack',          'Tecnología'),
('backend',            'Tecnología'),
('frontend',           'Tecnología'),
('bases-de-datos',     'Tecnología'),
('ciberseguridad',     'Tecnología'),
('logistica',          'Transporte'),
('conduccion',         'Transporte'),
('almacen',            'Transporte'),
('sanidad',            'Salud'),
('enfermeria',         'Salud'),
('atencion-pacientes', 'Salud'),
('construccion',       'Obra'),
('electricidad',       'Obra'),
('fontaneria',         'Obra'),
('administracion',     'Oficina'),
('contabilidad',       'Oficina'),
('atencion-cliente',   'Oficina'),
('ventas',             'Comercial'),
('marketing',          'Comercial'),
('alimentacion',       'Industria'),
('produccion',         'Industria');


-- ============================================================
-- 4. OFERTAS
-- ============================================================

INSERT INTO oferta (id, cif_empresa, titulo, descripcion, duracion_contrato, estado, fecha_publicacion) VALUES
('OFE-2026-001', 'B12345678', 'Desarrollador Full Stack',
 'Buscamos desarrollador con experiencia en React y Node.js para proyectos de digitalización.',
 'INDEFINIDO',  'ACTIVA',  '2026-04-01'),

('OFE-2026-002', 'B12345678', 'Técnico en Ciberseguridad',
 'Perfil especializado en auditorías de seguridad y gestión de vulnerabilidades.',
 'INDEFINIDO',  'ACTIVA',  '2026-04-10'),

('OFE-2026-003', 'A87654321', 'Operario de Producción Industrial',
 'Operario para línea de producción en planta industrial. Turno de mañana.',
 'TEMPORAL',    'ACTIVA',  '2026-04-15'),

('OFE-2026-004', 'B55544433', 'Conductor de Camión C+E',
 'Conductor con carnet C+E y experiencia mínima de 2 años en transporte nacional.',
 'INDEFINIDO',  'ACTIVA',  '2026-04-20'),

('OFE-2026-005', 'C11122233', 'Auxiliar de Enfermería',
 'Auxiliar para centro sanitario concertado en Valencia. Turno rotativo.',
 'TEMPORAL',    'ACTIVA',  '2026-04-22'),

('OFE-2026-006', 'A99988877', 'Oficial Electricista',
 'Oficial de 1ª electricista para obras de construcción en la provincia de Alicante.',
 'TEMPORAL',    'ACTIVA',  '2026-05-01'),

('OFE-2026-007', 'B33322211', 'Analista de Datos Junior',
 'Analista con conocimientos en SQL, Python y visualización de datos.',
 'PRACTICAS',   'ACTIVA',  '2026-05-05'),

('OFE-2026-008', 'B12345678', 'Desarrollador Backend Java',
 'Desarrollador Java con experiencia en Spring Boot y microservicios.',
 'INDEFINIDO',  'CERRADA', '2026-03-01'),

('OFE-2026-009', 'C11122233', 'Técnico Administrativo Sanitario',
 'Gestión de citas, historiales y atención al paciente en centro de salud.',
 'TEMPORAL',    'PAUSADA', '2026-04-28'),

('OFE-2026-010', 'A87654321', 'Responsable de Almacén',
 'Coordinación del almacén central. Experiencia con ERP y gestión de inventario.',
 'INDEFINIDO',  'ACTIVA',  '2026-05-10');


-- ============================================================
-- 4a. OFERTA_ETIQUETA
-- ============================================================

INSERT INTO oferta_etiqueta (id_oferta, id_etiqueta) VALUES
-- OFE-2026-001: fullstack, programacion, frontend, backend
('OFE-2026-001', 3), ('OFE-2026-001', 2), ('OFE-2026-001', 5), ('OFE-2026-001', 4),
-- OFE-2026-002: ciberseguridad, informatica
('OFE-2026-002', 7), ('OFE-2026-002', 1),
-- OFE-2026-003: produccion, alimentacion (industria)
('OFE-2026-003', 23), ('OFE-2026-003', 22),
-- OFE-2026-004: conduccion, logistica
('OFE-2026-004', 9), ('OFE-2026-004', 8),
-- OFE-2026-005: enfermeria, sanidad, atencion-pacientes
('OFE-2026-005', 12), ('OFE-2026-005', 11), ('OFE-2026-005', 13),
-- OFE-2026-006: electricidad, construccion
('OFE-2026-006', 15), ('OFE-2026-006', 14),
-- OFE-2026-007: bases-de-datos, informatica, programacion
('OFE-2026-007', 6), ('OFE-2026-007', 1), ('OFE-2026-007', 2),
-- OFE-2026-008: backend, java (programacion), bases-de-datos
('OFE-2026-008', 4), ('OFE-2026-008', 2), ('OFE-2026-008', 6),
-- OFE-2026-009: administracion, atencion-cliente, sanidad
('OFE-2026-009', 17), ('OFE-2026-009', 19), ('OFE-2026-009', 11),
-- OFE-2026-010: almacen, logistica, administracion
('OFE-2026-010', 10), ('OFE-2026-010', 8), ('OFE-2026-010', 17);


-- ============================================================
-- 5. CURSOS
-- ============================================================

INSERT INTO curso (titulo, descripcion, fecha_inicio, fecha_fin, estado) VALUES
('Introducción a la Programación',          'Curso básico de programación orientado a desempleados sin experiencia previa.',       '2026-06-01', '2026-09-30', 'activo'),
('Desarrollo Web Full Stack con React',     'Formación avanzada en desarrollo web con React, Node.js y bases de datos.',            '2026-06-15', '2026-12-15', 'activo'),
('Ciberseguridad Empresarial',              'Fundamentos de seguridad informática, auditorías y gestión de incidentes.',            '2026-07-01', '2026-10-31', 'activo'),
('Logística y Gestión de Almacenes',        'Organización de almacenes, gestión de inventario y uso de ERP logístico.',             '2026-05-15', '2026-08-15', 'activo'),
('Auxiliar de Enfermería',                  'Formación para auxiliar de enfermería con prácticas en centro sanitario concertado.',  '2026-09-01', '2027-03-31', 'activo'),
('Electricidad de Baja Tensión',            'Instalaciones eléctricas en baja tensión. Certificación oficial incluida.',            '2026-06-01', '2026-09-01', 'activo'),
('Administración y Gestión Empresarial',    'Contabilidad, facturación, nóminas y ofimática avanzada.',                            '2026-05-01', '2026-07-31', 'activo'),
('SQL y Análisis de Datos',                 'Consultas SQL, modelado de datos y visualización con herramientas BI.',                '2026-06-01', '2026-08-31', 'activo'),
('Marketing Digital y Redes Sociales',      'Estrategia de contenidos, SEO, SEM y gestión de campañas digitales.',                  '2026-04-01', '2026-05-31', 'finalizado'),
('Atención al Cliente y Ventas',            'Técnicas de venta, gestión de reclamaciones y comunicación efectiva con clientes.',    '2026-07-01', '2026-09-30', 'activo');


-- ============================================================
-- 5a. CURSO_ETIQUETA
-- ============================================================

INSERT INTO curso_etiqueta (id_curso, id_etiqueta) VALUES
-- Curso 1: informatica, programacion
(1, 1), (1, 2),
-- Curso 2: fullstack, programacion, frontend, backend, bases-de-datos
(2, 3), (2, 2), (2, 5), (2, 4), (2, 6),
-- Curso 3: ciberseguridad, informatica
(3, 7), (3, 1),
-- Curso 4: logistica, almacen
(4, 8), (4, 10),
-- Curso 5: enfermeria, sanidad, atencion-pacientes
(5, 12), (5, 11), (5, 13),
-- Curso 6: electricidad, construccion
(6, 15), (6, 14),
-- Curso 7: administracion, contabilidad
(7, 17), (7, 18),
-- Curso 8: bases-de-datos, informatica, programacion
(8, 6), (8, 1), (8, 2),
-- Curso 9: marketing, ventas
(9, 21), (9, 20),
-- Curso 10: atencion-cliente, ventas
(10, 19), (10, 20);


-- ============================================================
-- 6. CANDIDATURAS
--    Proceso 2: aplicación de demandantes a ofertas
-- ============================================================

INSERT INTO candidatura (id_candidato, id_oferta, estado, fecha_aplicacion) VALUES
-- María García aplica a Full Stack (compatible por etiquetas)
('12345678A', 'OFE-2026-001', 'PRESELECCIONADO', '2026-04-05'),
-- Carlos Martínez aplica a Full Stack
('87654321B', 'OFE-2026-001', 'PENDIENTE',        '2026-04-06'),
-- Laura Sánchez aplica a Ciberseguridad
('11223344C', 'OFE-2026-002', 'ACEPTADO',         '2026-04-12'),
-- Ana Romero aplica a Auxiliar de Enfermería
('55667788E', 'OFE-2026-005', 'PENDIENTE',        '2026-04-23'),
-- Pedro Jiménez aplica a Oficial Electricista
('99887766F', 'OFE-2026-006', 'PENDIENTE',        '2026-05-02'),
-- Elena Torres aplica a Analista de Datos
('33445566G', 'OFE-2026-007', 'PRESELECCIONADO',  '2026-05-06'),
-- María García también aplica a Analista de Datos
('12345678A', 'OFE-2026-007', 'PENDIENTE',        '2026-05-07'),
-- Carlos Martínez aplica a Backend Java (oferta cerrada)
('87654321B', 'OFE-2026-008', 'RECHAZADO',        '2026-03-10'),
-- Ana Romero aplica a Técnico Administrativo Sanitario
('55667788E', 'OFE-2026-009', 'PENDIENTE',        '2026-04-29'),
-- Pedro Jiménez aplica a Responsable de Almacén
('99887766F', 'OFE-2026-010', 'PENDIENTE',        '2026-05-11');


-- ============================================================
-- 7. SUSCRIPCIONES
--    Proceso 5: preferencias de demandantes
-- ============================================================

INSERT INTO suscripcion (id_usuario, tipo, fecha_suscripcion, activa) VALUES
('12345678A', 'OFERTA',  '2026-03-01', 1),  -- María: ofertas tecnología
('12345678A', 'CURSO',   '2026-03-01', 1),  -- María: cursos tecnología
('87654321B', 'OFERTA',  '2026-03-05', 1),  -- Carlos: ofertas backend
('11223344C', 'OFERTA',  '2026-03-10', 1),  -- Laura: ofertas ciberseguridad
('55667788E', 'OFERTA',  '2026-04-01', 1),  -- Ana: ofertas sanidad
('55667788E', 'CURSO',   '2026-04-01', 1),  -- Ana: cursos sanidad
('99887766F', 'OFERTA',  '2026-04-10', 1),  -- Pedro: ofertas obra y logística
('33445566G', 'OFERTA',  '2026-04-15', 1),  -- Elena: ofertas datos
('33445566G', 'CURSO',   '2026-04-15', 1),  -- Elena: cursos datos
('87654321B', 'CURSO',   '2026-03-05', 0);  -- Carlos: cursos (cancelada)


-- ============================================================
-- 7a. SUSCRIPCION_ETIQUETA
-- ============================================================

INSERT INTO suscripcion_etiqueta (id_suscripcion, id_etiqueta) VALUES
-- Suscripción 1 (María, OFERTA): fullstack, programacion, frontend
(1, 3), (1, 2), (1, 5),
-- Suscripción 2 (María, CURSO): fullstack, programacion, bases-de-datos
(2, 3), (2, 2), (2, 6),
-- Suscripción 3 (Carlos, OFERTA): backend, programacion, bases-de-datos
(3, 4), (3, 2), (3, 6),
-- Suscripción 4 (Laura, OFERTA): ciberseguridad, informatica
(4, 7), (4, 1),
-- Suscripción 5 (Ana, OFERTA): enfermeria, sanidad, atencion-pacientes
(5, 12), (5, 11), (5, 13),
-- Suscripción 6 (Ana, CURSO): enfermeria, sanidad
(6, 12), (6, 11),
-- Suscripción 7 (Pedro, OFERTA): electricidad, construccion, logistica
(7, 15), (7, 14), (7, 8),
-- Suscripción 8 (Elena, OFERTA): bases-de-datos, informatica, programacion
(8, 6), (8, 1), (8, 2),
-- Suscripción 9 (Elena, CURSO): bases-de-datos, informatica
(9, 6), (9, 1),
-- Suscripción 10 (Carlos, CURSO, cancelada): backend, programacion
(10, 4), (10, 2);


-- ============================================================
-- 8. CERTIFICADOS
--    Proceso 3: WSDL SolicitarCertificado / MarcarCertificado
-- ============================================================

INSERT INTO certificado (nifnie, tipo, motivo, estado, fecha_emision, codigo_verificacion, observaciones) VALUES
('12345678A', 'CERTIFICADO_PROFESIONALIDAD',
 'Acreditación para proceso de selección empresa TechSolutions',
 'GENERADO', '2026-04-20', 'LABORA-CERT-2026-00001', NULL),

('87654321B', 'INFORME_VIDA_LABORAL',
 'Solicitud para trámite bancario',
 'GENERADO', '2026-04-25', 'LABORA-CERT-2026-00002', NULL),

('11223344C', 'CERTIFICADO_DESEMPLEO',
 'Justificante de situación de desempleo para beca formativa',
 'PENDIENTE', NULL, NULL, NULL),

('55667788E', 'CERTIFICADO_PROFESIONALIDAD',
 'Acreditación para oposición auxiliar de enfermería',
 'RECHAZADO', NULL, NULL, 'No se acredita formación mínima requerida para este tipo de certificado.'),

('99887766F', 'INFORME_VIDA_LABORAL',
 'Necesario para renovación de carnet de conducir profesional',
 'GENERADO', '2026-05-02', 'LABORA-CERT-2026-00003', NULL),

('33445566G', 'CERTIFICADO_DESEMPLEO',
 'Documentación para acceso a ayuda municipal',
 'PENDIENTE', NULL, NULL, NULL),

('12345678A', 'CERTIFICADO_DESEMPLEO',
 'Solicitud de justificante para matrícula universitaria',
 'GENERADO', '2026-05-10', 'LABORA-CERT-2026-00004', NULL);


-- ============================================================
-- 9. VALIDACIONES
--    Registro de auditoría de los 5 procesos
-- ============================================================

INSERT INTO validacion (tipo, id_referencia, valido, motivo, fecha_validacion) VALUES
-- Proceso 4: alta de demandantes
('USUARIO', '12345678A', 1, 'Datos correctos. NIF no duplicado.',                              '2026-03-01 09:10:00'),
('USUARIO', '87654321B', 1, 'Datos correctos. NIF no duplicado.',                              '2026-03-05 10:20:00'),
('USUARIO', '44332211D', 0, 'Formato de email incorrecto.',                                    '2026-03-08 11:05:00'),
('USUARIO', '11223344C', 1, 'Datos correctos. NIF no duplicado.',                              '2026-03-10 08:45:00'),
-- Proceso 3: certificados
('CERTIFICADO', '12345678A', 1, 'Tipo CERTIFICADO_PROFESIONALIDAD válido para el demandante.', '2026-04-18 14:00:00'),
('CERTIFICADO', '55667788E', 0, 'No se acredita formación mínima para CERTIFICADO_PROFESIONALIDAD.', '2026-04-30 09:30:00'),
('CERTIFICADO', '99887766F', 1, 'Tipo INFORME_VIDA_LABORAL válido.',                           '2026-05-01 11:15:00'),
-- Proceso 2: elegibilidad candidaturas
('ELEGIBILIDAD', 'OFE-2026-001', 1, 'Demandante 12345678A cumple requisitos de la oferta.',   '2026-04-05 10:00:00'),
('ELEGIBILIDAD', 'OFE-2026-001', 1, 'Demandante 87654321B cumple requisitos de la oferta.',   '2026-04-06 10:30:00'),
('ELEGIBILIDAD', 'OFE-2026-002', 1, 'Demandante 11223344C cumple requisitos de la oferta.',   '2026-04-12 09:00:00'),
('ELEGIBILIDAD', 'OFE-2026-008', 0, 'Demandante 87654321B no cumple experiencia mínima.',     '2026-03-10 16:00:00'),
-- Proceso 5: etiquetas de suscripción
('ETIQUETAS', '12345678A', 1, 'Etiquetas fullstack, programacion, frontend existen en el sistema.', '2026-03-01 09:05:00'),
('ETIQUETAS', '55667788E', 1, 'Etiquetas enfermeria, sanidad existen en el sistema.',               '2026-04-01 10:00:00'),
('ETIQUETAS', '99887766F', 1, 'Etiquetas electricidad, construccion, logistica válidas.',           '2026-04-10 11:30:00');


-- ============================================================
-- 10. NOTIFICACIONES
--     Proceso transversal: todos los flujos
-- ============================================================

INSERT INTO notificacion (asunto, mensaje, tipo, estado, fecha_envio) VALUES
-- Proceso 1: publicación de oferta → notificación a empresa y demandantes
('Oferta publicada correctamente',
 'Su oferta "Desarrollador Full Stack" ha sido publicada en la plataforma LABORA.',
 'OFERTA', 'ENVIADO', '2026-04-01 12:00:00'),

('Nueva oferta compatible con tu perfil',
 'Se ha publicado la oferta "Desarrollador Full Stack" que coincide con tus preferencias.',
 'OFERTA', 'ENVIADO', '2026-04-01 12:05:00'),

-- Proceso 2: candidatura registrada
('Candidatura recibida',
 'Hemos recibido tu candidatura para la oferta "Desarrollador Full Stack". Te notificaremos el resultado.',
 'ESTADO_CANDIDATURA', 'ENVIADO', '2026-04-05 10:10:00'),

('Nuevo candidato para tu oferta',
 'El demandante María García ha aplicado a tu oferta "Desarrollador Full Stack".',
 'ESTADO_CANDIDATURA', 'ENVIADO', '2026-04-05 10:10:00'),

('Candidatura rechazada',
 'Lamentamos informarte de que tu candidatura para "Desarrollador Backend Java" no ha sido seleccionada.',
 'ESTADO_CANDIDATURA', 'ENVIADO', '2026-03-11 09:00:00'),

-- Proceso 3: certificado
('Certificado generado correctamente',
 'Su certificado de tipo CERTIFICADO_PROFESIONALIDAD ha sido generado. Puede descargarlo en su área personal.',
 'CERTIFICADO', 'ENVIADO', '2026-04-20 15:00:00'),

('Solicitud de certificado denegada',
 'Su solicitud de CERTIFICADO_PROFESIONALIDAD ha sido denegada. Motivo: no se acredita formación mínima requerida.',
 'CERTIFICADO', 'ENVIADO', '2026-04-30 10:00:00'),

-- Proceso 4: alta de demandante
('Bienvenida a LABORA',
 'Su registro como demandante de empleo ha sido completado. Ya puede acceder a todas las funcionalidades de la plataforma.',
 'SUSCRIPCION', 'ENVIADO', '2026-03-01 09:15:00'),

-- Proceso 5: confirmación de suscripción
('Suscripción activada',
 'Se han registrado tus preferencias de suscripción a ofertas de empleo con etiquetas: fullstack, programacion, frontend.',
 'SUSCRIPCION', 'ENVIADO', '2026-03-01 09:20:00'),

-- Notificación con error
('Nueva oferta compatible con tu perfil',
 'Se ha publicado la oferta "Técnico en Ciberseguridad" que coincide con tus preferencias.',
 'OFERTA', 'ERROR', NULL);


-- ============================================================
-- 10a. NOTIFICACION_DESTINATARIO
-- ============================================================

INSERT INTO notificacion_destinatario (id_notificacion, email) VALUES
-- Notif 1 → empresa TechSolutions
(1,  'contacto@techsolutions.es'),
-- Notif 2 → demandantes compatibles con OFE-2026-001
(2,  'maria.garcia@email.com'),
(2,  'carlos.martinez@email.com'),
(2,  'elena.torres@email.com'),
-- Notif 3 → demandante que candidató
(3,  'maria.garcia@email.com'),
-- Notif 4 → empresa
(4,  'contacto@techsolutions.es'),
-- Notif 5 → candidato rechazado
(5,  'carlos.martinez@email.com'),
-- Notif 6 → certificado generado
(6,  'maria.garcia@email.com'),
-- Notif 7 → certificado denegado
(7,  'ana.romero@email.com'),
-- Notif 8 → bienvenida alta
(8,  'maria.garcia@email.com'),
-- Notif 9 → confirmación suscripción
(9,  'maria.garcia@email.com'),
-- Notif 10 → error de envío
(10, 'laura.sanchez@email.com');


-- ============================================================
-- 11. MATCHING_RESULTADO
--     WSDL ServicioMatching — EjecutarMatching
--     Proceso 1: demandantes compatibles con ofertas publicadas
-- ============================================================

INSERT INTO matching_resultado (id_oferta, nifnie, puntuacion, max_candidatos, punt_minima, fecha_calculo) VALUES
-- OFE-2026-001: Desarrollador Full Stack
('OFE-2026-001', '12345678A', 92.50, 10, 60.00, '2026-04-01 12:00:00'),
('OFE-2026-001', '87654321B', 88.00, 10, 60.00, '2026-04-01 12:00:00'),
('OFE-2026-001', '33445566G', 75.25, 10, 60.00, '2026-04-01 12:00:00'),

-- OFE-2026-002: Técnico en Ciberseguridad
('OFE-2026-002', '11223344C', 95.00, 10, 60.00, '2026-04-10 12:00:00'),
('OFE-2026-002', '12345678A', 68.75, 10, 60.00, '2026-04-10 12:00:00'),

-- OFE-2026-004: Conductor C+E
('OFE-2026-004', '99887766F', 80.00, 10, 60.00, '2026-04-20 12:00:00'),

-- OFE-2026-005: Auxiliar de Enfermería
('OFE-2026-005', '55667788E', 91.00, 10, 60.00, '2026-04-22 12:00:00'),

-- OFE-2026-006: Oficial Electricista
('OFE-2026-006', '99887766F', 85.50, 10, 60.00, '2026-05-01 12:00:00'),

-- OFE-2026-007: Analista de Datos Junior
('OFE-2026-007', '33445566G', 89.00, 10, 60.00, '2026-05-05 12:00:00'),
('OFE-2026-007', '12345678A', 82.00, 10, 60.00, '2026-05-05 12:00:00'),
('OFE-2026-007', '87654321B', 77.50, 10, 60.00, '2026-05-05 12:00:00'),

-- OFE-2026-010: Responsable de Almacén
('OFE-2026-010', '99887766F', 74.00, 10, 60.00, '2026-05-10 12:00:00');

SET FOREIGN_KEY_CHECKS = 1;