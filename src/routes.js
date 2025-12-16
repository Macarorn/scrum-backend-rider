import express from "express";
import epicasRouter from "./routes/epicas.routes.js";
import proyectosRouter from "./routes/proyectos.routes.js";
import usuarioProyectoRouter from "./routes/usuarioProyecto.routes.js";
import usuarioTareaRouter from "./routes/usuarioTarea.routes.js";

const router = express.Router();

// Rutas de épicas
router.use("/epicas", epicasRouter);

// Rutas de proyectos
router.use("/proyectos", proyectosRouter);

// Rutas relación usuario-proyecto
router.use("/usuario-proyectos", usuarioProyectoRouter);

// Rutas relación usuario-tarea
router.use("/usuario-tareas", usuarioTareaRouter);

export default router;
