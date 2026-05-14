
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Trend, Rate, Counter } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Custom metrics
export let loginTime = new Trend('login_time');
export let errorRate = new Rate('errors');
export let successCount = new Counter('success');


// Load CSV
const users = new SharedArray('users', function () {
    return open('./users.csv')
        .split('\n')
        .slice(1)
        .map(line => {
            const [user, passwd] = line.split(',');
            return { user, passwd };
        });
});

export const options = {
    scenarios: {
        login_load: {
            executor: 'constant-arrival-rate',
            rate: 20,
            timeUnit: '1s',
            duration: '3m',
            preAllocatedVUs: 20,
            maxVUs: 100,
        },
    },
    thresholds: {
    http_req_duration: ['p(95)<1500'],
    //http_req_failed: ['rate<0.03'], 
    //errors: ['rate<0.03'],
    }
};

const URL = 'https://fakestoreapi.com/auth/login';

export default function () {

    const userData = users[Math.floor(Math.random() * users.length)];

    const payload = JSON.stringify({
        username: userData.user,
        password: userData.passwd,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(URL, payload, params);

    loginTime.add(res.timings.duration);

    let isSuccess = res.status === 200;
    successCount.add(isSuccess);
    errorRate.add(!isSuccess && res.status !== 401);

    check(res, {
        'status valido': (r) => r.status === 200 || r.status === 401,
        'tiempo < 1500 ms': (r) => r.timings.duration < 1500,
    });

    sleep(0.5);
}

export function handleSummary(data) {
    return {
        "reporte-login.html": htmlReport(data),
        "summary.json": JSON.stringify(data, null, 2)
    };
}
