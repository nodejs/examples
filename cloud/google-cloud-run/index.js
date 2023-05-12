import build from './app.js'
import { development, environment, production, port } from './config.js'

const host = development ? 'localhost' : '0.0.0.0'

const start = async () => {
  // A custom logger, as Cloud Run does not need a transport configuration
  const envToLogger = {
    development: {
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname'
        }
      }
    },
    production: true,
    test: false
  }

  try {
    const fastify = await build({
      logger: envToLogger[environment] ?? true,
      disableRequestLogging: production, // Cloud Run logs requests, no request logging is needed
      http2: production // Enable HTTP2 for production
    })
    await fastify.listen({ port: port, host: host })
    fastify.ready(() => {
      console.log(`listening on ${JSON.stringify(fastify.server.address())}`)
      console.log(fastify.printRoutes())
    })
  } catch (err) {
    console.log(err)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}

start()
