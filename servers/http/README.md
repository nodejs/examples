# Simple HTTP Server

This example demnstrates a (very) simple HTTP server with Node.js. It uses the
`http` module to create a server and listen on port 3000 for connections. There
are two routes defined:

- `/`
- `/api`

Both return a simple
[JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
object.

Keep in mind this is a minimal example. It does not handle errors, or any other
[HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) than
`GET`. For a production API, you should consider a framework like
[Fastify](https://www.fastify.io/).

## Usage

```bash
npm start
```

## Test

`http.test.js` shows how to test the server using the native
[node:test](https://nodejs.org/dist/latest-v20.x/docs/api/test.html#test-runner)
module and the
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API.

```bash
npm test
```
