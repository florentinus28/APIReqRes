import { baseUrl } from "../reqresEnv.js";

export function login(email,password){
    const reqUrl = `${baseUrl}/api/login`;
    const reqBody = JSON.stringify(
        {
            "email": `${email}`,
            "password": `${password}`
        }
    );
    const reqHeader = {
        headers:{
            "content-type": "application/json",
        }
    };
    return {'reqUrl':reqUrl,'reqBody':reqBody,'reqHeader':reqHeader}
}