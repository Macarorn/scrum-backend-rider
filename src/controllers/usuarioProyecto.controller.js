import { conn } from "../connection/conn.js";

// Asignar un usuario a un proyecto
export const assignUsuarioToProyecto = async (req, res) => {
  const { id_usuario, id_proyecto, rol } = req.body;
  try {
    const [result] = await conn.execute(
      "INSERT INTO usuario_proyecto (id_usuario, id_proyecto, rol) VALUES (?, ?, ?)",
      [id_usuario, id_proyecto, rol || null]
    );
    res.status(201).json({ id_usuario, id_proyecto, rol });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quitar usuario de proyecto
export const removeUsuarioFromProyecto = async (req, res) => {
  const { id_usuario, id_proyecto } = req.params;
  try {
    const [result] = await conn.execute(
      "DELETE FROM usuario_proyecto WHERE id_usuario = ? AND id_proyecto = ?",
      [id_usuario, id_proyecto]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Asignación no encontrada" });
    } else {
      res.status(200).json({ message: "Usuario removido del proyecto" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar usuarios de un proyecto
export const getUsuariosByProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      `SELECT u.* FROM usuario u JOIN usuario_proyecto up ON u.id_usuario = up.id_usuario WHERE up.id_proyecto = ?`,
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar proyectos de un usuario
export const getProyectosByUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      `SELECT p.* FROM proyecto p JOIN usuario_proyecto up ON p.id_proyecto = up.id_proyecto WHERE up.id_usuario = ?`,
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
