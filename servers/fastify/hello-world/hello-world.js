// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const APP_PORT = 3000

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen(APP_PORT, () => fastify.log.info(`server listening on ${fastify.server.address().port}`))
