import { Router } from "express";
import {
  assignUsuarioToTarea,
  removeUsuarioFromTarea,
  getUsuariosByTarea,
  getTareasByUsuario,
} from "../controllers/usuarioTarea.controller.js";

const router = Router();

// Asignar usuario a tarea
router.post("/", assignUsuarioToTarea);

// Quitar usuario de tarea
router.delete("/:id_usuario/:id_tarea", removeUsuarioFromTarea);

// Listar usuarios de una tarea
router.get("/task/:id", getUsuariosByTarea);

// Listar tareas de un usuario
router.get("/user/:id", getTareasByUsuario);

export default router;
