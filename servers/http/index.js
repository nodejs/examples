import http from 'node:http'

const server = http.createServer()

server.on('request', (request, reply) => {
  switch (request.url) {
    case '/':
      reply.writeHead(200, { 'Content-Type': 'application/json' })
      reply.end(
        JSON.stringify({
          data: 'Hello World!'
        })
      )
      break
    case '/api':
      reply.writeHead(200, { 'Content-Type': 'application/json' })
      reply.end(
        JSON.stringify({
          data: 'Awesome API!'
        })
      )
      break
    default:
      reply.writeHead(404, { 'Content-Type': 'application/json' })
      reply.end(JSON.stringify({}))
  }
})

server.listen(3000, () => console.log('serveur work at http://localhost:3000'))

export default server
