-- 1. Borra datos y reinicia autoincrement
SET SQL_SAFE_UPDATES = 0;
DELETE FROM usuario_tarea;
DELETE FROM tarea;
DELETE FROM historia_usuario;
DELETE FROM epica;
DELETE FROM usuario_proyecto;
DELETE FROM proyecto;
DELETE FROM usuario;
ALTER TABLE usuario AUTO_INCREMENT = 1;
ALTER TABLE proyecto AUTO_INCREMENT = 1;
ALTER TABLE epica AUTO_INCREMENT = 1;
ALTER TABLE historia_usuario AUTO_INCREMENT = 1;
ALTER TABLE tarea AUTO_INCREMENT = 1;
SET SQL_SAFE_UPDATES = 1;

-- 2. Inserta usuarios
INSERT INTO usuario (nombre, email, password) VALUES
('Mariana Pérez', 'mariana@mail.com', 'passmariana'),
('Jefferson Castro', 'jefferson@mail.com', 'passjefferson'),
('Jhon Diaz', 'jhondiaz@mail.com', 'passjhon'),
('Sofía Ramírez', 'sofia@mail.com', 'passsofia'),
('Johan Cárdenas', 'johan@mail.com', 'passjohan');

-- 3. Inserta proyectos
INSERT INTO proyecto (nombre, descripcion, id_lider) VALUES
('Plataforma Educativa', 'Sistema para gestión de cursos', 1),
('App Mensajería', 'Aplicación de chat en tiempo real', 2),
('Gestión Talleres', 'Gestión de talleres y asistencias', 3),
('E-commerce Moda', 'Tienda online de moda', 4),
('IoT Domótica', 'Automatización del hogar', 5);

-- ASIGNACIÓN USUARIOS A PROYECTOS (roles variados y cruzados)
INSERT INTO usuario_proyecto (id_usuario, id_proyecto, rol) VALUES
(1,1,'Scrum Master'), (2,1,'Developer'), (3,1,'Tester'), (4,1,'Product Owner'), (5,1,'Developer'),
(1,2,'Developer'), (2,2,'Scrum Master'), (3,2,'Developer'), (4,2,'Tester'), (5,2,'Product Owner'),
(1,3,'Product Owner'), (2,3,'Tester'), (3,3,'Scrum Master'), (4,3,'Developer'), (5,3,'Developer'),
(1,4,'Developer'), (2,4,'Developer'), (3,4,'Product Owner'), (4,4,'Scrum Master'), (5,4,'Tester'),
(1,5,'Developer'), (2,5,'Product Owner'), (3,5,'Developer'), (4,5,'Tester'), (5,5,'Scrum Master');

-- ÉPICAS (una por proyecto)
INSERT INTO epica (id_proyecto, nombre, descripcion) VALUES
(1, 'Gestión de estudiantes', 'Módulo para administrar estudiantes'),
(2, 'Chats privados', 'Mensajes uno a uno'),
(3, 'Control de asistencia', 'Llevar control de quienes asisten al taller'),
(4, 'Pasarela de pagos', 'Integrar pagos en la tienda'),
(5, 'Control de luces', 'Manejar luces desde la app móvil');

-- HISTORIAS DE USUARIO (una por épica)
INSERT INTO historia_usuario (id_epica, nombre, descripcion) VALUES
(1, 'Agregar estudiante', 'Permitir agregar alumno a un curso'),
(2, 'Enviar mensaje', 'Un usuario puede enviar mensaje a otro'),
(3, 'Registrar asistencia', 'Registrar la presencia de un participante'),
(4, 'Pagar con tarjeta', 'Comprar productos usando tarjeta'),
(5, 'Encender luz sala', 'Permitir al usuario controlar luces remotas');

-- TAREAS (una o dos por historia)
INSERT INTO tarea (id_historia, nombre, estado) VALUES
(1, 'Crear formulario registro estudiante', 'pendiente'),
(2, 'Diseñar UI chat privado', 'en progreso'),
(3, 'Backend asistencia', 'completado'),
(4, 'Integrar pasarela Stripe', 'pendiente'),
(5, 'Programar switch luces', 'en progreso'),
(5, 'Crear endpoint API luces', 'pendiente');

-- ASIGNACIÓN USUARIO-TAREA (roles cruzados)
INSERT INTO usuario_tarea (id_usuario, id_tarea) VALUES
(1,1), -- Mariana con "registro estudiante"
(2,2), -- Jefferson con "UI chat privado"
(3,3), -- Jhon con "backend asistencia"
(4,4), -- Sofía con "Stripe"
(5,5), -- Johan con "switch luces"
(2,6), -- Jefferson con "endpoint API luces"
(1,5); -- Mariana también en "switch luces"