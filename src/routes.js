import express from "express";
import epicasRouter from "./routes/epicas.routes.js";
import usuarioRouter from "./routes/usuario.routes.js";

const router = express.Router();

// Rutas de épicas
router.use("/epicas", epicasRouter);
// Rutas de usuario
router.use("/usuario", usuarioRouter);

export default router;
