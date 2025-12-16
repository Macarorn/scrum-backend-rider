import { conn } from "../connection/conn.js";

// Obtener todas las tareas
export const getTareas = async (req, res) => {
  try {
    const [rows] = await conn.execute("SELECT * FROM tarea");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener tareas por historia
export const getTareasByHistoria = async (req, res) => {
  const { historiaId } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM tarea WHERE id_historia = ?",
      [historiaId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una tarea por ID
export const getTareaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM tarea WHERE id_tarea = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva tarea
export const createTarea = async (req, res) => {
  const { id_historia, nombre, estado = "pendiente" } = req.body;
  try {
    const [result] = await conn.execute(
      "INSERT INTO tarea (id_historia, nombre, estado) VALUES (?, ?, ?)",
      [id_historia, nombre, estado]
    );
    res.status(201).json({ 
      id_tarea: result.insertId, 
      id_historia, 
      nombre, 
      estado 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una tarea completa
export const updateTarea = async (req, res) => {
  const { id } = req.params;
  const { nombre, estado, id_historia } = req.body;
  try {
    const [result] = await conn.execute(
      "UPDATE tarea SET nombre = ?, estado = ?, id_historia = ? WHERE id_tarea = ?",
      [nombre, estado, id_historia, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
    } else {
      res.status(200).json({ id_tarea: id, nombre, estado, id_historia });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar solo el estado de una tarea
export const updateEstadoTarea = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const [result] = await conn.execute(
      "UPDATE tarea SET estado = ? WHERE id_tarea = ?",
      [estado, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
    } else {
      res.status(200).json({ id_tarea: id, estado });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea
export const deleteTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conn.execute(
      "DELETE FROM tarea WHERE id_tarea = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
    } else {
      res.status(200).json({ message: "Tarea eliminada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};