# 🚀 K6 Login Load Test (Felipe Cid)

## ✅ Ejecutar prueba

```bash
k6 run login-test.js
```

## ✅ Requisitos
- k6 instalado

## ✅ Escenario
- 20 TPS
- Duración: 3 minutos

## ✅ Validaciones
- p95 < 1.5 segundos
- Error rate < 3%

## ✅ Archivos
- login-test.js → script principal
- users.csv → datos de entrada

## ✅ Métricas adicionales
- login_time
- errors
- success
