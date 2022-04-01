import { baseUrl } from "../reqresEnv.js";

export function getListUser(pages){
    const reqUrl = `${baseUrl}/api/users?page=${pages}`;
    const reqHeader = {
      headers:{
          "content-type": "application/json",
      }
    };
    return {'reqUrl':reqUrl,'reqHeader':reqHeader}
}