import { check,group } from 'k6';
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { login } from './Test function/login.js';

export default function main () {
    let response;
    let reqUrl;
    let reqBody;
    let reqHeader;
    let accessToken;
    let errMsg;

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
            'Check Data : Token is not empty' : (r) => r.json()['token'] !== null && accessToken !==undefined && accessToken !== '',
            'Check Data Type : Token is String' : (r) => typeof r.json()['token'] === 'string',
            'Check Data Length : Length data of Token is 17 char' : (r) => r.json()['token'].length === 17
        })
    })

    group ("Login with invalid password", function(){
        const email = 'eve.holt@reqres.in';
        const password = 'cityslicka9';

        let logindata = login(email,password);
        reqUrl=logindata.reqUrl;
        reqBody=logindata.reqBody;
        reqHeader=logindata.reqHeader;
        
        response = http.post(reqUrl,reqBody,reqHeader)
        // console.log(response.body)
        check(response,{
            'Check Response : Login status is 200': (r) => r.status === 200,
            'Check Data : Token is not empty' : (r) => r.json()['token'] !== null,
            'Check Data : Error is undefined' : (r) => r.json()['error'] === undefined || errMsg === null || errMsg === '',
            'Check Data Type : Token is String' : (r) => typeof r.json()['token'] === 'string',
            'Check Data Length : Length data of Token is 17 char' : (r) => r.json()['token'].length === 17
        })
    })

    group ("Login with invalid username", function(){
        const email = 'evea.holt@reqres.in';
        const password = 'cityslicka';

        let logindata = login(email,password);
        reqUrl=logindata.reqUrl;
        reqBody=logindata.reqBody;
        reqHeader=logindata.reqHeader;
        
        response = http.post(reqUrl,reqBody,reqHeader)
        // console.log(response.body)
        errMsg = response.json()['error']
        check(response,{
            'Check Response : Login status is 400': (r) => r.status === 400,
            'Check Data : Token is undefined' : (r) => r.json()['token'] === undefined,
            'Check Data : Error is not empty' : (r) => r.json()['error'] !== undefined && errMsg !== null && errMsg !== '',
            'Check Data Type : Error is String' : (r) => typeof r.json()['error'] === 'string',
            'Check Data Length : Length data of Error is less than equal 100 char' : (r) => r.json()['error'].length <= 100,
            'Check error message : The error message is : user not found' : (r) => r.json()['error']==='user not found'
        })
    })

    group ("Login with invalid all params", function(){
        const email = 'evea.holt@reqres.in';
        const password = 'cityslicka1';

        let logindata = login(email,password);
        reqUrl=logindata.reqUrl;
        reqBody=logindata.reqBody;
        reqHeader=logindata.reqHeader;
        
        response = http.post(reqUrl,reqBody,reqHeader)
        // console.log(response.body)
        check(response,{
            'Check Response : Login status is 400': (r) => r.status === 400,
            'Check Data : Token is undefined' : (r) => r.json()['token'] === undefined,
            'Check Data : Error is not empty' : (r) => r.json()['error'] !== null,
            'Check Data Type : Error is String' : (r) => typeof r.json()['error'] === 'string',
            'Check Data Length : Length data of Error is less than equal 100 char' : (r) => r.json()['error'].length <= 100,
            'Check error message : The error message is : user not found' : (r) => r.json()['error']==='user not found'
        })
    })

    group ("Login without password", function(){
        const email = 'eve.holt@reqres.in';
        const password = '';

        let logindata = login(email,password);
        reqUrl=logindata.reqUrl;
        reqBody=logindata.reqBody;
        reqHeader=logindata.reqHeader;
        
        response = http.post(reqUrl,reqBody,reqHeader)
        // console.log(response.body)
        check(response,{
            'Check Response : Login status is 400': (r) => r.status === 400,
            'Check Data : Token is undefined' : (r) => r.json()['token'] === undefined,
            'Check Data : Error is not empty' : (r) => r.json()['error'] !== null,
            'Check Data Type : Error is String' : (r) => typeof r.json()['error'] === 'string',
            'Check Data Length : Length data of Error is less than equal 100 char' : (r) => r.json()['error'].length <= 100,
            'Check error message : The error message is : Missing password' : (r) => r.json()['error']==='Missing password'
        })
    })

    group ("Login without user name", function(){
        const email = '';
        const password = 'cityslicka';

        let logindata = login(email,password);
        reqUrl=logindata.reqUrl;
        reqBody=logindata.reqBody;
        reqHeader=logindata.reqHeader;
        
        response = http.post(reqUrl,reqBody,reqHeader)
        // console.log(response.body)
        check(response,{
            'Check Response : Login status is 400': (r) => r.status === 400,
            'Check Data : Token is undefined' : (r) => r.json()['token'] === undefined,
            'Check Data : Error is not empty' : (r) => r.json()['error'] !== null,
            'Check Data Type : Error is String' : (r) => typeof r.json()['error'] === 'string',
            'Check Data Length : Length data of Error is less than equal 100 char' : (r) => r.json()['error'].length <= 100,
            'Check error message : The error message is : Missing email or username' : (r) => r.json()['error']==='Missing email or username'
        })
    })

    group ("Login without email & password", function(){
        const email = '';
        const password = '';

        let logindata = login(email,password);
        reqUrl=logindata.reqUrl;
        reqBody=logindata.reqBody;
        reqHeader=logindata.reqHeader;
        
        response = http.post(reqUrl,reqBody,reqHeader)
        // console.log(response.body)
        check(response,{
            'Check Response : Login status is 400': (r) => r.status === 400,
            'Check Data : Token is undefined' : (r) => r.json()['token'] === undefined,
            'Check Data : Error is not empty' : (r) => r.json()['error'] !== null,
            'Check Data Type : Error is String' : (r) => typeof r.json()['error'] === 'string',
            'Check Data Length : Length data of Error is less than equal 100 char' : (r) => r.json()['error'].length <= 100,
            'Check error message : The error message is : Missing email or username' : (r) => r.json()['error']==='Missing email or username'
        })
    })
}
let testTime=date.now()
export function handleSummary(data) {
    return {
      'testResult.html': htmlReport(data),
    };
  }