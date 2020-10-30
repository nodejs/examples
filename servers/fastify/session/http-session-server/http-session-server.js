'use strict'

/* These examples  are based on those from the fastify-session plugin readme */

const Fastify = require('fastify')
const fastifySession = require('fastify-session')
const fastifyCookie = require('fastify-cookie')

const APP_PORT = process.env.PORT || 3000
const fastify = Fastify({ logger: true })
fastify.register(fastifyCookie)
const sessionOptions = {
  secret: 'a secret with minimum length of 32 characters',
  cookieName: 'example-name',
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 3
  }
}
fastify.register(fastifySession, sessionOptions)

fastify.get('/', async (request, reply) => {
  if (request.session) {
    request.session.count = request.session.count ? request.session.count + 1 : 1
  }
  return { hello: `route requested ${request.session.count} times in this session` }
})

fastify.listen(APP_PORT, function (err) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
