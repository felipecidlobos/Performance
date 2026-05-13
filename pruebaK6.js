
import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}

export const options = {
  stages: [
    { duration: '10s', target: 10 },   
    { duration: '1m', target: 3000 },   // subida gradual hasta 100
    { duration: '1m', target: 3000 },   // mantenerse en pico
    { duration: '30s', target: 10 }     // bajada hasta 1 usuario
  ],
};

export default function () {

  const url = 'https://pokeapi.co/api/v2/';

  const res = http.get(url);

  // Validaciones
  check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo de respuesta < 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1); // pausa entre iteraciones
}
