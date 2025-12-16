import { Router } from "express";
import {
  createTarea,
  deleteTarea,
  getTareaById,
  getTareas,
  getTareasByHistoria,
  updateTarea,
  updateEstadoTarea
} from "../controllers/tareas.controller.js";

const router = Router();

// Obtener todas las tareas
router.get("/", getTareas);

// Obtener tareas por historia
router.get("/historia/:historiaId", getTareasByHistoria);

// Obtener una tarea por ID
router.get("/:id", getTareaById);

// Crear una nueva tarea
router.post("/", createTarea);

// Actualizar una tarea
router.put("/:id", updateTarea);

// Actualizar solo el estado de una tarea
router.patch("/:id/estado", updateEstadoTarea);

// Eliminar una tarea
router.delete("/:id", deleteTarea);

export default router;