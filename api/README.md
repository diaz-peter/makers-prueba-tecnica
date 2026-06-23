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
```

(Opcional, para reportes HTML más visuales):

```bash
npm install -g newman-reporter-htmlextra
```

## 📁 Estructura sugerida del repositorio

```
.
├── Pruebas_Funcionales_-_ReqRes_postman_collection.json
├── environment.json          # archivo de entorno (no versionar si tiene secretos reales)
└── README.md
```

## 🌎 Crear el archivo de entorno

Creá un archivo `environment.json` con tus valores (este archivo **no** se incluye en el repo por seguridad):

```json
{
  "id": "reqres-env",
  "name": "ReqRes Environment",
  "values": [
    {
      "key": "baseUrl",
      "value": "https://reqres.in/api",
      "enabled": true
    },
    {
      "key": "auth_secret_0b3q",
      "value": "TU_API_KEY_AQUI",
      "enabled": true
    }
  ]
}
```

> 💡 Recomendación: agregá `environment.json` a tu `.gitignore` y subí en su lugar un `environment.example.json` con valores ficticios, para que otros sepan qué variables crear.

## ▶️ Cómo ejecutar la colección con Newman

```bash
newman run Pruebas_Funcionales_-_ReqRes_postman_collection.json \
  -e environment.json
```

### Generar un reporte en consola más detallado

```bash
newman run Pruebas_Funcionales_-_ReqRes_postman_collection.json \
  -e environment.json \
  --reporters cli,json \
  --reporter-json-export ./reports/resultado.json
```

### Generar un reporte HTML (con newman-reporter-htmlextra)

```bash
newman run Pruebas_Funcionales_-_ReqRes_postman_collection.json \
  -e environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export ./reports/resultado.html
```

## 🤖 Ejecución en CI/CD (ejemplo GitHub Actions)

```yaml
name: API Tests - ReqRes

on: [push, pull_request]

jobs:
  newman-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Instalar Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Crear archivo de entorno
        run: |
          cat <<EOF > environment.json
          {
            "id": "reqres-env",
            "name": "ReqRes Environment",
            "values": [
              { "key": "baseUrl", "value": "https://reqres.in/api", "enabled": true },
              { "key": "auth_secret_0b3q", "value": "${{ secrets.REQRES_API_KEY }}", "enabled": true }
            ]
          }
          EOF

      - name: Ejecutar pruebas
        run: |
          newman run Pruebas_Funcionales_-_ReqRes_postman_collection.json \
            -e environment.json \
            --reporters cli,htmlextra \
            --reporter-htmlextra-export ./reports/resultado.html

      - name: Subir reporte como artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: reporte-newman
          path: reports/
```

> En este ejemplo, la API key se guarda como un *secret* del repositorio (`Settings > Secrets and variables > Actions`) llamado `REQRES_API_KEY`.

## 📝 Notas

- La API de ReqRes es pública y de demostración; algunas validaciones (como el tiempo de respuesta < 500ms) pueden fallar de forma intermitente según la latencia de red.
- El test de `POST /users` con body vacío acepta tanto `400` como `201` como resultados válidos, dado que ReqRes no siempre valida el esquema de entrada.
- El `id` generado en la primera petición se guarda automáticamente en la variable de colección `new_user_id` para su posible reutilización en otras requests.

## 📄 Licencia

Uso libre para fines educativos y de práctica de QA/Automatización.
