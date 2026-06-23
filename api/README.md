# Pruebas Funcionales - ReqRes (Postman/Newman)

Colección de pruebas funcionales para la API pública [ReqRes](https://reqres.in), pensada para ejecutarse con **Newman** (CLI de Postman) tanto localmente como en un pipeline de CI/CD.

## 📋 Contenido de la colección

| # | Request | Validaciones |
|---|---------|---------------|
| 1 | **POST** `/users` (Crear Usuario) | Status `201`, estructura de respuesta (`name`, `job`, `id`), tiempo de respuesta < 500ms, guarda `id` en variable de colección |
| 2 | **GET** `/users/2` (Validar Usuario Creado) | Status `200`, coincidencia de `first_name` |
| 3 | **POST** `/users` con body vacío | Status `400` o `201` (validación de esquema) |
| 4 | **GET** `/users/9999` (usuario inexistente) | Status `404` |

## 🔐 Variables requeridas

La colección usa autenticación tipo **API Key** (header `x-api-key`) y necesita las siguientes variables:

| Variable | Tipo | Descripción |
|----------|------|--------------|
| `baseUrl` | texto | URL base de la API (ej: `https://reqres.in/api`) |
| `auth_secret_0b3q` | secreto | Valor de la API key |
| `new_user_id` | texto | Se genera automáticamente durante la ejecución (no es necesario definirla) |

> ⚠️ **Importante:** `auth_secret_0b3q` está marcada como `secret` en la colección, por lo que **no viaja con el JSON exportado**. Debés definirla vos mismo en un archivo de entorno antes de ejecutar las pruebas.

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) instalado (v16 o superior recomendado)
- [Newman](https://www.npmjs.com/package/newman) instalado globalmente o como dependencia local

```bash
npm install -g newman