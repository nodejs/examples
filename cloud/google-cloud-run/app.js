import Fastify from 'fastify'
import mercurius from 'mercurius'

function build(opts = {}) {
  const fastify = Fastify(opts)

  const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`

  const resolvers = {
    Query: {
      add: async (_, { x, y }) => x + y
    }
  }

  fastify.register(mercurius, {
    schema,
    graphiql: true,
    resolvers
  })

  return fastify
}

export default build
