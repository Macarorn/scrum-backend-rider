import { conn } from "../connection/conn.js";

// Obtener todas las épicas
export const getEpicas = async (req, res) => {
  try {
    const [rows] = await conn.execute("SELECT * FROM epica");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una épica por ID
export const getEpicaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM epica WHERE id_epica = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Épica no encontrada" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva épica
export const createEpica = async (req, res) => {
  const { id_proyecto, nombre, descripcion } = req.body;
  try {
    const [result] = await conn.execute(
      "INSERT INTO epica (id_proyecto, nombre, descripcion) VALUES (?, ?, ?)",
      [id_proyecto, nombre, descripcion]
    );
    res
      .status(201)
      .json({ id_epica: result.insertId, id_proyecto, nombre, descripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una épica
export const updateEpica = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const [result] = await conn.execute(
      "UPDATE epica SET nombre = ?, descripcion = ? WHERE id_epica = ?",
      [nombre, descripcion, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Épica no encontrada" });
    } else {
      res.status(200).json({ id_epica: id, nombre, descripcion });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una épica
export const deleteEpica = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conn.execute(
      "DELETE FROM epica WHERE id_epica = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Épica no encontrada" });
    } else {
      res.status(200).json({ message: "Épica eliminada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
