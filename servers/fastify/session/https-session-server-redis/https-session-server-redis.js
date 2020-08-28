'use strict'

const path = require('path')
const Fastify = require('fastify')
const fastifySession = require('fastify-session')
const fastifyCookie = require('fastify-cookie')
const fs = require('fs')
const isDocker = require('is-docker')
const RedisStore = require('connect-redis')(fastifySession);

const APP_PORT = 3000

// the docker compose service is called redis
let host = 'localhost'
if (isDocker()) {
  host = 'redis'
}

const getCertificates = () => {
  const cert = fs.readFileSync(path.join(__dirname, './certificates/selfsigned.crt'), 'utf-8')
  const key = fs.readFileSync(path.join(__dirname, './certificates/selfsigned.key'), 'utf-8')
  return {
    cert,
    key
  }
}
const { key, cert } = getCertificates()

const fastify = Fastify({
  https: {
    key,
    cert
  },
  logger: true
})

const initialization = async () => {
  fastify.register(fastifyCookie)
  await fastify.register(require('fastify-redis'), { host })
  const { redis } = fastify;
  const sessionOptions = {
    secret: 'a secret with minimum length of 32 characters',
    cookieName: 'example-redis-session',
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 3
    },
    store: new RedisStore({ client: redis })
  }
  fastify.register(fastifySession, sessionOptions)

  fastify.get('/', (request, reply) => {
    if (request.session) {
      request.session.count = request.session.count ? request.session.count + 1 : 1
    }
    return { hello: `route requested ${request.session.count} times in this session` }
  })

  fastify.listen(APP_PORT, '0.0.0.0', (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

initialization().catch((err) => {
  if (err) {
    fastify.log.error(err)
  }
})
