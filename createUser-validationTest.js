import { check,group } from 'k6';
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { createUser } from './Test function/createUser.js';

export default function main () {
    let response;
    let reqUrl;
    let reqBody;
    let reqHeader;
    let accessToken;
    let errMsg;

    group ("Create User with valid params", function(){
        const name = 'Florentin';
        const job = 'QA Engineer';
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 201': (r) => r.status === 201,
            'Check Data : Name is not empty and same with input value' : (r) => r.json()['name'] ===`${name}`,
            'Check Data : Job is not empty and same with input value' : (r) => r.json()['job'] ===`${job}`,
            'Check Data : ID is not emptye' : (r) => r.json()['id'] !== null && r.json()['id'] !==undefined && r.json()['id'] !=='',
            'Check Data : CreatedAt is not empty' : (r) => r.json()['createdAt'] !== null && r.json()['createdAt'] !== undefined && r.json()['createdAt'] !=='',
            'Check Data Type : Name is String' : (r) => typeof r.json()['name'] === 'string',
            'Check Data Type : Job is String' : (r) => typeof r.json()['job'] === 'string',
            'Check Data Type : ID is String' : (r) => typeof r.json()['id'] === 'string',
            'Check Data Type : CretedAt is String' : (r) => typeof r.json()['createdAt'] === 'string',
        });
    })

    group ("Create User when name is empty string", function(){
        const name = '';
        const job = 'QA Engineer';
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when name is null", function(){
        const name = null;
        const job = 'QA Engineer';
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when name is undefined", function(){
        const name = undefined;
        const job = 'QA Engineer';
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when job is empty string", function(){
        const name = 'Florentin';
        const job = '';
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when job is null", function(){
        const name = 'Florentin';
        const job = null;
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when job is undefined", function(){
        const name = 'Florentin';
        const job = undefined;
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when name and job is empty string", function(){
        const name = '';
        const job = '';
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when name and job is null", function(){
        const name = null;
        const job = null;
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })

    group ("Create User when name and job is undefined", function(){
        const name = undefined;
        const job = undefined;
        let createUserData=createUser(name,job);
        reqUrl=createUserData.reqUrl;
        reqBody=createUserData.reqBody;
        reqHeader=createUserData.reqHeader;

        response=http.post(reqUrl,reqBody,reqHeader);
        console.log(response.body);
        check(response,{
            'Check Response : Create User status is 400': (r) => r.status === 400,
        });
    })
}
export function handleSummary(data) {
    console.log('Finished executing performance tests');
return {
  "createUserValidationTestSummary.html": htmlReport(data),
};
}