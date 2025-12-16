import { conn } from "../connection/conn.js";

// Asignar un usuario a una tarea
export const assignUsuarioToTarea = async (req, res) => {
  const { id_usuario, id_tarea } = req.body;
  try {
    const [result] = await conn.execute(
      "INSERT INTO usuario_tarea (id_usuario, id_tarea) VALUES (?, ?)",
      [id_usuario, id_tarea]
    );
    res.status(201).json({ id_usuario, id_tarea });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quitar usuario de tarea
export const removeUsuarioFromTarea = async (req, res) => {
  const { id_usuario, id_tarea } = req.params;
  try {
    const [result] = await conn.execute(
      "DELETE FROM usuario_tarea WHERE id_usuario = ? AND id_tarea = ?",
      [id_usuario, id_tarea]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Asignación no encontrada" });
    } else {
      res.status(200).json({ message: "Usuario removido de la tarea" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar usuarios de una tarea
export const getUsuariosByTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      `SELECT u.* FROM usuario u JOIN usuario_tarea ut ON u.id_usuario = ut.id_usuario WHERE ut.id_tarea = ?`,
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar tareas de un usuario
export const getTareasByUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      `SELECT t.* FROM tarea t JOIN usuario_tarea ut ON t.id_tarea = ut.id_tarea WHERE ut.id_usuario = ?`,
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
