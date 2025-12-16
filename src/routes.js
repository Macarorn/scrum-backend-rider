import express from "express";
import epicasRouter from "./routes/epicas.routes.js";
import historiasRouter from "./routes/historias.routes.js";
import tareasRouter from "./routes/tareas.routes.js";

const router = express.Router();

// Rutas de épicas
router.use("/epicas", epicasRouter);

// Rutas de historias de usuario
router.use("/historias", historiasRouter);

// Rutas de tareas
router.use("/tareas", tareasRouter);

export default router;