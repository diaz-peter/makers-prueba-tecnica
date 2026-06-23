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
              { "key": "baseUrl", "value": "[https://reqres.in/api](https://reqres.in/api)", "enabled": true },
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
