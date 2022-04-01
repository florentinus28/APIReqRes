import { check,group } from 'k6';
import http from 'k6/http';
import { getListUser } from './Test function/getListUser.js';

// export const options = {
//     vus: 10,
//     duration: '10s',
//     thresholds: {
//       http_req_failed: ['rate<0.01'], // http errors should be less than 1%
//       http_req_duration: ['p(95)<500'], // 95% of requests should be below 200ms
//     },
// };

export default function main () {
    let response;
    let reqUrl;
    let reqHeader;

    group ("Get List Users", function(){
        const maxPages = 2;
        for (let pages = 1; pages <= maxPages; pages++) {
            let listUserData = getListUser(pages)
            reqUrl=listUserData.reqUrl;
            reqHeader=listUserData.reqHeader;

            response=http.get(reqUrl,reqHeader)
            // console.log(response.body)
            // let pageCheck = response.json()['page']
            // console.log(`Check page ${pageCheck}`)
            check(response, {
                'Get List User status is 200': (r) => r.status === 200,
                // Data type check
                'type of page is number' : (r) => typeof r.json().page === 'number',
                'type of per_page is number' : (r) => typeof r.json().per_page === 'number',
                'type of total is number' : (r) => typeof r.json().total === 'number',
                'ype of page_pages is number' : (r) => typeof r.json().total_pages === 'number',
                'type of data is array' : (r) => typeof r.json().data === 'object',
                'type of id is number' : (r) => typeof r.json()['data'][0]['id'] === 'number',
                'type of email is string' : (r) => typeof r.json()['data'][0]['email'] === 'string',
                'type of first_name is string' : (r) => typeof r.json()['data'][0]['email'] === 'string',
                'type of last_name is string' : (r) => typeof r.json()['data'][0]['email'] === 'string',
                'type of avatar is string' : (r) => typeof r.json()['data'][0]['email'] === 'string',
                'type of support is object' : (r) => typeof r.json().support === 'object',
                'type of url is string' : (r) => typeof r.json()['support']['url'] === 'string',
                'type of text is string' : (r) => typeof r.json()['support']['text'] === 'string',
                // Data check
                'id is not empty' : (r) => r.json()['data'][0]['id'] !== null,
                'email is not empty' : (r) => r.json()['data'][0]['email'] !== null,
                'first_name is not empty' : (r) => r.json()['data'][0]['email'] !== null,
                'last_name is not empty' : (r) => r.json()['data'][0]['email'] !== null,
                'avatar is not empty' : (r) => r.json()['data'][0]['email'] !== null,
                // Validation Check
                'verify body text' : (r) => r.body.includes('https://reqres.in/#support-heading'),
                'check length data' : (r) => r.json().data.length === r.json().per_page
            });

            for (let i = 0; i < response.json().data.length; i++) {
                let checkEmail= response.json()['data'][i]['email']
                console.log(`User email data : ${checkEmail}`)

            }
        }
    })
}