# Scrum Backend Rider

Este proyecto es una API RESTful para la gestión de proyectos Scrum, desarrollada en Node.js, Express y MySQL.

## Requisitos
- Node.js >= 18
- MySQL >= 8

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Macarorn/scrum-backend-rider.git
   cd scrum-backend-rider
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura el archivo `.env`:
   - Copia el archivo `.env.example` a `.env` y ajusta los valores según tu entorno.

4. Crea la base de datos y las tablas:
   - Abre los archivos `base de datos.sql` y `datos de prueba.sql`.
   - Ejecuta su contenido en MySQL Workbench o tu cliente favorito para crear la estructura y cargar datos de ejemplo.

5. Inicia el servidor:
   ```bash
   npm run dev
   ```
   El servidor estará disponible en `http://localhost:8000` (o el puerto que definas en `.env`).

## Endpoints principales

- Usuarios: `/api/usuarios`
- Proyectos: `/api/proyectos`
- Épicas: `/api/epicas`
- Historias de usuario: `/api/historias`
- Tareas: `/api/tareas`
- Relaciones usuario-proyecto: `/api/usuario-proyecto`
- Relaciones usuario-tarea: `/api/usuario-tarea`

Consulta la documentación interna en los archivos [`Documentacion Backend Rider.md`](./Documentacion%20Backend%20Rider.md) o [`Documentacion Backend Rider.pdf`](./Documentacion%20Backend%20Rider.pdf) para más detalles sobre la API y su uso.

## Contribución

- Usa ramas con el prefijo `tu_nombre/feature` para nuevas funcionalidades.
- Haz Pull Requests hacia la rama `develop`.

## Autores
- Mariana
- Sofía
- Jefferson
- Johan
- Jhon

---
