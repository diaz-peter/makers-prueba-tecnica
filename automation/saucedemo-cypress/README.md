# SauceDemo – Smoke Test de Login (Cypress + POM)

Suite de pruebas automatizadas del flujo de inicio de sesión de [SauceDemo](https://www.saucedemo.com/), implementada con **Cypress** siguiendo el patrón **Page Object Model (POM)**.

## Estructura del proyecto

```
saucedemo-cypress/
├── cypress/
│   ├── e2e/
│   │   └── login.cy.js        # Especificaciones de los tests (qué se prueba)
│   ├── pages/
│   │   └── LoginPage.js       # Page Object: selectores y acciones (cómo se prueba)
│   └── fixtures/
│       └── users.json         # Datos de prueba (usuarios, mensajes esperados)
├── cypress.config.js
├── package.json
└── README.md
```

## Requisitos previos

- Node.js 18+ instalado
- Conexión a internet (Cypress descarga su binario en el primer `npm install`)

## Instalación

```bash
npm install
```

## Ejecución

**Modo headless (un solo comando, ideal para CI):**
```bash
npx cypress run
```

**Modo interactivo (para ver el navegador y depurar):**
```bash
npx cypress open
```

## Casos de prueba cubiertos

| ID   | Caso                                              | Resultado esperado                                      |
|------|----------------------------------------------------|-----------------------------------------------------------|
| TC01 | Login exitoso con credenciales válidas (`standard_user`) | Redirección a `/inventory.html`                     |
| TC02 | Login fallido con contraseña incorrecta            | Mensaje de error "Username and password do not match…" |
| TC03 | Validación de campo obligatorio: username vacío    | Mensaje de error "Username is required"                |
| TC04 | Validación de campo obligatorio: password vacío    | Mensaje de error "Password is required"                |
| TC05 (extra) | Login con usuario bloqueado (`locked_out_user`) | Mensaje de error "this user has been locked out"   |

## Decisiones técnicas

- **Page Object Model**: `LoginPage.js` encapsula selectores (`data-test` attributes, los más estables frente a cambios de estilos) y expone métodos de alto nivel (`login()`) y atómicos (`typeUsername`, `typePassword`, `submit`) para cubrir tanto el flujo feliz como los casos de campos vacíos.
- **Fixtures, no hardcoded data**: todos los usuarios, contraseñas y mensajes de error esperados viven en `cypress/fixtures/users.json`, para que un cambio de copy o de usuario de prueba no obligue a tocar los tests.
- **baseUrl en `cypress.config.js`**: los tests navegan con `cy.visit('/')` en vez de URLs absolutas.
- **Selectores `data-test`**: se evitan selectores frágiles basados en clases CSS o texto visible, que son más propensos a romperse con cambios de UI.

## Posibles mejoras a futuro

- Agregar tests del módulo de envío de dinero (MakersPay) y del módulo API (reqres.in) como suites independientes.
- Integrar el run en un pipeline de CI (GitHub Actions) ejecutando `npx cypress run` en cada push.
- Agregar reporte HTML con `cypress-mochawesome-reporter`.
