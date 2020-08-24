'use strict'

const path = require('path')
const Fastify = require('fastify')
const fastifySession = require('fastify-session')
const fastifyCookie = require('fastify-cookie')
const fs = require('fs')

const APP_PORT = 3000
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
  logger: true,
  https: {
    key,
    cert
  }
})

fastify.register(fastifyCookie)

const sessionOptions = {
  secret: 'a secret with minimum length of 32 characters',
  cookieName: 'example-using-https-connection',
  cookie: {
    secure: true,
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
