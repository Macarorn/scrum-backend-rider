import dotenv from "dotenv";
import { createPool } from "mysql2/promise";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración con valores por defecto
const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  waitForConnections: true,
  timezone: "local",
  charset: "utf8mb4",
  decimalNumbers: true,
  connectionLimit: 20, // (Num CPU * 2) + 1
  queueLimit: 100, // Evitar sobrecarga de memoria
  idleTimeout: 30000, // 30 segundos
  enableKeepAlive: true, // Evitar timeouts
  keepAliveInitialDelay: 10000, // 10 segundos
};

console.log("Configuración de MySQL:", poolConfig);

export const pool = createPool(poolConfig);

pool
  .getConnection()
  .then((connection) => {
    console.log(
      "✅ Conectado a MySQL. Base de datos actual:",
      connection.config.database
    );
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Error de conexión a MySQL:", err.message);
    process.exit(1);
  });

pool
  .query("SELECT DATABASE() AS db")
  .then(([rows]) => {
    console.log("✅ Conectado a la base de datos:", rows[0].db);
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err.message);
    process.exit(1);
  });
