const path = require('path')
const Fastify = require('fastify')
const fastifySession = require('fastify-session')
const fastifyCookie = require('fastify-cookie')
const fs = require('fs')
const isDocker = require('is-docker')
const redis = require('redis')
const RedisStore = require('connect-redis')(fastifySession)

const APP_PORT = 3000
const REDIS_PORT = 6379

// the docker compose service is called redis
let host = 'localhost'
if (isDocker()) {
  host = 'redis'
}

const redisClient = redis.createClient({
  host,
  port: REDIS_PORT
})

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
    allowHTTP1: true,
    key,
    cert
  },
  logger: true
})

fastify.register(fastifyCookie)

const sessionOptions = {
  secret: 'a secret with minimum length of 32 characters',
  cookieName: 'example-redis-session',
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 3
  },
  store: new RedisStore({ client: redisClient })
}
fastify.register(fastifySession, sessionOptions)

fastify.get('/', (request, reply) => {
  if (request.session) {
    request.session.count = request.session.count ? request.session.count + 1 : 1
  }
  return { hello: `route requested ${request.session.count} times in this session` }
})

fastify.listen(APP_PORT, '0.0.0.0', fastify.log.info('listening...'))
