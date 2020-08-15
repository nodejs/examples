// Require the framework and instantiate it
const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  await setTimeoutPromise(2000).then(() => {
    reply.send({
      "hello": "world"
    })
  })
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
