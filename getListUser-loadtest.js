import { group } from 'k6';
import { getListUser } from './Test function/getListUser.js';

export const options = {
    vus: 10,
    duration: '5s',
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<500'], // 95% of requests should be below 200ms
    },
};

const pages = 1;
export default function main () {
    group ("Get List Users", function(){
        let listUserData = getListUser(pages)
    })
}