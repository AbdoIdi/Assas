const basePath = "http://localhost:3000";
const token =  localStorage.getItem("token");


const commonHeaders = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": 'application/json'
}
const api = {
  get: (endpoint : string) => fetch(`${basePath}/${endpoint}`,{
    headers: commonHeaders,
    cache: "no-store"
  }),
  post: (endpoint : string, body : Object) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "POST",
      headers: commonHeaders,
      body: body && JSON.stringify(body),
    }),
  put: (endpoint : string, body : Object) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "PUT",
      headers: commonHeaders,
      body: body && JSON.stringify(body),
    }),
  delete: (endpoint : string) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "DELETE",
      headers: commonHeaders
    }),
};

export { api };