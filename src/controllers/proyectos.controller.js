import { conn } from "../connection/conn.js";

// Obtener todos los proyectos
export const getProyectos = async (req, res) => {
  try {
    const [rows] = await conn.execute("SELECT * FROM proyecto");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener proyectos por líder
export const getProyectosByLider = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM proyecto WHERE id_lider = ?",
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un proyecto por ID
export const getProyectoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM proyecto WHERE id_proyecto = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Proyecto no encontrado" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo proyecto
export const createProyecto = async (req, res) => {
  const { nombre, descripcion, id_lider } = req.body;
  try {
    const [result] = await conn.execute(
      "INSERT INTO proyecto (nombre, descripcion, id_lider) VALUES (?, ?, ?)",
      [nombre, descripcion, id_lider]
    );
    res
      .status(201)
      .json({ id_proyecto: result.insertId, nombre, descripcion, id_lider });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un proyecto
export const updateProyecto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, id_lider } = req.body;
  try {
    const [result] = await conn.execute(
      "UPDATE proyecto SET nombre = ?, descripcion = ?, id_lider = ? WHERE id_proyecto = ?",
      [nombre, descripcion, id_lider, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Proyecto no encontrado" });
    } else {
      res.status(200).json({ id_proyecto: id, nombre, descripcion, id_lider });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un proyecto
export const deleteProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conn.execute(
      "DELETE FROM proyecto WHERE id_proyecto = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Proyecto no encontrado" });
    } else {
      res.status(200).json({ message: "Proyecto eliminado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
