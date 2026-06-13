-- ============================================================
-- FARMACOV — Script de configuración para equipo
-- Correr en orden, sección por sección en MySQL Workbench
-- Base de datos ya existente: NO recrea tablas base
-- Quarkus maneja: estado en usuarios, FK id_sintoma, grupo_edad como VARCHAR
-- ============================================================
CREATE DATABASE FARMACOV;

USE FARMACOV;

-- ============================================================
-- SECCIÓN 1: CREACIÓN DE ENTIDADES
-- 
-- ============================================================
select * from roles;
-- ------------------------------------------------------------
-- PERFIL USUARIO
-- ------------------------------------------------------------
CREATE TABLE roles (
   id        INT          NOT NULL AUTO_INCREMENT,
   nombre    VARCHAR(100) NOT NULL,
   es_admin  TINYINT(1)   NOT NULL DEFAULT 0,
   PRIMARY KEY (id)
) ENGINE=InnoDB;


CREATE TABLE usuarios (
   id                  BINARY(16)   NOT NULL,
   firebase_uuid       VARCHAR(128) NOT NULL,
   nombre              VARCHAR(100) NOT NULL,
   apellido_paterno    VARCHAR(100) NOT NULL,
   apellido_materno    VARCHAR(100),
   correo              VARCHAR(255) NOT NULL UNIQUE,
   estado              VARCHAR(20) NOT NULL,
   id_rol              INT          NOT NULL,
   departamento        VARCHAR(100),
   creado_en           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
   actualizado_en      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES roles(id)
) ENGINE=InnoDB;


CREATE TABLE bitacora (
   id                    BIGINT       NOT NULL AUTO_INCREMENT,
   id_admin              BINARY(16)   NOT NULL,
   accion                ENUM('CREATE','UPDATE','DELETE') NOT NULL,
   id_usuario_afectado   BINARY(16)   NOT NULL,
   creado_en             DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   CONSTRAINT fk_bitacora_admin    FOREIGN KEY (id_admin)            REFERENCES usuarios(id),
   CONSTRAINT fk_bitacora_afectado FOREIGN KEY (id_usuario_afectado) REFERENCES usuarios(id)
) ENGINE=InnoDB;


-- ------------------------------------------------------------
-- PERFIL VACUNAS
-- ------------------------------------------------------------
CREATE TABLE farmaco (
   id              INT          NOT NULL AUTO_INCREMENT,
   nombre          VARCHAR(100) NOT NULL,
   tipo            VARCHAR(50)  NOT NULL,
   descripcion     TEXT,
   creado_en       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
   actualizado_en  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (id)
) ENGINE=InnoDB;
CREATE TABLE vacunas (
   id                  INT          NOT NULL AUTO_INCREMENT,
   id_farmaco          INT          NOT NULL,
   nombre              VARCHAR(100) NOT NULL,
   farmaceutica        VARCHAR(100),
   tipo                VARCHAR(50),
   descripcion_general TEXT,
   creado_en           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
   actualizado_en      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   CONSTRAINT fk_vacuna_farmaco FOREIGN KEY (id_farmaco) REFERENCES farmaco(id)
) ENGINE=InnoDB;


CREATE TABLE vacuna_condiciones (
   id               INT            NOT NULL AUTO_INCREMENT,
   id_vacuna        INT            NOT NULL,
   temperatura      DECIMAL(5,1)   NOT NULL,
   tiempo_ambiente  DECIMAL(5,1),
   creado_en        DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
   actualizado_en   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   CONSTRAINT fk_condiciones_vacuna FOREIGN KEY (id_vacuna) REFERENCES vacunas(id)
) ENGINE=InnoDB;


CREATE TABLE vacuna_costos (
   id              INT            NOT NULL AUTO_INCREMENT,
   id_vacuna       INT            NOT NULL,
   costo_unitario  DECIMAL(8,2)   NOT NULL,
   creado_en       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
   actualizado_en  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   CONSTRAINT fk_costos_vacuna FOREIGN KEY (id_vacuna) REFERENCES vacunas(id)
) ENGINE=InnoDB;


CREATE TABLE efectos_secundarios (
   id           INT          NOT NULL AUTO_INCREMENT,
   id_vacuna    INT          NOT NULL,
   descripcion  VARCHAR(200) NOT NULL,
   severidad    ENUM('leve','moderado','grave') NOT NULL,
   PRIMARY KEY (id),
   CONSTRAINT fk_efectos_vacuna FOREIGN KEY (id_vacuna) REFERENCES vacunas(id)
) ENGINE=InnoDB;
CREATE TABLE sintomas_graves (
   id         INT          NOT NULL AUTO_INCREMENT,
   id_vacuna  INT          NOT NULL,
   nombre     VARCHAR(150) NOT NULL,
   PRIMARY KEY (id),
   CONSTRAINT fk_sintomas_vacuna FOREIGN KEY (id_vacuna) REFERENCES vacunas(id)
) ENGINE=InnoDB;


CREATE TABLE reportes_adversos (
   id            BIGINT       NOT NULL,
   id_vacuna     INT          NOT NULL,
   id_sintoma    INT,
   sexo          ENUM('M','F','U') NOT NULL,
   grupo_edad    ENUM('0-17','18-29','30-49','50-64','65+','DESCONOCIDO') NOT NULL,
   es_grave      TINYINT(1)   NOT NULL DEFAULT 0,
   fecha_reporte DATE         NOT NULL,
   creado_en     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   CONSTRAINT fk_reporte_vacuna FOREIGN KEY (id_vacuna) REFERENCES vacunas(id)
) ENGINE=InnoDB; 

-- ============================================================
-- SECCIÓN 2: INSERTS
-- 
-- ============================================================

INSERT INTO farmaco (id, nombre, tipo, descripcion) VALUES
(1, 'Vacuna COVID-19', 'vacuna',
 'Grupo de vacunas desarrolladas para prevenir la enfermedad por coronavirus SARS-CoV-2. Utilizan distintas tecnologías para generar inmunidad contra la proteína spike del virus.');




INSERT INTO roles (id, nombre, es_admin) VALUES
(1, 'Director de Análisis Farmacéutico', 0),
(2, 'Administrador',                     1);


INSERT INTO usuarios (
  id,
  firebase_uuid,
  nombre,
  apellido_paterno,
  apellido_materno,
  correo,
  id_rol,
  departamento,
  estado
) VALUES (
  UUID_TO_BIN(UUID()),
  'oBAmwksydCSeiHCfJu6kdQhSX6V2',
  'Jose',
  'Rodriguez',
  'Coronel',
  'jrodriguez@farmacov.com',
  1,
  'Dirección General',
  'ACTIVO'
);



SELECT *
FROM reportes_adversos
WHERE MONTH(fecha_reporte) = 6
  AND YEAR(fecha_reporte) = 2025;

CREATE UNIQUE INDEX idx_correo_unico ON usuarios(correo);
CREATE UNIQUE INDEX idx_firebase_uuid_unico
ON usuarios(firebase_uuid);



INSERT INTO vacunas (id, id_farmaco, nombre, farmaceutica, tipo, descripcion_general) VALUES
(1,  1, 'Comirnaty',       'Pfizer-BioNTech',   'ARNm',               'Vacuna de ARNm que instruye a las células a producir la proteína spike del SARS-CoV-2 para generar respuesta inmune.'),
(2,  1, 'Spikevax',        'Moderna',           'ARNm',               'Vacuna de ARNm con tecnología similar a Comirnaty, desarrollada por Moderna con alta eficacia documentada.'),
(3,  1, 'Vaxzevria',       'AstraZeneca',       'Vector viral',       'Vacuna de vector viral basada en adenovirus de chimpancé modificado para transportar el gen de la proteína spike.'),
(4,  1, 'Janssen',         'Johnson & Johnson', 'Vector viral',       'Única vacuna de una sola dosis. Utiliza adenovirus humano tipo 26 como vector para introducir el material genético.'),
(5,  1, 'CoronaVac',       'Sinovac',           'Virus inactivado',   'Vacuna de virus inactivado que utiliza partículas completas del SARS-CoV-2 inactivadas con beta-propiolactona.'),
(6,  1, 'Sinopharm BBIBP', 'Sinopharm',         'Virus inactivado',   'Desarrollada por el Instituto de Productos Biológicos de Beijing. Requiere cadena de frío estándar.'),
(7,  1, 'Covaxin',         'Bharat Biotech',    'Virus inactivado',   'Vacuna india de virus inactivado desarrollada junto con el ICMR. Aprobada por OMS para uso de emergencia.'),
(8,  1, 'Nuvaxovid',       'Novavax',           'Proteína recombinante','Vacuna basada en partículas de proteína spike recombinante con adyuvante Matrix-M para potenciar respuesta inmune.'),
(9,  1, 'Sputnik V',       'Gamaleya',          'Vector viral',       'Primera vacuna registrada contra COVID-19. Utiliza dos adenovirus humanos diferentes (Ad26 y Ad5) en dos dosis.'),
(10, 1, 'Convidecia',      'CanSino Biologics', 'Vector viral',       'Vacuna de una sola dosis basada en adenovirus tipo 5 (Ad5). Desarrollada en China con colaboración militar.');

INSERT INTO vacuna_condiciones (id_vacuna, temperatura, tiempo_ambiente) VALUES
(1,  -70.0, 2.0),
(2,  -20.0, 12.0),
(3,    4.0,  1.0),
(4,    4.0,  1.0),
(5,    4.0,  1.0),
(6,    4.0,  1.0),
(7,    4.0,  1.0),
(8,    4.0,  1.0),
(9,  -18.0,  1.0),
(10,   4.0,  1.0);

INSERT INTO vacuna_costos (id_vacuna, costo_unitario) VALUES
(1,  19.50),
(2,  25.00),
(3,   4.00),
(4,  10.00),
(5,  13.60),
(6,  14.50),
(7,  15.00),
(8,  16.00),
(9,   9.95),
(10, 10.50);


INSERT INTO efectos_secundarios (id_vacuna, descripcion, severidad) VALUES
(1,  'Dolor en sitio de inyección',    'leve'),
(1,  'Fatiga',                         'leve'),
(1,  'Miocarditis',                    'grave'),
(2,  'Dolor de cabeza',                'leve'),
(2,  'Fiebre',                         'leve'),
(2,  'Anafilaxia',                     'grave'),
(3,  'Trombosis con trombocitopenia',  'grave'),
(3,  'Fatiga',                         'leve'),
(4,  'Síndrome de Guillain-Barré',     'grave'),
(4,  'Dolor muscular',                 'leve'),
(5,  'Náuseas',                        'leve'),
(5,  'Dolor en brazo',                 'leve'),
(6,  'Fiebre leve',                    'leve'),
(7,  'Fatiga',                         'leve'),
(8,  'Dolor de cabeza',                'leve'),
(9,  'Fiebre',                         'leve'),
(10, 'Dolor muscular',                 'leve');

INSERT INTO sintomas_graves (id, id_vacuna, nombre) VALUES
(1,  1,  'Miocarditis'),
(2,  2,  'Anafilaxia'),
(3,  3,  'Trombosis'),
(4,  4,  'Parálisis facial'),
(5,  5,  'Reacción alérgica severa'),
(6,  6,  'Fiebre alta'),
(7,  7,  'Dolor torácico'),
(8,  8,  'Dificultad respiratoria'),
(9,  9,  'Convulsiones'),
(10, 10, 'Colapso vascular');


INSERT INTO reportes_adversos (id, id_vacuna, id_sintoma, sexo, grupo_edad, es_grave, fecha_reporte) VALUES
-- Graves (1 por vacuna, vacunas 1-5)
(1,  1,  1,  'M', '18-29', 1, '2026-03-10'),
(2,  2,  2,  'F', '30-49', 1, '2026-03-15'),
(3,  3,  3,  'M', '50-64', 1, '2026-03-20'),
(4,  4,  4,  'F', '65+',   1, '2026-04-01'),
(5,  5,  5,  'M', '30-49', 1, '2026-04-05'),
-- Leves (2 por vacuna 1-5, 1 por vacuna 6-10)
(6,  1,  1,  'F', '18-29', 0, '2026-03-11'),
(7,  1,  1,  'M', '30-49', 0, '2026-03-12'),
(8,  2,  2,  'F', '18-29', 0, '2026-03-16'),
(9,  2,  2,  'M', '50-64', 0, '2026-03-17'),
(10, 3,  3,  'F', '30-49', 0, '2026-03-21'),
(11, 3,  3,  'M', '18-29', 0, '2026-03-22'),
(12, 4,  4,  'F', '30-49', 0, '2026-04-02'),
(13, 4,  4,  'M', '18-29', 0, '2026-04-03'),
(14, 5,  5,  'F', '50-64', 0, '2026-04-06'),
(15, 5,  5,  'M', '18-29', 0, '2026-04-07'),
(16, 6,  6,  'F', '30-49', 0, '2026-04-10'),
(17, 7,  7,  'M', '65+',   0, '2026-04-12'),
(18, 8,  8,  'F', '18-29', 0, '2026-04-15'),
(19, 9,  9,  'M', '30-49', 0, '2026-04-18'),
(20, 10, 10, 'F', '50-64', 0, '2026-05-01');


-- ============================================================
-- SECCIÓN 10: VISTA — vista_indice_seguridad
-- ============================================================

DROP VIEW IF EXISTS vista_indice_seguridad;

CREATE VIEW vista_indice_seguridad AS
SELECT
    v.id                                                      AS id_vacuna,
    v.nombre                                                  AS nombre_vacuna,
    COUNT(r.id)                                               AS total_reportes,
    SUM(r.es_grave)                                           AS reportes_graves,
    100.0 * (1 - (SUM(r.es_grave) / NULLIF(COUNT(r.id), 0))) AS indice_seguridad
FROM vacunas v
LEFT JOIN reportes_adversos r ON r.id_vacuna = v.id
GROUP BY v.id, v.nombre;

-- ============================================================
-- SECCIÓN 11: STORED PROCEDURE — sp_indice_seguridad
-- ============================================================

DROP PROCEDURE IF EXISTS sp_indice_seguridad;

DELIMITER //

CREATE PROCEDURE sp_indice_seguridad(
    IN  p_id_vacuna  INT,
    OUT p_total      BIGINT,
    OUT p_graves     BIGINT,
    OUT p_indice     DECIMAL(5,2)
)
BEGIN
    SELECT COUNT(*) INTO p_total
    FROM reportes_adversos
    WHERE id_vacuna = p_id_vacuna;

    SELECT COUNT(*) INTO p_graves
    FROM reportes_adversos
    WHERE id_vacuna = p_id_vacuna
      AND es_grave  = 1;

    SET p_indice = 100.0 * (1 - (p_graves / NULLIF(p_total, 0)));
END //

DELIMITER ;

SELECT * from usuarios;

CREATE TABLE resumen_sintomas (
    id              INT          NOT NULL AUTO_INCREMENT,
    id_vacuna       INT          NOT NULL,
    nombre_vacuna   VARCHAR(100) NOT NULL,
    id_sintoma      INT,
    nombre_sintoma  VARCHAR(150),
    sexo            ENUM('M','F','U'),
    grupo_edad      ENUM('0-17','18-29','30-49','50-64','65+','DESCONOCIDO'),
    es_grave        TINYINT(1)   NOT NULL DEFAULT 0,
    total           BIGINT       NOT NULL DEFAULT 0,
    actualizado_en  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_resumen_vacuna FOREIGN KEY (id_vacuna) REFERENCES vacunas(id)
) ENGINE=InnoDB;

CREATE INDEX idx_reporte_vacuna_grave ON reportes_adversos (id_vacuna, es_grave);

-- ============================================================
-- SECCIÓN 12: STORED PROCEDURE — sp_recalcular_resumen_sintomas
-- ============================================================

DROP PROCEDURE IF EXISTS sp_recalcular_resumen_sintomas;

DELIMITER //

CREATE PROCEDURE sp_recalcular_resumen_sintomas()
BEGIN
    TRUNCATE TABLE resumen_sintomas;

    INSERT INTO resumen_sintomas (
        id_vacuna, nombre_vacuna, id_sintoma, nombre_sintoma,
        sexo, grupo_edad, es_grave, total
    )
    SELECT
        v.id,
        v.nombre,
        sg.id,
        sg.nombre,
        ra.sexo,
        ra.grupo_edad,
        ra.es_grave,
        COUNT(*) AS total
    FROM reportes_adversos ra
    JOIN vacunas v ON v.id = ra.id_vacuna
    LEFT JOIN sintomas_graves sg ON sg.id = ra.id_sintoma
    GROUP BY 
        v.id, v.nombre, sg.id, sg.nombre,
        ra.sexo, ra.grupo_edad, ra.es_grave;
END //

DELIMITER ;

SHOW PROCEDURE STATUS 
WHERE Db = 'FARMACOV';

SHOW PROCEDURE STATUS 
WHERE Name = 'sp_recalcular_resumen_sintomas';

CALL FARMACOV.sp_recalcular_resumen_sintomas();

CALL sp_recalcular_resumen_sintomas();

EXPLAIN
SELECT
    v.nombre,
    v.farmaceutica,
    e.descripcion,
    e.severidad
FROM vacunas v
INNER JOIN efectos_secundarios e
    ON e.id_vacuna = v.id
WHERE v.id = 1
AND e.severidad = 'grave';

EXPLAIN FORMAT = TRADITIONAL
SELECT
    v.nombre,
    r.sexo,
    COUNT(*) AS total_reportes
FROM reportes_adversos r
INNER JOIN vacunas v
    ON r.id_vacuna = v.id
WHERE r.fecha_reporte BETWEEN '2020-01-01' AND '2026-06-01'
GROUP BY v.nombre, r.sexo;

CREATE INDEX idx_reporte_vacuna_fecha
ON reportes_adversos(id_vacuna, fecha_reporte);

EXPLAIN FORMAT=traditional
SELECT
    v.nombre,
    resumen.sexo,
    resumen.total_reportes
FROM (
    SELECT
        id_vacuna,
        sexo,
        COUNT(*) AS total_reportes
    FROM reportes_adversos
    WHERE fecha_reporte BETWEEN '2024-01-01' AND '2025-12-31'
    GROUP BY id_vacuna, sexo
) resumen
INNER JOIN vacunas v
    ON resumen.id_vacuna = v.id
ORDER BY resumen.total_reportes DESC;


CREATE INDEX idx_reporte_vacuna
ON reportes_adversos(id_vacuna);

EXPLAIN FORMAT = traditional
SELECT *
FROM bitacora
WHERE YEAR(creado_en) = 2026;

EXPLAIN FORMAT=traditional
SELECT
    b.id,
    b.accion,
    b.creado_en,
    admin.nombre AS admin,
    afectado.nombre AS usuario_afectado
FROM bitacora b
INNER JOIN usuarios admin
    ON b.id_admin = admin.id
INNER JOIN usuarios afectado
    ON b.id_usuario_afectado = afectado.id
ORDER BY b.creado_en DESC;


CREATE INDEX idx_nombre_usuario ON usuarios(nombre);

EXPLAIN FORMAT=traditional
SELECT
    b.id,
    b.accion,
    b.creado_en,
    admin.nombre AS admin,
    afectado.nombre AS usuario_afectado
FROM bitacora b
INNER JOIN usuarios admin
    ON b.id_admin = admin.id
INNER JOIN usuarios afectado
    ON b.id_usuario_afectado = afectado.id
ORDER BY b.creado_en DESC
LIMIT 50;

CREATE INDEX idx_bitacora_admin
ON bitacora(id_admin);

CREATE INDEX idx_bitacora_afectado
ON bitacora(id_usuario_afectado);

CREATE INDEX idx_bitacora_creado_en
ON bitacora(creado_en);

EXPLAIN
SELECT *
FROM usuarios u
JOIN roles r ON u.id_rol = r.id
WHERE LOWER(u.firebase_uuid) = LOWER('oBAmwksydCSeiHCfJu6kdQhSX6V2');
