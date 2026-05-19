SE labora;

-- 1. Insertar Empresa de pruebas
INSERT INTO empresa (cif, nombre, razon_social, correo, telefono, fecha_constitucion, sector, clasificacion, activo)
VALUES ('A12345678', 'Tech Solutions', 'Tech Solutions S.L.', 'contacto@techsolutions.com', '910000000', '2020-01-15', 'Tecnología', 'MEDIANA', 1);

-- 2. Insertar Oferta de trabajo (ID: OFE-2026-001)
INSERT INTO oferta (id, cif_empresa, titulo, descripcion, duracion_contrato, estado, fecha_publicacion)
VALUES ('PRUEBA-001', 'A12345678', 'Desarrollador Backend Senior', 'Buscamos un ingeniero con experiencia en entornos Java.', 'INDEFINIDO', 'ACTIVA', CURDATE());

-- 3. Insertar Catálogo de Etiquetas
INSERT INTO etiqueta (id, nombre, categoria) VALUES
(1, 'Java', 'Programación'),
(2, 'SQL', 'Bases de Datos'),
(3, 'Spring Boot', 'Frameworks'),
(4, 'Python', 'Programación'); -- Etiqueta sobrante para control

-- 4. Asociar 3 Etiquetas a la Oferta (Total de la oferta = 3)
INSERT INTO oferta_etiqueta (id_oferta, id_etiqueta) VALUES
('PRUEBA-001', 1), -- Java
('PRUEBA-001', 2), -- SQL
('PRUEBA-001', 3); -- Spring Boot

-- 5. Usuarios (Demandantes y otros roles para probar filtros)
INSERT INTO usuario (id_nie, nombre, apellidos, email, tipo, activo, contrasena_hash) VALUES
('11111111A', 'Juan', 'Perfecto', 'juan@email.com', 'DEMANDANTE', 1, 'hash_bcrypt'),
('22222222B', 'Ana', 'Parcial', 'ana@email.com', 'DEMANDANTE', 1, 'hash_bcrypt'),
('33333333C', 'Pedro', 'SinMatch', 'pedro@email.com', 'DEMANDANTE', 1, 'hash_bcrypt'),
('44444444D', 'Luis', 'Inactivo', 'luis@email.com', 'DEMANDANTE', 0, 'hash_bcrypt'), -- Validar filtro activo=1
('55555555E', 'Marta', 'Admin', 'marta@email.com', 'ADMINISTRADOR', 1, 'hash_bcrypt'); -- Validar filtro tipo='DEMANDANTE'

-- 6. Certificados de los Usuarios (Recuerda que une c.tipo con e.nombre)
INSERT INTO certificado (nifnie, tipo, estado, codigo_verificacion) VALUES
-- Juan: Tiene las 3 etiquetas exactas -> Debería obtener 100.00%
('11111111A', 'Java', 'GENERADO', 'COD-PRUEBA-001'),
('11111111A', 'SQL', 'GENERADO', 'COD-PRUEBA-002'),
('11111111A', 'Spring Boot', 'GENERADO', 'COD-PRUEBA-003'),

-- Ana: Tiene 2 etiquetas de la oferta y una que no aplica -> Debería obtener 66.67%
('22222222B', 'Java', 'GENERADO', 'COD-PRUEBA-004'),
('22222222B', 'SQL', 'GENERADO', 'COD-PRUEBA-005'),
('22222222B', 'Python', 'GENERADO', 'COD-PRUEBA-006'), -- No está en la oferta

-- Pedro: Tiene un certificado que no está en la oferta -> No debería aparecer en los resultados
('33333333C', 'Python', 'GENERADO', 'COD-PRUEBA-007'),

-- Luis: Tiene match perfecto pero está INACTIVO -> No debería aparecer en los resultados
('44444444D', 'Java', 'GENERADO', 'COD-PRUEBA-008'),
('44444444D', 'SQL', 'GENERADO', 'COD-PRUEBA-009'),
('44444444D', 'Spring Boot', 'GENERADO', 'COD-PRUEBA-010'),

-- Marta: Tiene match pero es ADMINISTRADORA -> No debería aparecer en los resultados
('55555555E', 'Java', 'GENERADO', 'COD-PRUEBA-011');
