import express from "express";
import epicasRouter from "./routes/epicas.routes.js";
import historiasRouter from "./routes/historias.routes.js";
import tareasRouter from "./routes/tareas.routes.js";
import proyectosRouter from "./routes/proyectos.routes.js";
import usuarioProyectoRouter from "./routes/usuarioProyecto.routes.js";
import usuarioTareaRouter from "./routes/usuarioTarea.routes.js";
import usuarioRouter from "./routes/usuario.routes.js";

const router = express.Router();

// Rutas de épicas
router.use("/epicas", epicasRouter);

// Rutas de historias de usuario
router.use("/historias", historiasRouter);

// Rutas de tareas
router.use("/tareas", tareasRouter);

// Rutas de proyectos
router.use("/proyectos", proyectosRouter);

// Rutas relación usuario-proyecto
router.use("/usuario-proyectos", usuarioProyectoRouter);

// Rutas relación usuario-tarea
router.use("/usuario-tareas", usuarioTareaRouter);

// Rutas de usuario
router.use("/usuario", usuarioRouter);

export default router;