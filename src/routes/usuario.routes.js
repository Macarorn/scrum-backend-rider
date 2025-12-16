import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuarioById,
  getUsuarios,
  updateUsuario,
} from "../controllers/usuario.controller.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", getUsuarios);

// Obtener usuario por id
router.get("/:id", getUsuarioById);

// Crear usuario
router.post("/", createUsuario);

// Actualizar usuario
router.put("/:id", updateUsuario);

// Eliminar usuario
router.delete("/:id", deleteUsuario);

export default router;