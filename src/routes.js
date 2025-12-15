import express from "express";
import epicasRouter from "./routes/epicas.routes.js";

const router = express.Router();

// Rutas de épicas
router.use("/epicas", epicasRouter);

export default router;
