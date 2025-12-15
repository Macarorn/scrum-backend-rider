import { Router } from "express";
import {
  assignUsuarioToProyecto,
  removeUsuarioFromProyecto,
  getUsuariosByProyecto,
  getProyectosByUsuario,
} from "../controllers/usuarioProyecto.controller.js";

const router = Router();

// Asignar usuario a proyecto
router.post("/", assignUsuarioToProyecto);

// Quitar usuario de proyecto
router.delete("/:id_usuario/:id_proyecto", removeUsuarioFromProyecto);

// Listar usuarios de un proyecto
router.get("/project/:id", getUsuariosByProyecto);

// Listar proyectos de un usuario
router.get("/user/:id", getProyectosByUsuario);

export default router;
