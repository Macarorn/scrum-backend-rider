import { log } from "console";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./src/routes.js";
import { closePool } from "./src/services/dbService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 8000;

console.log(
  "Variables de entorno:",
  {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD ? "***" : "(vacío)",
  },
  "\nNumero de puerto:",
  PORT
);

const app = express();

//Middlewares

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Rutas

app.use("/api", apiRouter);

//Ruta principal
app.get("/", (req, res) => {
  log("Solicitud recibida en /");
  res.send("¡Bienvenido a la API!");
});

//Manejo de errores
app.use((err, req, res, next) => {
  console.error("Error global:", err);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

const shutdown = async () => {
  console.log("\n🔴 Recibida señal de apagado...");
  await closePool();
  server.close(() => {
    console.log("🔴 Servidor y conexiones cerradas");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
