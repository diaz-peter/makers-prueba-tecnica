# Prueba Técnica QA Fullstack — Makers Solutions

Entrega correspondiente al proceso de selección para **QA Fullstack** en Makers Solutions. Este repositorio contiene los tres módulos solicitados: automatización web, diseño de pruebas funcionales y pruebas de API.

📋 **Tablero de seguimiento:** [GitHub Project](https://github.com/users/diaz-peter/projects/3) 

---

## 📂 Estructura del repositorio

```
makers-prueba-tecnica/
├── automation/        # Módulo 1 - Smoke test de login (Cypress)
├── functional/         # Módulo 2 - Diseño de pruebas MakersPay
├── api/                 # Módulo 3 - Pruebas de API (reqres.in)
└── README.md
```

---

## 1️⃣ Módulo de Automatización — Smoke Test de Login (SauceDemo)

**Objetivo:** validar el flujo de inicio de sesión en [SauceDemo](https://www.saucedemo.com/) mediante automatización.

**Stack elegido:** Cypress + JavaScript, con patrón **Page Object Model**.

**Casos automatizados:**
| Caso | Descripción |
|---|---|
| Login exitoso | Credenciales válidas → acceso al inventario |
| Login fallido | Contraseña incorrecta → mensaje de error visible |
| Validación de campos obligatorios | Envío sin usuario/contraseña → error de validación |
| Usuario bloqueado *(caso extra)* | `locked_out_user` → mensaje de bloqueo |

**Cómo ejecutar:**
```bash
cd automation
npm install
npx cypress run
```

📁 Detalle completo en [`automation/README.md`](./automation/README.md)

---

## 2️⃣ Módulo Funcional — MakersPay (billetera digital)

**Objetivo:** diseñar el proceso de testing completo para la funcionalidad de envío de dinero entre usuarios.

**Contenido:**
- Análisis de requerimiento y ambigüedades detectadas
- Técnicas de diseño aplicadas: partición equivalente, valores límite, tabla de decisión, transición de estados
- Matriz de 15 casos de prueba (funcionales, negativos, no funcionales y de usabilidad)
- Reporte de bug simulado con formato profesional

📁 Ver matriz completa en [`functional/Matriz_Casos_Prueba_MakersPay.xlsx`](./functional/Matriz%20Casos%20Prueba%20MakersPay.xlsx) o su versión [Markdown](./functional/Matriz_Casos_Prueba_MakersPay.md)

---

## 3️⃣ Módulo API — reqres.in

**Objetivo:** validar el flujo de creación y consulta de usuarios vía API REST.

**Flujo cubierto:**
1. `POST /users` → valida status `201` y existencia de ID
2. `GET /users/{id}` → valida status `200` y coincidencia de `name`/`job`
3. Casos adicionales: body inválido, ID inexistente (`404`), tiempo de respuesta

**Cómo ejecutar:**
```bash
npm install -g newman
newman run api/MakersPay-API-Tests.postman_collection.json -e api/MakersPay-API.postman_environment.json -r html --reporter-html-export api/report.html
```

📁 Detalle completo en [`api/README.md`](./api/README.md)

---

## 🛠️ Decisiones técnicas

- **Cypress** sobre Selenium: mayor velocidad de ejecución, debugging visual integrado y sintaxis más simple para mantener.
- **Page Object Model** en todos los módulos de UI para separar lógica de páginas y aserciones.
- **Newman** para correr la colección de Postman como evidencia ejecutable y reproducible, simulando integración a un pipeline CI/CD.
- Datos de prueba externalizados en `fixtures` (no hardcodeados) para facilitar mantenimiento.

## ✅ Cobertura lograda

- [x] Automatización de los 3 escenarios solicitados + 1 caso extra
- [x] 15 casos de prueba funcionales con técnicas formales aplicadas
- [x] Flujo de API completo (POST → GET) + 4 casos adicionales
- [x] Reporte de bug documentado
- [x] Evidencias de ejecución (capturas/reportes HTML)

## 🔮 Si tuviera más tiempo, agregaría

- Tests de carga sobre el endpoint de envío de dinero con JMeter
- Integración del repositorio a un pipeline real (GitHub Actions)
- Cobertura de accesibilidad básica en el flujo de login

---

**Autor:** Peter Díaz — QA Automation Engineer
📧 peterdiazqa@gmail.com | [LinkedIn](https://linkedin.com/in/diaz-peter)
