import { Router } from "express";
import {
  createHistoria,
  deleteHistoria,
  getHistoriaById,
  getHistorias,
  getHistoriasByEpica,
  updateHistoria,
} from "../controllers/historias.controller.js";

const router = Router();

// Obtener todas las historias de usuario
router.get("/", getHistorias);

// Obtener historias por épica
router.get("/epica/:epicaId", getHistoriasByEpica);

// Obtener una historia por ID
router.get("/:id", getHistoriaById);

// Crear una nueva historia
router.post("/", createHistoria);

// Actualizar una historia
router.put("/:id", updateHistoria);

// Eliminar una historia
router.delete("/:id", deleteHistoria);

export default router;