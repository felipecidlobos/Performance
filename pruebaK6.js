
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   
    { duration: '1m', target: 100 },   // subida gradual hasta 100
    { duration: '1m', target: 100 },   // mantenerse en pico
    { duration: '30s', target: 1 }     // bajada hasta 1 usuario
  ],
};

export default function () {

  const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

  const res = http.get(url);

  // Validaciones
  check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // pausa entre iteraciones
}
