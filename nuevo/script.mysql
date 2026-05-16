SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS labora;
CREATE DATABASE labora CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE labora;



CREATE TABLE usuario (
    id_nie          VARCHAR(10)     NOT NULL            COMMENT 'NIF o NIE del ciudadano (PK)',
    nombre          VARCHAR(100)    NOT NULL,
    apellidos       VARCHAR(150)    NOT NULL,
    email           VARCHAR(254)    NOT NULL,
    tipo            ENUM(
                        'DEMANDANTE',
                        'REPRESENTANTE',
                        'ADMINISTRADOR'
                    )               NOT NULL            COMMENT 'Rol del usuario en el sistema',
    activo          TINYINT(1)      NOT NULL DEFAULT 1  COMMENT '1 = activo, 0 = inactivo',

    -- ServicioIdentidad (WSDL): CrearContrasena / AutenticarUsuario
    contrasena_hash VARCHAR(255)    NOT NULL            COMMENT 'Hash bcrypt de la contraseña',

    CONSTRAINT pk_usuario PRIMARY KEY (id_nie),
    CONSTRAINT uq_usuario_email UNIQUE (email)
) ENGINE=InnoDB COMMENT='Ciudadanos registrados en la plataforma LABORA';




CREATE TABLE empresa (
    cif                 VARCHAR(9)      NOT NULL            COMMENT 'CIF de la empresa (PK)',
    nombre              VARCHAR(150)    NOT NULL,
    razon_social        VARCHAR(200)    NOT NULL,
    correo              VARCHAR(254)    NOT NULL,
    telefono            VARCHAR(20)     NOT NULL,
    fecha_constitucion  DATE            NOT NULL,
    sector              VARCHAR(100)    NOT NULL,
    clasificacion       ENUM(
                            'MICRO',
                            'PEQUEÑA',
                            'MEDIANA',
                            'GRANDE'
                        )               NOT NULL,
    activo              TINYINT(1)      NOT NULL DEFAULT 1  COMMENT '1 = activa, 0 = inactiva',

    CONSTRAINT pk_empresa PRIMARY KEY (cif)
) ENGINE=InnoDB COMMENT='Empresas registradas en LABORA';




CREATE TABLE etiqueta (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(80)     NOT NULL,
    categoria   VARCHAR(80)     NULL                    COMMENT 'Agrupación temática opcional',

    CONSTRAINT pk_etiqueta      PRIMARY KEY (id),
    CONSTRAINT uq_etiqueta_nom  UNIQUE (nombre)
) ENGINE=InnoDB COMMENT='Catálogo de etiquetas para ofertas, cursos y suscripciones';




CREATE TABLE oferta (
    id                  VARCHAR(20)     NOT NULL            COMMENT 'Ej: OFE-2026-001',
    cif_empresa         VARCHAR(9)      NOT NULL,
    titulo              VARCHAR(200)    NOT NULL,
    descripcion         TEXT            NOT NULL,
    duracion_contrato   ENUM(
                            'INDEFINIDO',
                            'TEMPORAL',
                            'ALTERNANCIA',
                            'PRACTICAS'
                        )               NOT NULL,
    estado              ENUM(
                            'ACTIVA',
                            'CERRADA',
                            'PAUSADA'
                        )               NOT NULL DEFAULT 'ACTIVA',
    fecha_publicacion   DATE            NULL,

    CONSTRAINT pk_oferta        PRIMARY KEY (id),
    CONSTRAINT fk_oferta_empresa
        FOREIGN KEY (cif_empresa) REFERENCES empresa(cif)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Ofertas de trabajo publicadas por empresas';




CREATE TABLE oferta_etiqueta (
    id_oferta   VARCHAR(20)     NOT NULL,
    id_etiqueta INT UNSIGNED    NOT NULL,

    CONSTRAINT pk_oferta_etiqueta   PRIMARY KEY (id_oferta, id_etiqueta),
    CONSTRAINT fk_oe_oferta
        FOREIGN KEY (id_oferta)   REFERENCES oferta(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_oe_etiqueta
        FOREIGN KEY (id_etiqueta) REFERENCES etiqueta(id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Etiquetas asociadas a cada oferta';




CREATE TABLE curso (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    titulo          VARCHAR(200)    NOT NULL,
    descripcion     TEXT            NOT NULL,
    fecha_inicio    DATE            NOT NULL,
    fecha_fin       DATE            NOT NULL,
    estado          ENUM(
                        'activo',
                        'inactivo',
                        'finalizado'
                    )               NOT NULL DEFAULT 'activo',

    CONSTRAINT pk_curso PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='Cursos de formación de la plataforma LABORA';



CREATE TABLE curso_etiqueta (
    id_curso    INT UNSIGNED    NOT NULL,
    id_etiqueta INT UNSIGNED    NOT NULL,

    CONSTRAINT pk_curso_etiqueta    PRIMARY KEY (id_curso, id_etiqueta),
    CONSTRAINT fk_ce_curso
        FOREIGN KEY (id_curso)    REFERENCES curso(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_ce_etiqueta
        FOREIGN KEY (id_etiqueta) REFERENCES etiqueta(id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Etiquetas asociadas a cada curso';




CREATE TABLE candidatura (
    id                  INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    id_candidato        VARCHAR(10)     NOT NULL            COMMENT 'NIF/NIE del demandante',
    id_oferta           VARCHAR(20)     NOT NULL,
    estado              ENUM(
                            'PENDIENTE',
                            'PRESELECCIONADO',
                            'RECHAZADO',
                            'ACEPTADO'
                        )               NOT NULL DEFAULT 'PENDIENTE',
    fecha_aplicacion    DATE            NOT NULL DEFAULT (CURRENT_DATE),

    CONSTRAINT pk_candidatura   PRIMARY KEY (id),
    CONSTRAINT uq_candidatura   UNIQUE (id_candidato, id_oferta)   COMMENT 'Un demandante solo puede aplicar una vez por oferta',
    CONSTRAINT fk_cand_usuario
        FOREIGN KEY (id_candidato) REFERENCES usuario(id_nie)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_cand_oferta
        FOREIGN KEY (id_oferta)    REFERENCES oferta(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Candidaturas de demandantes a ofertas de trabajo';




CREATE TABLE suscripcion (
    id                  INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    id_usuario          VARCHAR(10)     NOT NULL            COMMENT 'NIF/NIE del demandante',
    tipo                ENUM(
                            'OFERTA',
                            'CURSO'
                        )               NOT NULL,
    fecha_suscripcion   DATE            NOT NULL DEFAULT (CURRENT_DATE),
    activa              TINYINT(1)      NOT NULL DEFAULT 1,

    CONSTRAINT pk_suscripcion PRIMARY KEY (id),
    CONSTRAINT fk_susc_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_nie)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Suscripciones de demandantes a ofertas o cursos por etiquetas';




CREATE TABLE suscripcion_etiqueta (
    id_suscripcion  INT UNSIGNED    NOT NULL,
    id_etiqueta     INT UNSIGNED    NOT NULL,

    CONSTRAINT pk_suscripcion_etiqueta  PRIMARY KEY (id_suscripcion, id_etiqueta),
    CONSTRAINT fk_se_suscripcion
        FOREIGN KEY (id_suscripcion) REFERENCES suscripcion(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_se_etiqueta
        FOREIGN KEY (id_etiqueta)    REFERENCES etiqueta(id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Etiquetas de interés de cada suscripción';



CREATE TABLE certificado (
    id                  INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nifnie              VARCHAR(10)     NOT NULL            COMMENT 'Demandante solicitante',
    tipo                VARCHAR(100)    NOT NULL            COMMENT 'Ej: CERTIFICADO_PROFESIONALIDAD',
    motivo              TEXT            NULL                COMMENT 'Motivo de la solicitud (opcional en WSDL)',
    estado              VARCHAR(50)     NOT NULL            COMMENT 'PENDIENTE | GENERADO | RECHAZADO',
    fecha_emision       DATE            NULL                COMMENT 'Rellenado al marcar como generado',
    codigo_verificacion VARCHAR(100)    NULL                COMMENT 'Código único de verificación del certificado',
    observaciones       TEXT            NULL                COMMENT 'Observaciones del administrador (MarcarCertificado)',

    CONSTRAINT pk_certificado PRIMARY KEY (id),
    CONSTRAINT fk_cert_usuario
        FOREIGN KEY (nifnie) REFERENCES usuario(id_nie)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB COMMENT='Certificados oficiales solicitados por demandantes vía SOAP';




CREATE TABLE validacion (
    id                  INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    tipo                ENUM(
                            'USUARIO',
                            'CERTIFICADO',
                            'ETIQUETAS',
                            'ELEGIBILIDAD'
                        )               NOT NULL,
    id_referencia       VARCHAR(50)     NULL                COMMENT 'NIF/NIE, id_oferta, etc. según tipo',
    valido              TINYINT(1)      NOT NULL,
    motivo              TEXT            NULL                COMMENT 'Descripción del resultado o causa del rechazo',
    fecha_validacion    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_validacion PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='Registro de auditoría de todas las validaciones del sistema';




CREATE TABLE notificacion (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    asunto          VARCHAR(300)    NOT NULL,
    mensaje         TEXT            NOT NULL,
    tipo            ENUM(
                        'OFERTA',
                        'CERTIFICADO',
                        'ESTADO_CANDIDATURA',
                        'SUSCRIPCION',
                        'ALERTA'
                    )               NULL,
    estado          ENUM(
                        'PENDIENTE',
                        'ENVIADO',
                        'ERROR'
                    )               NOT NULL DEFAULT 'PENDIENTE',
    fecha_envio     DATETIME        NULL,

    CONSTRAINT pk_notificacion PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='Notificaciones enviadas a usuarios y empresas';




CREATE TABLE notificacion_destinatario (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    id_notificacion INT UNSIGNED    NOT NULL,
    email           VARCHAR(254)    NOT NULL,

    CONSTRAINT pk_notif_dest    PRIMARY KEY (id),
    CONSTRAINT fk_nd_notificacion
        FOREIGN KEY (id_notificacion) REFERENCES notificacion(id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Destinatarios (emails) de cada notificación';




CREATE TABLE matching_resultado (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    id_oferta       VARCHAR(20)     NOT NULL,
    nifnie          VARCHAR(10)     NOT NULL            COMMENT 'Demandante compatible',
    puntuacion      DECIMAL(5,2)    NOT NULL            COMMENT 'Puntuación de afinidad (0.00–100.00)',
    max_candidatos  INT             NULL                COMMENT 'Límite aplicado en la ejecución',
    punt_minima     DECIMAL(5,2)    NULL                COMMENT 'Umbral mínimo aplicado',
    fecha_calculo   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_matching          PRIMARY KEY (id),
    CONSTRAINT uq_matching_oferta_candidato UNIQUE (id_oferta, nifnie),
    CONSTRAINT fk_match_oferta
        FOREIGN KEY (id_oferta) REFERENCES oferta(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_match_usuario
        FOREIGN KEY (nifnie)    REFERENCES usuario(id_nie)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Resultados del algoritmo de matching SOAP por oferta';




-- Búsquedas frecuentes de candidaturas por oferta o por candidato
CREATE INDEX idx_candidatura_oferta     ON candidatura (id_oferta);
CREATE INDEX idx_candidatura_candidato  ON candidatura (id_candidato);

-- Filtrado de ofertas por empresa y estado
CREATE INDEX idx_oferta_empresa         ON oferta (cif_empresa);
CREATE INDEX idx_oferta_estado          ON oferta (estado);

-- Filtrado de suscripciones por usuario
CREATE INDEX idx_suscripcion_usuario    ON suscripcion (id_usuario);

-- Búsquedas de certificados por demandante y estado
CREATE INDEX idx_cert_nifnie            ON certificado (nifnie);
CREATE INDEX idx_cert_estado            ON certificado (estado);

-- Consultas de matching por oferta
CREATE INDEX idx_matching_oferta        ON matching_resultado (id_oferta);

-- Notificaciones por estado (para el worker de envío)
CREATE INDEX idx_notif_estado           ON notificacion (estado);

-- Validaciones por tipo y fecha (auditoría)
CREATE INDEX idx_valid_tipo_fecha       ON validacion (tipo, fecha_validacion);

SET FOREIGN_KEY_CHECKS = 1;