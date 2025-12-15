import { Router } from "express";
import {
  createEpica,
  deleteEpica,
  getEpicaById,
  getEpicas,
  updateEpica,
} from "../controllers/epicas.controller.js";

const router = Router();

// Obtener todas las épicas
router.get("/", getEpicas);

// Obtener una épica por ID
router.get("/:id", getEpicaById);

// Crear una nueva épica
router.post("/", createEpica);

// Actualizar una épica
router.put("/:id", updateEpica);

// Eliminar una épica
router.delete("/:id", deleteEpica);

export default router;
