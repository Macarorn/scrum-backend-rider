import { conn } from "../connection/conn.js";

// Asignar un usuario a una tarea
export const assignUsuarioToTarea = async (req, res) => {
  const { id_usuario, id_tarea } = req.body;
  try {
    // Evitar duplicados: comprobar si ya existe la asignación
    const [existing] = await conn.execute(
      "SELECT 1 FROM usuario_tarea WHERE id_usuario = ? AND id_tarea = ?",
      [id_usuario, id_tarea]
    );
    if (existing.length > 0) {
      return res.status(200).json({ message: "Asignación ya existe" });
    }

    const [result] = await conn.execute(
      "INSERT INTO usuario_tarea (id_usuario, id_tarea) VALUES (?, ?)",
      [id_usuario, id_tarea]
    );
    res.status(201).json({ id_usuario, id_tarea });
  } catch (error) {
    // Error por clave foránea: devolver mensaje claro
    if (error && error.errno === 1452) {
      return res.status(400).json({ error: "Usuario o tarea no existe (clave foránea). Crea los registros antes de asignar." });
    }
    // Error de duplicado (por si no se detectó antes)
    if (error && error.errno === 1062) {
      return res.status(200).json({ message: "Asignación ya existe" });
    }
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
