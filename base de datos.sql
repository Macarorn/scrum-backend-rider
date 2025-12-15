CREATE DATABASE IF NOT EXISTS scrum_db;
USE scrum_db;

-- Usuarios
CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);

-- Proyectos
CREATE TABLE proyecto (
  id_proyecto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  id_lider INT NOT NULL,
  FOREIGN KEY (id_lider) REFERENCES usuario(id_usuario)
);

-- Relación muchos-a-muchos: usuarios en proyectos
CREATE TABLE usuario_proyecto (
  id_usuario INT NOT NULL,
  id_proyecto INT NOT NULL,
  rol VARCHAR(50), -- ejemplo: 'desarrollador', 'scrum master', 'product owner', etc.
  PRIMARY KEY(id_usuario, id_proyecto),
  FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY(id_proyecto) REFERENCES proyecto(id_proyecto)
);

-- Épicas
CREATE TABLE epica (
  id_epica INT AUTO_INCREMENT PRIMARY KEY,
  id_proyecto INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto)
);

-- Historias de usuario
CREATE TABLE historia_usuario (
  id_historia INT AUTO_INCREMENT PRIMARY KEY,
  id_epica INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  FOREIGN KEY (id_epica) REFERENCES epica(id_epica)
);

-- Tareas
CREATE TABLE tarea (
  id_tarea INT AUTO_INCREMENT PRIMARY KEY,
  id_historia INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  estado VARCHAR(50),
  FOREIGN KEY (id_historia) REFERENCES historia_usuario(id_historia)
);

-- Asignación de usuarios a tareas (muchos a muchos, por si una tarea la pueden compartir)
CREATE TABLE usuario_tarea (
  id_usuario INT NOT NULL,
  id_tarea INT NOT NULL,
  PRIMARY KEY (id_usuario, id_tarea),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_tarea) REFERENCES tarea(id_tarea)
);