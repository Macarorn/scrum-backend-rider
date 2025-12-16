import { Router } from "express";
import {
  createProyecto,
  deleteProyecto,
  getProyectoById,
  getProyectos,
  getProyectosByLider,
  updateProyecto,
} from "../controllers/proyectos.controller.js";

const router = Router();

// Obtener todos los proyectos
router.get("/", getProyectos);

// Obtener proyectos por líder
router.get("/leader/:id", getProyectosByLider);

// Obtener un proyecto por ID
router.get("/:id", getProyectoById);

// Crear un nuevo proyecto
router.post("/", createProyecto);

// Actualizar un proyecto
router.put("/:id", updateProyecto);

// Eliminar un proyecto
router.delete("/:id", deleteProyecto);

export default router;
