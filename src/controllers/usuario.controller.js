import { conn } from "../connection/conn.js";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await conn.execute("SELECT * FROM usuario");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const [result] = await conn.execute(
      "INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, password]
    );
    res.status(201).json({ id_usuario: result.insertId, nombre, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const [result] = await conn.execute(
      "UPDATE usuario SET nombre = ?, email = ? WHERE id_usuario = ?",
      [nombre, email, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json({ id_usuario: id, nombre, email });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Iniciar transacción para asegurar consistencia
    await conn.beginTransaction();
    
    // 1. Eliminar de usuario_tarea primero
    await conn.execute(
      "DELETE FROM usuario_tarea WHERE id_usuario = ?",
      [id]
    );
    
    // 2. Eliminar de usuario_proyecto
    await conn.execute(
      "DELETE FROM usuario_proyecto WHERE id_usuario = ?",
      [id]
    );
    
    // 3. Si el usuario es líder de proyectos, reasignar o eliminar proyectos
    // Opción A: Reasignar a otro usuario (ej: usuario con ID 1)
    await conn.execute(
      "UPDATE proyecto SET id_lider = 1 WHERE id_lider = ?",
      [id]
    );
    
    // Opción B: Eliminar proyectos donde es líder (si quieres eliminar todo)
    // await conn.execute(
    //   "DELETE FROM proyecto WHERE id_lider = ?",
    //   [id]
    // );
    
    // 4. Finalmente eliminar el usuario
    const [result] = await conn.execute(
      "DELETE FROM usuario WHERE id_usuario = ?",
      [id]
    );
    
    // Confirmar transacción
    await conn.commit();
    
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json({ message: "Usuario y todos sus datos relacionados eliminados" });
    }
    
  } catch (error) {
    // Revertir transacción en caso de error
    await conn.rollback();
    res.status(500).json({ 
      error: error.message,
      details: "No se pudo eliminar el usuario debido a restricciones de integridad referencial" 
    });
  }
};
