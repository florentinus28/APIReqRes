import { check,group } from 'k6';
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { login } from './Test function/login.js';

export const options = {
    vus: 20,
    duration: '10s',
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<1000'], // 95% of requests should be below 500ms
    },
};

export default function main () {
    let response;
    let reqUrl;
    let reqBody;
    let reqHeader;
    let accessToken;

    group ("Login with valid params", function(){
        const email = 'eve.holt@reqres.in';
        const password = 'cityslicka';

        let logindata = login(email,password);
        reqUrl=logindata.reqUrl;
        reqBody=logindata.reqBody;
        reqHeader=logindata.reqHeader;
        
        response = http.post(reqUrl,reqBody,reqHeader)
        // console.log(response.body)
        accessToken = response.json()['token']
        // console.log(`Access Token is : ${accessToken}`)
        check(response,{
            'Check Response : Login status is 200': (r) => r.status === 200,
            'Check Data : Token is not empty' : (r) => r.json()['token'] !== null,
            'Check Data Type : Token is String' : (r) => typeof r.json()['token'] === 'string',
            'Check Data Length : Length data of Token is 17 char' : (r) => r.json()['token'].length === 17
        })
    })
}
export function handleSummary(data) {
    console.log('Finished executing performance tests');
return {
  "summary.html": htmlReport(data),
};
}