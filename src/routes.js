import express from "express";
import epicasRouter from "./routes/epicas.routes.js";
import proyectosRouter from "./routes/proyectos.routes.js";

const router = express.Router();

// Rutas de épicas
router.use("/epicas", epicasRouter);

// Rutas de proyectos
router.use("/proyectos", proyectosRouter);

export default router;
