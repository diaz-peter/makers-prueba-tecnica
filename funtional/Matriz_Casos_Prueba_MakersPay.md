# Matriz de Casos de Prueba — Módulo Funcional MakersPay

## Análisis del requerimiento — Ambigüedades detectadas

1. No se especifica si hay un **límite de envíos por día** → se asume que no aplica para esta prueba.
2. No se especifica si se permiten **decimales** en el monto → se asume que solo se manejan números enteros (pesos colombianos).
3. No se aclara qué pasa si el **número de celular destinatario no está registrado** → se trata como un caso de error explícito.
4. No se especifica si existe **confirmación previa** (ej: pantalla de "¿confirmar envío?") → se asume flujo directo.
5. No se aclara el comportamiento ante **envíos simultáneos** (condición de carrera) → se incluye como caso de prueba no funcional/edge case.

## Matriz de casos de prueba

| ID | Escenario | Precondición | Pasos | Resultado esperado | Técnica | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|
| CP-01 | Envío exitoso dentro de reglas de negocio | Usuario autenticado, saldo $50.000, destinatario válido | 1. Ingresar número destinatario válido 2. Ingresar monto $20.000 3. Confirmar envío | Saldo remitente -$20.000, saldo destinatario +$20.000, movimiento registrado en ambos historiales | Partición equivalente (clase válida) | Funcional - Happy path | Alta |
| CP-02 | Monto igual al mínimo permitido | Saldo suficiente | Enviar exactamente $5.000 | Transacción exitosa | Valores límite | Funcional | Alta |
| CP-03 | Monto por debajo del mínimo | Saldo suficiente | Enviar $4.999 | Error: "El monto mínimo es $5.000 COP", saldo no se modifica | Valores límite | Funcional - Negativo | Alta |
| CP-04 | Monto igual al máximo permitido | Saldo ≥ $2.000.000 | Enviar exactamente $2.000.000 | Transacción exitosa | Valores límite | Funcional | Alta |
| CP-05 | Monto por encima del máximo | Saldo ≥ $2.000.001 | Enviar $2.000.001 | Error: "El monto máximo es $2.000.000 COP", saldo no se modifica | Valores límite | Funcional - Negativo | Alta |
| CP-06 | Saldo insuficiente | Saldo $10.000 | Enviar $15.000 | Error: "Saldo insuficiente", saldo no se modifica | Partición equivalente (clase inválida) | Funcional - Negativo | Alta |
| CP-07 | Envío al mismo número de celular | Usuario autenticado | Ingresar el propio número como destinatario | Error: "No puede enviarse dinero a sí mismo", saldo no se modifica | Tabla de decisión | Funcional - Negativo | Alta |
| CP-08 | Destinatario no registrado | Número no existe en el sistema | Ingresar número inexistente + monto válido | Error claro: "El número no está registrado", saldo no se modifica | Partición equivalente | Funcional - Negativo | Media |
| CP-09 | Campo monto vacío | Usuario autenticado | Dejar monto en blanco y confirmar | Error de validación, no permite continuar | Valores límite | Funcional - Negativo | Media |
| CP-10 | Campo número de celular vacío | Usuario autenticado | Dejar número en blanco y confirmar | Error de validación, no permite continuar | Valores límite | Funcional - Negativo | Media |
| CP-11 | Caracteres no numéricos en el monto | Usuario autenticado | Ingresar "abc" como monto | Error de validación / campo rechaza entrada no numérica | Partición equivalente | Funcional - Negativo | Media |
| CP-12 | Verificación de historial post-transacción exitosa | Transacción exitosa previa | Consultar historial de remitente y destinatario | El movimiento aparece reflejado correctamente en ambos historiales con monto, fecha y contraparte | Tabla de decisión | Funcional | Alta |
| CP-13 | Transacción fallida no afecta saldo | Cualquier escenario de error (CP-03 a CP-11) | Verificar saldo antes y después del intento fallido | El saldo permanece exactamente igual | Transición de estados | Funcional | Alta |
| CP-14 | Envíos simultáneos del mismo usuario (condición de carrera) | Saldo $10.000, dos envíos de $8.000 en paralelo | Disparar dos transacciones simultáneas que en conjunto superan el saldo | Solo una transacción se procesa, la otra falla por saldo insuficiente; el saldo nunca queda negativo | Transición de estados | No funcional - Concurrencia | Media |
| CP-15 | Mensaje de error visible y claro | Cualquier escenario de error | Provocar cualquier error de negocio | El mensaje de error es comprensible para el usuario final (no un error técnico/código crudo) | Exploratoria | Usabilidad | Media |

## Reporte de bug simulado

**BUG-001**
- **Título:** El sistema permite envío con monto igual a $0 si no hay validación explícita de "mayor a cero"
- **Severidad:** Alta
- **Prioridad:** Alta
- **Pasos para reproducir:**
  1. Iniciar sesión
  2. Ingresar destinatario válido
  3. Ingresar monto $0
  4. Confirmar envío
- **Resultado esperado:** Debería rechazarse por estar debajo del mínimo ($5.000)
- **Resultado actual (supuesto, a validar en ejecución real):** El sistema podría no contemplar este caso si la validación solo chequea "monto > saldo disponible"
- **Nota:** Caso a confirmar contra implementación real del sistema bajo prueba.
