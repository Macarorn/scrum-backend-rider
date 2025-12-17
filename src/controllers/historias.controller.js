import { conn } from "../connection/conn.js";

// Obtener todas las historias de usuario
export const getHistorias = async (req, res) => {
  try {
    const [rows] = await conn.execute("SELECT * FROM historia_usuario");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener historias por épica
export const getHistoriasByEpica = async (req, res) => {
  const { epicaId } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM historia_usuario WHERE id_epica = ?",
      [epicaId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una historia por ID
export const getHistoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM historia_usuario WHERE id_historia = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Historia de usuario no encontrada" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva historia
export const createHistoria = async (req, res) => {
  const { id_epica, nombre, descripcion } = req.body;
  try {
    const [result] = await conn.execute(
      "INSERT INTO historia_usuario (id_epica, nombre, descripcion) VALUES (?, ?, ?)",
      [id_epica, nombre, descripcion]
    );
    res.status(201).json({ 
      id_historia: result.insertId, 
      id_epica, 
      nombre, 
      descripcion 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una historia
export const updateHistoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const [result] = await conn.execute(
      "UPDATE historia_usuario SET nombre = ?, descripcion = ? WHERE id_historia = ?",
      [nombre, descripcion, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Historia de usuario no encontrada" });
    } else {
      res.status(200).json({ id_historia: id, nombre, descripcion });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una historia
export const deleteHistoria = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conn.execute(
      "DELETE FROM historia_usuario WHERE id_historia = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Historia de usuario no encontrada" });
    } else {
      res.status(200).json({ message: "Historia de usuario eliminada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};