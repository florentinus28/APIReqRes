import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../reqresEnv.js";

export function getListUser(pages){
    let response = http.get(`${baseUrl}/api/users?page=${pages}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log(response.body)
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
        'Validation Check : url content is https://reqres.in/#support-heading' : (r) => r.json()['support']['url']==='https://reqres.in/#support-heading'
    });
}