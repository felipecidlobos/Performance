//Autor: Felipe Cid -> NTT DATA

import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// 📊 Configuración global
export const options = {
  scenarios: {
    carga_progresiva: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '30s', target: 100 },     // aumento gradual
        { duration: '2m', target: 1000 },     // carga media
        { duration: '2m', target: 3000 },     // pico alto
        { duration: '1m', target: 3000 },     // sostenido
        { duration: '1m', target: 100 },      // descenso controlado
        { duration: '30s', target: 0 },       // apagado
      ],
      gracefulRampDown: '30s',
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<1000', 'p(99)<1500'], // SLA realista
    http_req_failed: ['rate<0.01'],                  // <1% error
    checks: ['rate>0.95'],                           // 95% checks OK
  },
};

// 🌐 Configurable por variable de entorno
const BASE_URL = __ENV.BASE_URL || 'https://pokeapi.co/api/v2/';

// 📌 Headers (simulación más real)
const params = {
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'k6-performance-test',
  },
  timeout: '5s',
};

export default function () {
  const endpoint = BASE_URL;

  // 🔄 Request con manejo de errores
  let res;
  try {
    res = http.get(endpoint, params);
  } catch (error) {
    console.error(`Error en request: ${error}`);
    return;
  }

  // ✅ Validaciones robustas
  const result = check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo < 1000ms': (r) => r.timings.duration < 1000,
    'tiempo < 2000ms (pico)': (r) => r.timings.duration < 2000,
    'body no vacío': (r) => r.body && r.body.length > 0,
  });

  // 📌 Logging controlado solo en errores (evita ruido)
  if (!result) {
    console.warn(`Fallo request - Status: ${res.status} - Tiempo: ${res.timings.duration}`);
  }

  // ⏳ Pausa dinámica (simula usuario real)
  sleep(Math.random() * 2 + 1); // entre 1 y 3 segundos
}

// 📊 Reporte HTML automático
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
    "summary.json": JSON.stringify(data, null, 2), // respaldo técnico
  };
}

