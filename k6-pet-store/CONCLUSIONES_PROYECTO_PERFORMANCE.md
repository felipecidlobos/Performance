
# 📊 Conclusiones del Proyecto de Pruebas de Performance

## ✅ 1. Objetivo del proyecto

El objetivo principal del proyecto fue evaluar el rendimiento, estabilidad y capacidad del sistema bajo diferentes niveles de carga, utilizando **k6** como herramienta de pruebas de performance. Las pruebas estuvieron orientadas a validar tiempos de respuesta, tasa de errores y comportamiento del sistema ante escenarios de carga sostenida.

---

## ✅ 2. Diseño de las pruebas

El diseño de las pruebas consideró escenarios realistas de uso, incluyendo:

- Carga constante y controlada
- Uso de datos dinámicos (usuarios desde CSV)
- Simulación de concurrencia mediante distintos ejecutores
- Incorporación de métricas personalizadas

Esto permitió evaluar el sistema de forma integral y alineada a escenarios reales de producción.

---

## ✅ 3. Métricas monitoreadas

Durante la ejecución se monitorearon métricas clave, tales como:

- Tiempo de respuesta (`http_req_duration`)
- Percentiles (p90, p95, p99)
- Tasa de errores (`errorRate`)
- Transacciones exitosas (`successCount`)
- Métricas personalizadas (ej. tiempo de login)

Estas métricas proporcionan una visión clara del comportamiento del sistema bajo carga.

---

## ✅ 4. Resultados obtenidos

Los resultados evidencian que el sistema es capaz de manejar la carga definida cumpliendo con los umbrales establecidos en la mayoría de los casos. Los tiempos de respuesta se mantuvieron dentro de los valores aceptables y la tasa de errores fue controlada.

No obstante, se identificaron picos de latencia bajo alta concurrencia, lo que indica posibles puntos de mejora a nivel de infraestructura o aplicación.

---

## ⚠️ 5. Riesgos y limitaciones

Se identificaron las siguientes limitaciones:

- Dependencia de servicios externos puede generar variabilidad en los resultados
- Las pruebas no contemplan todos los flujos del negocio
- No se evaluaron escenarios de larga duración (soak test)

Estos factores deben considerarse al interpretar los resultados.

---

## 🚀 6. Recomendaciones

Para fortalecer la estrategia de performance se recomienda:

- Incorporar pruebas de estrés y spike testing
- Ejecutar pruebas de soak para detectar degradaciones en el tiempo
- Integrar métricas con herramientas de monitoreo (Grafana, InfluxDB)
- Automatizar las pruebas dentro de pipelines CI/CD
- Ajustar umbrales según SLAs reales del negocio

---

## 🧾 7. Conclusión final

El proyecto de pruebas de performance cumplió con su objetivo de evaluar el comportamiento del sistema bajo carga, proporcionando información valiosa para la toma de decisiones técnicas. El uso de k6 permitió obtener resultados confiables, reproducibles y fácilmente integrables en procesos DevOps.

Este proyecto establece una base sólida para la mejora continua del rendimiento del sistema y la prevención de incidentes en ambientes productivos.

---

✅ Documento de conclusiones del proyecto de performance
