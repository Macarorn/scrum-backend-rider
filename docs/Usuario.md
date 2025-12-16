# Documentación de Endpoints - Usuario

Base URL: `/api/usuario`

Endpoints:

- GET `/` : Listar todos los usuarios
  - Respuesta 200: Array de usuarios

- GET `/:id` : Obtener usuario por id
  - Parámetros: `id` (path)
  - Respuesta 200: objeto usuario
  - Respuesta 404: { message: "Usuario no encontrado" }

- POST `/` : Crear usuario
  - Body JSON: { nombre, email, password }
  - Respuesta 201: { id_usuario, nombre, email }

- PUT `/:id` : Actualizar usuario
  - Parámetros: `id` (path)
  - Body JSON: { nombre, email }
  - Respuesta 200: objeto con `id_usuario`, `nombre`, `email`
  - Respuesta 404: { message: "Usuario no encontrado" }

- DELETE `/:id` : Eliminar usuario
  - Parámetros: `id` (path)
  - Respuesta 200: { message: "Usuario eliminado" }
  - Respuesta 404: { message: "Usuario no encontrado" }

Notas:
- No se modificaron scripts SQL.
- Se asumió que la tabla tiene columna primaria `id_usuario` y columnas `nombre`, `email`, `password`.
- Autenticación básica: no incluida en esta PR; se puede añadir con middleware `Authorization` si es necesario.

Ejemplo rápido con `curl`:

```bash
# Listar
curl http://localhost:8000/api/usuario

# Crear
curl -X POST http://localhost:8000/api/usuario -H "Content-Type: application/json" -d '{"nombre":"Sofia","email":"sofia@example.com","password":"secret"}'

# Obtener por id
curl http://localhost:8000/api/usuario/1

# Actualizar
curl -X PUT http://localhost:8000/api/usuario/1 -H "Content-Type: application/json" -d '{"nombre":"Nueva","email":"nueva@example.com"}'

# Eliminar
curl -X DELETE http://localhost:8000/api/usuario/1
```
