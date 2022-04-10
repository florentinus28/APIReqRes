import { baseUrl } from "../reqresEnv.js";

export function createUser(name,job){
    const reqUrl = `${baseUrl}/api/users`;
    const reqBody = JSON.stringify(
        {
            "name": `${name}`,
            "job": `${job}`
        }
    );
    const reqHeader = {
      headers:{
          "content-type": "application/json",
      }
    };
    return {'reqUrl':reqUrl,'reqBody':reqBody,'reqHeader':reqHeader}
}